<script setup lang="ts">
// Значение статьи: номер, область, перевод, диалект и стилистика, пояснения, ссылки, примеры и подзначения.
// Общий для страницы статьи и выдачи поиска. Примеры: первые exampleLimit, остальные — по кнопке «Ещё N примеров».
const props = withDefaults(defineProps<{
  sense: Sense
  /** номер, если у значения нет своего ix */
  number: string
  /** основное написание — выделяется в примерах */
  headword: string
  showLemmas?: boolean
  /** колонка с номером; у единственного значения не нужна */
  numbered?: boolean
  /** без пояснений, ссылок, лемм и подзначений — для выдачи */
  compact?: boolean
  showExamples?: boolean
  /** сколько примеров видно без раскрытия */
  exampleLimit?: number
}>(), {
  numbered: true,
  showExamples: true,
  exampleLimit: 3,
})

const { t } = useI18n()
const { searchQuery } = storeToRefs(useSearchStore())

const note = computed(() => props.sense.loanSources.map(source => `${source.lang}. ${source.word}`).join(', '))

const examples = computed(() => props.sense.examples.map(example => ({
  sentence: markHeadword(example.sentence, props.headword),
  translation: example.translation,
})))
const open = ref(false)
const shownExamples = computed(() => open.value ? examples.value : examples.value.slice(0, props.exampleLimit))
const hiddenExamples = computed(() => examples.value.length - props.exampleLimit)
const moreLabel = computed(() => open.value
  ? 'Свернуть примеры'
  : `Ещё ${hiddenExamples.value} ${pluralRu(hiddenExamples.value, 'пример', 'примера', 'примеров')}`)

const examplesId = useId()

function refTo(reference: InternalReference) {
  return reference.target && reference.target.length === 4
    ? { name: 'dict-jpn-wid' as const, params: { wid: reference.target }, query: searchQuery.value ? { q: searchQuery.value } : undefined }
    : { name: 'dict-jpn' as const, query: { q: reference.value } }
}

function isUrl(value: string) {
  return /^https?:\/\//.test(value)
}
</script>

<template>
  <div
    class="grid items-baseline gap-x-1.5 gap-y-[5px]"
    :class="numbered ? 'grid-cols-[22px_minmax(0,1fr)]' : 'grid-cols-[minmax(0,1fr)]'"
  >
    <span v-if="numbered" class="text-[13.5px] font-extrabold opacity-75 text-strong tabular-nums">{{ sense.ix || number }}</span>

    <div class="min-w-0">
      <UiTag
        v-for="tag in sense.fieldTags"
        :key="tag.id"
        size="xs"
        class="mr-1.5 cursor-help align-[2px]"
        :title="tag.rus"
      >
        {{ tag.rusShort }}
      </UiTag>
      <Content :data="sense.content" :break-line="false" />
      <!-- <span v-if="sense.dialectTags.length || sense.metaTags.length" class="ml-1.5 text-muted italic">(<template v-for="(tag, i) in [...sense.dialectTags, ...sense.metaTags]" :key="tag.id"><template v-if="i">, </template><span class="cursor-help opacity-85" :class="i < sense.dialectTags.length ? 'text-dial' : 'text-danger'" :title="tag.rus">{{ tag.rus }}</span></template>)</span> -->
      <!-- прежний вид: плашки -->
      <UiTag
        v-for="tag in sense.dialectTags"
        :key="tag.id"
        tone="dial"
        size="xs"
        class="ml-1.5 cursor-help opacity-85 align-[2px]"
        :title="tag.rus"
      >
        {{ tag.rus }}
      </UiTag>
      <UiTag
        v-for="tag in sense.metaTags"
        :key="tag.id"
        tone="danger"
        size="xs"
        class="ml-1.5 cursor-help opacity-85 align-[2px]"
        :title="tag.rus"
      >
        {{ tag.rus }}
      </UiTag>

      <!-- <UiTag v-if="sense.isRare" tone="neutral" outline size="xs" class="ml-1.5 align-[2px]">
        редк.
      </UiTag> -->

      <p v-if="note && !compact" class="m-0 mt-0.5 text-[14.5px] text-muted">
        {{ note }}
      </p>

      <p v-if="sense.extRefs.length && !compact" class="m-0 mt-0.5 text-[14.5px] text-muted">
        <template v-for="(extRef, i) in sense.extRefs" :key="i">
          <template v-if="i > 0">
            ;
          </template>
          <a v-if="isUrl(extRef.target)" :href="extRef.target" target="_blank" rel="noopener" class="text-strong no-underline hover:underline">{{ extRef.value }}</a>
          <template v-else>
            {{ extRef.target ? `${extRef.target}: ` : '' }}{{ extRef.value }}
          </template>
        </template>
      </p>

      <ul v-if="sense.intRefs.length && !compact" class="m-0 mt-1 list-none p-0 text-[14.5px]">
        <li v-for="(reference, i) in sense.intRefs" :key="i">
          <span class="text-muted" aria-hidden="true">⇒ </span>
          <span class="text-muted italic">{{ t(`models.jpnEntry.referenceType.${reference.referenceType}`) }}</span>
          {{ ' ' }}
          <NuxtLink :to="refTo(reference)" lang="ja" class="font-jp text-strong no-underline hover:underline hover:underline-offset-[3px]">
            {{ reference.value }}
          </NuxtLink>
          <span v-if="reference.preview?.length" class="text-muted">
            —
            <Content
              v-for="(preview, p) in reference.preview"
              :key="p"
              :data="preview.c ?? [preview]"
              :break-line="false"
              class="after:content-[';_'] last:after:content-none"
            />
          </span>
        </li>
      </ul>

      <div v-if="showLemmas && !compact && sense.lemmaContent.length" class="mt-1.5 flex flex-wrap items-center gap-1">
        <UiCaption as="span" class="mr-1 mb-0">
          Леммы
        </UiCaption>
        <UiTag v-for="(lemma, i) in sense.lemmaContent" :key="i" tone="neutral" size="xs" lang="ja" class="font-jp">
          {{ lemma.v }}
        </UiTag>
      </div>

      <div
        v-if="showExamples && examples.length"
        :id="examplesId"
      >
        <EntryExample v-for="(example, i) in shownExamples" :key="i" :sentence="example.sentence" :translation="example.translation" />
        <button
          v-if="hiddenExamples > 0"
          type="button"
          class="inline-flex min-h-8 cursor-pointer items-center gap-1.5 self-start rounded-ctl text-[13.5px] font-semibold text-strong hover:underline hover:underline-offset-[3px] focus-visible:outline-2 focus-visible:outline-strong"
          :aria-expanded="open"
          :aria-controls="examplesId"
          @click="open = !open"
        >
          <Icon name="tabler:chevron-down" size="14px" class="transition-transform" :class="{ 'rotate-180': open }" />
          {{ moreLabel }}
        </button>
      </div>

      <EntrySense
        v-for="(sub, i) in compact ? [] : sense.subSenses"
        :key="i"
        :sense="sub"
        :number="`${sense.ix || number}.${i + 1}`"
        :headword="headword"
        :show-lemmas="showLemmas"
        :show-examples="showExamples"
        :example-limit="exampleLimit"
        class="mt-2"
      />
    </div>
  </div>
</template>
