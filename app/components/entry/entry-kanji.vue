<script setup lang="ts">
// Кандзи в записи: знак, значение, чтения, JLPT и Канкэн. Знак ведёт в поиск.
// Пока бэкенд не отдаёт сведения о кандзи (info пуст), показываются только знаки плиткой.
const props = defineProps<{
  chars: string[]
  info?: Record<string, KanjiInfo>
}>()

const VISIBLE = 6

const open = ref(false)

const items = computed(() => props.chars.map((kanji) => {
  const info = props.info?.[kanji]
  return {
    kanji,
    meaning: info?.meaning ?? '',
    readings: info ? [info.on.join(', '), info.kun.join(', ')].filter(Boolean).join(' · ') : '',
    jlpt: info?.jlpt,
    kanken: info?.kanken,
  }
}))
const detailed = computed(() => items.value.some(item => item.meaning))
// «Ещё 1 кандзи» не показываем — одну строку проще вывести сразу
const hasMore = computed(() => items.value.length > VISIBLE + 1)
const shown = computed(() => hasMore.value && !open.value ? items.value.slice(0, VISIBLE) : items.value)

const to = (kanji: string) => ({ name: 'dict-jpn' as const, query: { q: kanji } })
const listId = useId()
</script>

<template>
  <div>
    <ul v-if="detailed" :id="listId" class="m-0 list-none p-0">
      <li v-for="item in shown" :key="item.kanji">
        <NuxtLink :to="to(item.kanji)" class="group grid grid-cols-[48px_minmax(0,1fr)] items-center gap-3 rounded-ctl py-2 text-ink no-underline focus-visible:outline-2 focus-visible:outline-strong">
          <span lang="ja" class="flex size-12 items-center justify-center rounded-ctl bg-soft font-jp text-[30px] leading-none font-bold transition-colors group-hover:bg-surf group-hover:text-strong group-hover:shadow-[inset_0_0_0_1px_var(--line)]">{{ item.kanji }}</span>
          <span class="flex min-w-0 flex-col gap-px">
            <span class="text-[14.5px] leading-[1.3] font-bold group-hover:text-strong">{{ item.meaning }}</span>
            <span v-if="item.readings" lang="ja" class="font-jm text-[12.5px] leading-[1.4] [overflow-wrap:anywhere] text-muted">{{ item.readings }}</span>
            <span v-if="item.jlpt || item.kanken" class="mt-[3px] flex flex-wrap gap-1">
              <UiJlpt v-if="item.jlpt" :level="item.jlpt" size="tag" />
              <UiTag v-if="item.kanken" tone="neutral" outline size="xs" class="h-[18px] px-1.5 text-[11px] text-muted">漢検 {{ item.kanken }}</UiTag>
            </span>
          </span>
        </NuxtLink>
      </li>
    </ul>

    <ul v-else :id="listId" class="m-0 flex list-none flex-wrap gap-1.5 p-0">
      <li v-for="item in shown" :key="item.kanji">
        <NuxtLink
          :to="to(item.kanji)"
          lang="ja"
          :title="`Искать ${item.kanji}`"
          class="flex size-12 items-center justify-center rounded-ctl bg-soft font-jp text-[30px] leading-none font-bold text-ink no-underline transition-colors hover:bg-surf hover:text-strong hover:shadow-[inset_0_0_0_1px_var(--line)] focus-visible:outline-2 focus-visible:outline-strong"
        >
          {{ item.kanji }}
        </NuxtLink>
      </li>
    </ul>

    <UiButton
      v-if="hasMore"
      variant="link"
      size="sm"
      class="mt-0.5 -ml-2"
      :aria-expanded="open"
      :aria-controls="listId"
      @click="open = !open"
    >
      {{ open ? 'Свернуть' : `Ещё ${items.length - VISIBLE} кандзи` }}
    </UiButton>
  </div>
</template>
