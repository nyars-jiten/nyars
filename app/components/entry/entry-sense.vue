<script setup lang="ts">
// Значение статьи: номер, пометы, перевод, пояснения, ссылки, примеры и подзначения.
// Примеры: первые три, остальные — по кнопке «Ещё N примеров».
const props = defineProps<{
  sense: Sense
  /** номер, если у значения нет своего ix */
  number: string
  /** основное написание — выделяется в примерах */
  headword: string
  showLemmas?: boolean
}>()

const VISIBLE_EXAMPLES = 3

const { t } = useI18n()
const { searchQuery } = storeToRefs(useSearchStore())

const tags = computed(() => [...props.sense.fieldTags, ...props.sense.dialectTags, ...props.sense.metaTags])

const note = computed(() => props.sense.loanSources.map(source => `${source.lang}. ${source.word}`).join(', '))

const examples = computed(() => props.sense.examples.map(example => ({
  sentence: markHeadword(example.sentence, props.headword),
  translation: example.translation,
})))
const open = ref(false)
const shownExamples = computed(() => open.value ? examples.value : examples.value.slice(0, VISIBLE_EXAMPLES))
const hiddenExamples = computed(() => examples.value.length - VISIBLE_EXAMPLES)
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
  <div class="grid grid-cols-[30px_minmax(0,1fr)] gap-x-2.5 gap-y-1 py-3.5">
    <span class="font-extrabold text-strong tabular-nums">{{ sense.ix || number }}</span>

    <div class="min-w-0">
      <UiTag
        v-for="tag in tags"
        :key="tag.id"
        tone="danger"
        size="xs"
        class="mr-1.5 cursor-help align-[2px]"
        :title="tag.rus"
      >
        {{ tag.rusShort }}
      </UiTag>
      <b class="font-bold"><Content :data="sense.content" :break-line="false" /></b>
      <UiTag v-if="sense.isRare" tone="neutral" outline size="xs" class="ml-1.5 align-[2px]">
        редк.
      </UiTag>

      <p v-if="note" class="m-0 mt-0.5 text-[14.5px] text-muted">
        {{ note }}
      </p>

      <p v-if="sense.extRefs.length" class="m-0 mt-0.5 text-[14.5px] text-muted">
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

      <ul v-if="sense.intRefs.length" class="m-0 mt-1 list-none p-0 text-[14.5px]">
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

      <div v-if="showLemmas && sense.lemmaContent.length" class="mt-1.5 flex flex-wrap items-center gap-1">
        <UiCaption as="span" class="mr-1 mb-0">
          Леммы
        </UiCaption>
        <UiTag v-for="(lemma, i) in sense.lemmaContent" :key="i" tone="neutral" size="xs" lang="ja" class="font-jp">
          {{ lemma.v }}
        </UiTag>
      </div>

      <div
        v-if="examples.length"
        :id="examplesId"
        class="mt-2.5 flex flex-col gap-2.5 border-l-2 border-acc pl-3.5"
      >
        <div v-for="(example, i) in shownExamples" :key="i" class="text-[15px] leading-normal">
          <div lang="ja" class="font-jp text-[17px] leading-[1.6]">
            <Content :data="example.sentence" :break-line="false" />
          </div>
          <div class="text-muted">
            <Content :data="example.translation" :break-line="false" />
          </div>
        </div>
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
        v-for="(sub, i) in sense.subSenses"
        :key="i"
        :sense="sub"
        :number="`${sense.ix || number}.${i + 1}`"
        :headword="headword"
        :show-lemmas="showLemmas"
        class="pb-0"
      />
    </div>
  </div>
</template>
