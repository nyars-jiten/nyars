<script setup lang="ts">
import type UiInput from '~/components/ui/ui-input.vue'

import EditorGuide from './editor-guide.vue'

definePageMeta({
  layout: 'desktop',
  name: 'Editor',
})

const { t } = useI18n()
const { create, preview } = useJpnArticles()

const writing = ref('')
const writingRows = computed(() => writing.value.split('\n').length)

const reading = ref('')
const readingRows = computed(() => reading.value.split('\n').length)

const body = ref('')

const { data: previewData, execute: previewExecute } = useAsyncData(() => preview({
  body: body.value,
  reading: reading.value,
  writing: writing.value,
}), {
  lazy: true,
  server: false,
  default: () => ({
    wid: '0000',
    status: {
      isReviewed: false,
      isUnconfirmed: false,
      isArchaic: false,
      isDialect: false,
      isProper: false,
    },
    externalEntry: '',
    title: '',
    tags: [],
    words: [],
    meanings: [],
  } as V2EntryJp),
})

const changes = computed(() => 'code' in previewData.value ? null : previewData.value)

const hasData = computed(() => (body.value.length || reading.value.length || writing.value.length) > 0)

watchDebounced([writing, reading, body], async () => {
  await previewExecute()

  if ('code' in previewData.value) {
    console.log(previewData.value.code, previewData.value.message)
  }
}, { debounce: 250 })

const { data, execute } = useAsyncData('changes-preview', () => create({
  body: body.value,
  reading: reading.value,
  writing: writing.value,
}), {
  lazy: true,
  server: false,

  default: () => ({
    code: 0,
    message: '',
  }),
})

async function save() {
  await execute()

  console.log(data.value.code, data.value.message)
}

const writingRef = useTemplateRef('writingRef')
const readingRef = useTemplateRef('readingRef')
const bodyRef = useTemplateRef('bodyRef')

const element = ref({
  target: ref('' as string),
  selection: {
    start: 0,
    end: 0,
  },
})

function insert(open: string, close?: string) {
  let result = ''

  result = element.value.target.slice(0, element.value.selection.start)
  result += open

  if (close) {
    result += element.value.target.slice(element.value.selection.start, element.value.selection.end)
    result += close
    result += element.value.target.slice(element.value.selection.end)
  }

  else {
    result += element.value.target.slice(element.value.selection.start)
  }

  element.value.target = result
}

onMounted(() => {
  const refs = [
    [writingRef, writing],
    [readingRef, reading],
    [bodyRef, body],
  ]

  for (const [r, v] of refs) {
    // @ts-expect-error TODO
    const { focused } = useFocus(r.value.inputRef)

    watch(focused, (focused) => {
      // blur
      if (focused === false) {
        element.value = {
          // @ts-expect-error TODO
          target: v,
          selection: {
            // @ts-expect-error TODO
            start: r.value.inputRef.selectionStart,
            // @ts-expect-error TODO
            end: r.value.inputRef.selectionEnd,
          },
        }
      }
    })
  }
})

function buttons() {
  return [
    [
      // italic
      {
        icon: 'material-symbols:format-italic',
        click: ['[i]', '[/i]'],
        title: 'italic',
      },
      // works same as italic
      {
        name: '[p]',
        click: ['[p]', '[/p]'],
        title: '',
      },
      // sub
      {
        icon: 'material-symbols:subscript',
        click: ['[sub]', '[/sub]'],
        title: '',
      },
      // sup
      {
        icon: 'material-symbols:superscript',
        click: ['[sup]', '[/sup]'],
        title: '',
      },
      // comp1
      {
        icon: 'uil:brackets-curly',
        click: ['{~', '}'],
        title: '',
      },
      // кавычки
      {
        icon: 'ooui:markup',
        click: ['«', '»'],
        title: '',
      },
    ],
    [
    // bracket-одна
      {
        icon: 'tabler:brackets-contain-start',
        click: ['⌈'],
        title: '',
      },
      // ударение
      {
        // accent mark
        icon: 'ooui:bigger',
        click: ['\u0301'],
        title: 'accent',
      },
    ],
    // {
    //   icon: 'material-symbols:tag',
    //   click: [],
    // title: '',
    // }
  ] as (({ icon: string, name: undefined } | { icon: undefined, name: string }) & { title: string, click: [string] | [string, string] })[][]
}

const [state, toggle] = useToggle()
</script>

<template>
  <section class="grid grow gap-8 xl:h-full xl:grid-cols-[1fr_auto_1fr]">
    <EditorGuide v-if="state" class="md:hidden" />

    <h1 class="text-center text-4xl md:hidden">
      Редактор
    </h1>

    <div class="flex h-full flex-col gap-4">
      <section class="flex items-start justify-between gap-4 max-sm:flex-col">
        <div class="inline-flex flex-wrap gap-x-8 gap-y-2">
          <span v-for="group, index in buttons()" :key="index" class="inline-flex flex-wrap gap-2">
            <UiButton v-for="{ name, icon, title, click } in group" :key="icon || name" type="button" :icon="icon" :title="t(`editor.button.${title}`)" @click="insert.apply(null, click)">
              {{ name }}
            </UiButton>
          </span>
        </div>

        <div class="max-sm:grid max-sm:w-full max-sm:grid-cols-2 max-sm:gap-4 sm:space-x-2">
          <UiButton class="items-start justify-center text-center max-sm:w-full" type="button" icon="ic-baseline-whatshot" color="amber" :active="state" :title="t('pages.editor.guide')" @click="toggle()">
            <!-- справка -->
          </UiButton>

          <UiButton class="items-start justify-center text-center max-sm:w-full" type="button" icon="material-symbols:save" color="lime" :title="t('pages.editor.save')" @click="save">
            <!-- {{ t('pages.editor.save') }} -->
          </UiButton>
        </div>
      </section>

      <section class="flex grow gap-8 max-md:flex-col" :class="{ 'md:grid md:grid-cols-2': state }">
        <div class="flex shrink grow flex-col gap-4">
          <UiInput ref="writingRef" v-model="writing" :multiline="true" :rows="writingRows">
            <template #hint>
              {{ t('pages.editor.writing') }}
            </template>
          </UiInput>

          <UiInput ref="readingRef" v-model="reading" :multiline="true" :rows="readingRows">
            <template #hint>
              {{ t('pages.editor.reading') }}
            </template>
          </UiInput>

          <UiInput ref="bodyRef" v-model="body" :multiline="true" :rows="4" class="grow">
            <template #hint>
              {{ t('pages.editor.body') }}
            </template>
          </UiInput>
        </div>

        <EditorGuide v-if="state" class="mt-2.5 max-md:hidden" />
      </section>
    </div>

    <div class="border-l border-neutral-800 max-xl:hidden" />

    <div class="space-y-8 py-8 max-xl:hidden">
      <h1 class="text-center text-4xl">
        {{ t('pages.editor.preview') }}
      </h1>

      <JpnEntry v-if="changes && hasData" :jpn-entry="changes" />

      <i v-else class="text-neutral-800 block">
        Пусто тут как-то...
      </i>
    </div>

    <span class="space-y-8 xl:hidden" :class="{ hidden: hasData === false }">
      <h1 class="text-center text-4xl">
        {{ t('pages.editor.preview') }}
      </h1>

      <UiBlock>
        <JpnEntry v-if="changes" :jpn-entry="changes" />
      </UiBlock>
    </span>
  </section>
</template>
