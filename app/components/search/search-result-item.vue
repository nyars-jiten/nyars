<script setup lang="ts">
// Статья в выдаче поиска: заглавное слово с фуриганой и вариантами, частотность и JLPT,
// первые три значения; «Ещё…» раскрывает остальные значения и примеры.
const props = defineProps<{
  entry: EntryJp
  /** запрос — сохраняется в ссылке, чтобы строка поиска не опустела на странице статьи */
  query?: string
}>()

const VISIBLE_SENSES = 3
const MAX_FORMS = 4

const open = ref(false)

const forms = computed(() => headwordForms(props.entry))
const main = computed(() => forms.value[0]!)
const alts = computed(() => forms.value.slice(1, MAX_FORMS))
const moreForms = computed(() => Math.max(0, forms.value.length - MAX_FORMS))

const frequency = computed(() => entryFrequency(props.entry))
const jlpt = computed(() => entryJlpt(props.entry))
const flag = computed(() => entryFlag(props.entry))

const senses = computed(() => entrySenses(props.entry))
const shown = computed(() => open.value ? senses.value : senses.value.slice(0, VISIBLE_SENSES))
const examples = computed(() => entryExampleCount(props.entry))
const hiddenSenses = computed(() => Math.max(0, senses.value.length - VISIBLE_SENSES))

const moreLabel = computed(() => {
  if (open.value)
    return 'Свернуть'
  const parts: string[] = []
  if (hiddenSenses.value)
    parts.push(`${hiddenSenses.value} ${pluralRu(hiddenSenses.value, 'значение', 'значения', 'значений')}`)
  if (examples.value)
    parts.push(`${examples.value} ${pluralRu(examples.value, 'пример', 'примера', 'примеров')}`)
  return `Ещё ${parts.join(' и ')}`
})
const hasMore = computed(() => hiddenSenses.value > 0 || examples.value > 0)

const to = computed(() => ({
  name: 'dict-jpn-wid' as const,
  params: { wid: `${props.entry.wid}-${props.entry.title}` },
  query: props.query ? { q: props.query } : undefined,
}))

// полоса статуса рисуется тенью и не сдвигает содержимое: отступы у всех карточек одинаковые
const stripe: Record<string, string> = {
  warn: 'shadow-[inset_3px_0_0_var(--warn)]',
  danger: 'shadow-[inset_3px_0_0_var(--danger)]',
  dial: 'shadow-[inset_3px_0_0_var(--dial)]',
}
const flagColor: Record<string, string> = { warn: 'text-warn', danger: 'text-danger', dial: 'text-dial' }
const flagIcon: Record<string, string> = { warn: 'tabler:alert-triangle', danger: 'tabler:alert-octagon', dial: 'tabler:message-2' }

const bodyId = useId()
</script>

<template>
  <article
    class="relative border-t border-line py-[22px] pr-9 pl-[18px] first:border-t-0"
    :class="[flag && stripe[flag.kind], entry.status.isDeleted && 'opacity-50']"
    :aria-label="main.text"
  >
    <span
      v-if="flag"
      class="absolute top-6 right-1 flex"
      :class="flagColor[flag.kind]"
      role="img"
      :aria-label="flag.label"
      :title="flag.label"
    >
      <Icon :name="flagIcon[flag.kind]!" size="17px" />
    </span>

    <!-- заглавное слово -->
    <NuxtLink
      :to="to"
      lang="ja"
      class="hw inline text-[28px] font-medium text-ink no-underline hover:text-strong hover:underline hover:decoration-2 hover:underline-offset-4"
    >
      <ruby v-for="(pair, i) in main.pairs" :key="`m${i}`">{{ pair.word }}<rt>{{ pair.kana !== pair.word ? pair.kana : '' }}</rt></ruby>
      <span v-for="(form, f) in alts" :key="f" class="whitespace-nowrap">
        <span class="mx-1 text-muted" aria-hidden="true">・</span>
        <ruby v-for="(pair, i) in form.pairs" :key="i">{{ pair.word }}<rt>{{ pair.kana !== pair.word ? pair.kana : '' }}</rt></ruby>
      </span>
      <span v-if="moreForms" class="ml-2 align-middle font-ui text-[13px] font-semibold text-muted">+{{ moreForms }}</span>
    </NuxtLink>

    <!-- частотность и метки -->
    <div
      v-if="frequency || jlpt || entry.status.isArchaic || entry.status.isProper || entry.status.isDeleted"
      class="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1.5"
    >
      <SearchFrequency v-if="frequency" :info="frequency" />
      <UiTag v-if="jlpt" size="xs">
        {{ jlpt }}
      </UiTag>
      <UiTag v-if="entry.status.isArchaic" tone="neutral" outline size="xs">
        устар.
      </UiTag>
      <UiTag v-if="entry.status.isProper" tone="neutral" outline size="xs">
        имя собств.
      </UiTag>
      <UiTag v-if="entry.status.isDeleted" tone="danger" size="xs">
        статья удалена
      </UiTag>
    </div>

    <!-- значения -->
    <ol
      :id="bodyId"
      class="m-0 mt-2.5 grid list-none items-baseline gap-x-1.5 gap-y-[5px] p-0"
      :class="senses.length > 1 ? 'grid-cols-[22px_minmax(0,1fr)]' : 'grid-cols-[minmax(0,1fr)]'"
    >
      <li v-for="(sense, s) in shown" :key="s" class="contents">
        <span v-if="senses.length > 1" class="text-[13.5px] font-extrabold text-strong tabular-nums">{{ s + 1 }}</span>
        <EntrySense
          :sense="sense"
          :number="String(s + 1)"
          :headword="main.text"
          :numbered="false"
          compact
          :show-examples="open"
          :example-limit="Infinity"
          class="min-w-0"
        />
      </li>
    </ol>

    <button
      v-if="hasMore"
      type="button"
      class="mt-1.5 inline-flex min-h-8 cursor-pointer items-center gap-1.5 rounded-ctl pr-2.5 pl-1.5 text-[13.5px] font-bold text-strong transition-colors hover:bg-soft focus-visible:outline-2 focus-visible:outline-strong"
      :aria-expanded="open"
      :aria-controls="bodyId"
      @click="open = !open"
    >
      <Icon name="tabler:chevron-down" size="14px" class="transition-transform" :class="{ 'rotate-180': open }" />
      {{ moreLabel }}
    </button>
  </article>
</template>
