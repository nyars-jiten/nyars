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
    return 'bg-acc text-onacc font-bold'
  }
  const available = availableComponents.value.length === 0 || availableComponents.value.includes(c)
  return available
    ? 'text-ink hover:bg-soft hover:text-strong'
    : 'text-muted/40 hover:text-muted'
}
</script>

<template>
  <section class="flex max-h-[min(32rem,70dvh)] flex-col gap-3 rounded-panel border border-line bg-surf p-3.5 shadow-lg">
    <!-- найденные кандзи -->
    <div class="flex min-h-11 shrink-0 flex-wrap items-center gap-1 border-b border-line pb-3">
      <UiIconButton icon="tabler:restore" label="Сбросить ключи" size="sm" class="mr-1" :disabled="!selected.length" @click="clear" />

      <Icon v-if="searchPending" class="size-4 animate-spin text-muted" name="tabler:loader-2" />
      <span v-else-if="!flatResults.length" class="text-sm text-muted">
        {{ selected.length ? 'Ничего не найдено' : 'Выберите ключи — здесь появятся кандзи, в которые они входят' }}
      </span>
      <template v-else>
        <template v-for="(token, i) of flatResults" :key="i">
          <UiCount v-if="token.type === 'count'" :value="token.value" pill class="mx-0.5" :title="`черт: ${token.value}`" />
          <button
            v-else
            type="button"
            lang="ja"
            class="flex size-9 cursor-pointer items-center justify-center rounded-ctl font-jp text-2xl text-ink transition-colors hover:bg-soft hover:text-strong focus-visible:outline-2 focus-visible:outline-strong"
            @click="onSelect(token.value)"
          >
            {{ token.value }}
          </button>
        </template>
        <span v-if="hasMore" class="text-lg text-muted">…</span>
      </template>
    </div>

    <!-- ключи по числу черт -->
    <div class="flex min-h-0 flex-col gap-1.5 overflow-y-auto pr-1">
      <div v-if="componentsPending" class="flex items-center gap-2 text-sm text-muted">
        <Icon class="size-4 animate-spin" name="tabler:loader-2" />
      </div>
      <div v-for="[strokes, chars] of grouped" :key="strokes" class="flex flex-wrap items-center gap-1">
        <span class="flex size-8 items-center justify-center rounded-ctl bg-soft text-xs font-extrabold text-strong tabular-nums" :title="`черт: ${strokes}`">{{ strokes }}</span>
        <button
          v-for="c of chars"
          :key="c"
          type="button"
          lang="ja"
          :aria-pressed="selected.includes(c)"
          class="flex size-8 cursor-pointer items-center justify-center rounded-ctl font-jp text-lg leading-none transition-colors focus-visible:outline-2 focus-visible:outline-strong"
          :class="componentClass(c)"
          @click="toggle(c)"
        >
          {{ c }}
        </button>
      </div>
    </div>
  </section>
</template>
