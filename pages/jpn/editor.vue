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

const writingRef = ref()
const readingRef = ref()
const bodyRef = ref()

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
    const { focused } = useFocus(r.value.inputRef)

    watch(focused, (focused) => {
      // blur
      if (focused === false) {
        element.value = {
          target: v,
          selection: {
            start: r.value.inputRef.selectionStart,
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
  ] as {
    icon: string | undefined
    name: string | undefined
    click: [string] | [string, string]
  }[][]
}
</script>

<template>
  <section class="grid h-full grow grid-cols-2 gap-8">
    <div class="flex h-full flex-col gap-4">
      <section class="flex justify-between gap-4">
        <div class="inline-flex flex-wrap gap-8">
          <span v-for="group, gIndex in buttons()" :key="gIndex" class="inline-flex flex-wrap gap-2">
            <UiButton v-for="button, bIndex in group" :key="bIndex" type="button" :icon="button.icon" @click="insert.apply(null, button.click)">
              {{ button.name }}
            </UiButton>
          </span>
        </div>

        <div>
          <UiButton type="button" icon="material-symbols:save" @click="save">
            {{ $t('pages.editor.save') }}
          </UiButton>
        </div>
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

        <UiInput ref="bodyRef" v-model="body" :multiline="true" class="grow">
          <template #hint>
            {{ $t('pages.editor.body') }}
          </template>
        </UiInput>
      </div>
    </div>

    <UiBlock class="space-y-4">
      <h1 class="text-2xl">
        {{ $t('pages.editor.preview') }}
      </h1>
      
      <JpnEntry v-if="!('code' in previewData)" :jpn-entry="previewData" />
    </UiBlock>
  </section>
</template>
