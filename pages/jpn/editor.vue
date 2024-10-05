<script setup lang="ts">
import type UiInput from '~/components/ui/ui-input.vue'

definePageMeta({
  layout: 'desktop',
  name: 'Editor',
})

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
      },
      // works same as italic
      {
        name: '[p]',
        click: ['[p]', '[/p]'],
      },
      // sub
      {
        icon: 'material-symbols:subscript',
        click: ['[sub]', '[/sub]'],
      },
      // sup
      {
        icon: 'material-symbols:superscript',
        click: ['[sup]', '[/sup]'],
      },
      // comp1
      {
        icon: 'uil:brackets-curly',
        click: ['{~', '}'],
      },
      // кавычки
      {
        icon: 'ooui:markup',
        click: ['«', '»'],
      },
    ],
    [
    // bracket-одна
      {
        icon: 'tabler:brackets-contain-start',
        click: ['⌈'],
      },
      // ударение
      {
        // accent mark
        icon: 'ooui:bigger',
        click: ['\u0301'],
      },
    ],
    // {
    //   icon: 'material-symbols:tag',
    //   click: [],
    // }
  ] as (({ icon: string, name: undefined } | { icon: undefined, name: string }) & { click: [string] | [string, string] })[][]
}
</script>

<template>
  <section class="grid h-full grow gap-8 xl:grid-cols-[1fr_auto_1fr]">
    <div class="flex h-full flex-col gap-4">
      <section class="flex items-start justify-between gap-4 max-md:flex-col">
        <div class="inline-flex flex-wrap gap-x-8 gap-y-2">
          <span v-for="group, index in buttons()" :key="index" class="inline-flex flex-wrap gap-2">
            <UiButton v-for="{ name, icon, click } in group" :key="icon || name" type="button" :icon="icon" @click="insert.apply(null, click)">
              {{ name }}
            </UiButton>
          </span>
        </div>

        <UiButton class="items-start justify-center text-center max-md:w-full" type="button" icon="material-symbols:save" color="lime" @click="save">
          {{ $t('pages.editor.save') }}
        </UiButton>
      </section>

      <div :active="false" class="flex grow flex-col gap-4">
        <UiInput ref="writingRef" v-model="writing" :multiline="true" :rows="writingRows">
          <template #hint>
            {{ $t('pages.editor.writing') }}
          </template>
        </UiInput>

        <UiInput ref="readingRef" v-model="reading" :multiline="true" :rows="readingRows">
          <template #hint>
            {{ $t('pages.editor.reading') }}
          </template>
        </UiInput>

        <UiInput ref="bodyRef" v-model="body" :multiline="true" :rows="4" class="grow">
          <template #hint>
            {{ $t('pages.editor.body') }}
          </template>
        </UiInput>
      </div>
    </div>

    <div class="hidden border-l border-neutral-800 xl:block" />

    <div class="space-y-4 py-8 max-xl:hidden">
      <h1 class="text-2xl">
        {{ $t('pages.editor.preview') }}
      </h1>

      <JpnEntry v-if="!('code' in previewData)" :jpn-entry="previewData" />
    </div>

    <span class="space-y-8 xl:hidden">
      <h1 class="text-center text-4xl leading-none">
        {{ $t('pages.editor.preview') }}
      </h1>

      <UiBlock>
        <JpnEntry v-if="!('code' in previewData)" :jpn-entry="previewData" />
      </UiBlock>
    </span>
  </section>
</template>
