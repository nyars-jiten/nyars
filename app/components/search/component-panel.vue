<script setup lang="ts">
const { getComponents, searchByComponents } = useKanji()
const { searchQuery } = storeToRefs(useSearchStore())
const { refresh } = useSuggestionsStore()

const { data: components, pending: componentsPending } = getComponents()

const selected = ref<string[]>([])
const results = ref<Record<string, string[]>>({})
const availableComponents = ref<string[]>([])
const searchPending = ref(false)
// const searchNonJp = ref(false)

const grouped = computed(() => {
  const map = new Map<number, string[]>()
  for (const c of components.value ?? []) {
    if (!map.has(c.strokes)) {
      map.set(c.strokes, [])
    }
    map.get(c.strokes)!.push(c.component)
  }
  return [...map.entries()].sort((a, b) => a[0] - b[0])
})

function toggle(component: string) {
  const idx = selected.value.indexOf(component)
  if (idx === -1) {
    selected.value.push(component)
  }
  else {
    selected.value.splice(idx, 1)
  }
}

const runSearch = useDebounceFn(async () => {
  if (selected.value.length === 0) {
    results.value = {}
    availableComponents.value = []
    return
  }
  searchPending.value = true
  try {
    const res = await searchByComponents(selected.value)
    results.value = res?.result ?? {}
    availableComponents.value = res?.components ?? []
  }
  catch {
    results.value = {}
    availableComponents.value = []
  }
  finally {
    searchPending.value = false
  }
}, 300)

watch(selected, () => runSearch(), { deep: true })

const RESULT_LIMIT = 20

type FlatToken
  = | { type: 'count', value: number }
    | { type: 'kanji', value: string }

const groupedResults = computed(() => {
  return Object.entries(results.value)
    .sort((a, b) => Number(a[0]) - Number(b[0]))
})

const flatResults = computed<FlatToken[]>(() => {
  const tokens: FlatToken[] = []
  let kanjiCount = 0
  for (const [strokes, chars] of groupedResults.value) {
    if (kanjiCount >= RESULT_LIMIT) {
      break
    }
    tokens.push({ type: 'count', value: Number(strokes) })
    for (const kanji of chars) {
      if (kanjiCount >= RESULT_LIMIT) {
        break
      }
      tokens.push({ type: 'kanji', value: kanji })
      kanjiCount++
    }
  }
  return tokens
})

const hasMore = computed(() =>
  groupedResults.value.reduce((sum, [, chars]) => sum + chars.length, 0) > RESULT_LIMIT,
)

async function onSelect(kanji: string) {
  searchQuery.value += kanji
  await refresh()
}

function clear() {
  selected.value = []
  results.value = {}
  availableComponents.value = []
}

function componentClass(c: string) {
  if (selected.value.includes(c)) {
    return 'bg-zinc-700 text-zinc-100 outline-1 outline-zinc-600'
  }
  const available = availableComponents.value.length === 0 || availableComponents.value.includes(c)
  return available
    ? 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
    : 'text-zinc-700 hover:text-zinc-600'
}
</script>

<template>
  <section class="flex max-h-128 flex-col gap-3 rounded-md bg-neutral-900 p-4 shadow outline-1 outline-neutral-800">
    <!-- Results -->
    <div class="min-h-9 shrink-0 py-1 leading-loose">
      <UiButton type="button" icon="mdi:restart" title="сбросить" class="mr-2 align-middle rounded-full" loose @click="clear" />
      <Icon v-if="searchPending" class="size-4 animate-spin align-middle text-zinc-500" name="mdi:loading" />
      <span v-else-if="!flatResults.length" class="align-middle text-sm text-zinc-600">
        {{ selected.length ? 'ничего не найдено' : 'выберите компоненты для поиска' }}
      </span>
      <template v-else>
        <template v-for="(token, i) of flatResults" :key="i">
          <span v-if="token.type === 'count'" class="mr-1 inline-block rounded bg-zinc-800 px-1 align-middle text-sm text-zinc-300">{{ token.value }}</span>
          <button
            v-else
            type="button"
            class="mr-1 inline-block cursor-pointer align-middle text-2xl text-zinc-300 transition-colors hover:text-zinc-100"
            @click="onSelect(token.value)"
          >
            {{ token.value }}
          </button>
        </template>
        <span v-if="hasMore" class="inline-block align-middle text-lg text-zinc-500">…</span>
      </template>
    </div>

    <!-- Controls -->
    <!-- <div class="flex shrink-0 items-center gap-3"> -->
    <!-- <label class="flex cursor-pointer items-center gap-1.5 text-xs leading-none text-zinc-400">
        <input v-model="searchNonJp" type="checkbox" class="m-0 size-3.5 shrink-0 cursor-pointer accent-zinc-400">
        <span>искать не японские иероглифы</span>
      </label> -->
    <!-- </div> -->

    <!-- Components list (scrollable) -->
    <div class="flex min-h-0 flex-col gap-2 overflow-y-auto">
      <div v-if="componentsPending" class="flex items-center gap-2 text-sm text-zinc-500">
        <Icon class="size-4 animate-spin" name="mdi:loading" />
      </div>
      <div v-for="[strokes, chars] of grouped" :key="strokes" class="flex flex-wrap items-center gap-1">
        <span class="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-800 text-sm text-zinc-300">{{ strokes }}</span>
        <button
          v-for="c of chars"
          :key="c"
          type="button"
          class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-lg leading-none transition-colors"
          :class="componentClass(c)"
          @click="toggle(c)"
        >
          {{ c }}
        </button>
      </div>
    </div>
  </section>
</template>
