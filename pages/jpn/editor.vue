<script setup lang="ts">
definePageMeta({
  layout: 'desktop',
  name: 'editor',
})

const { t } = useI18n()
const api = useJpnArticles()

const writing = ref('')
const writingRows = computed(() => writing.value.split('\n').length)

const reading = ref('')
const readingRows = computed(() => reading.value.split('\n').length)

const body = ref('')

const article = useRouteArticle()

const proto = useAsyncData(() => article.value ? api.source(article.value) : Promise.resolve(null))

if (proto.data.value) {
  writing.value = proto.data.value.writing
  reading.value = proto.data.value.reading
  body.value = proto.data.value.body
}

const disabled = computed(() => false /* proto.status.value === 'pending' */)

const preview = useAsyncData('changes-preview', () => api.preview({
  body: body.value,
  reading: reading.value,
  writing: writing.value,
}), {
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
    furigana: [],
  } as V2EntryJp),
})

// const changes = computed(() => 'code' in preview.data.value ? null : preview.data.value)

// const hasData = computed(() => (body.value.length || reading.value.length || writing.value.length) > 0)

watchDebounced([writing, reading, body], async () => {
  await preview.execute()

  // if ('code' in preview.data.value) {
  //   console.log(preview.data.value.code, preview.data.value.message)
  // }
}, { debounce: 250, immediate: true })

async function save() {
  const { data, execute } = useAsyncData('create-edit', () => api.create({
    body: body.value,
    reading: reading.value,
    writing: writing.value,
  }), {

    default: () => ({
      code: 0,
      message: '',
    }),
  })

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
        title: 'abbreviation',
      },
      // sub
      {
        icon: 'material-symbols:subscript',
        click: ['[sub]', '[/sub]'],
        title: 'sub',
      },
      // sup
      {
        icon: 'material-symbols:superscript',
        click: ['[sup]', '[/sup]'],
        title: 'sup',
      },
      // comp1
      {
        icon: 'uil:brackets-curly',
        click: ['{~', '}'],
        title: 'comp1',
      },
      // кавычки
      {
        icon: 'ooui:markup',
        click: ['«', '»'],
        title: 'quotes',
      },
    ],
    [
    // bracket-одна
      {
        icon: 'tabler:brackets-contain-start',
        click: ['⌈'],
        title: 'single-bracket',
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
    // title: 'tag',
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
            <UiButton v-for="{ name, icon, title, click } in group" :key="title" type="button" :icon="icon" :title="t(`pages.editor.button.${title}`)" :disabled="disabled" @click="insert.apply(null, click)">
              {{ name }}
            </UiButton>
          </span>
        </div>

        <div class="max-sm:grid max-sm:w-full max-sm:grid-cols-2 max-sm:gap-4 sm:space-x-2">
          <UiButton class="items-start justify-center text-center max-sm:w-full" type="button" icon="ic-baseline-whatshot" color="amber" :active="state" :title="t('pages.editor.guide')" @click="toggle()">
            <!-- справка -->
          </UiButton>

          <UiButton class="items-start justify-center text-center max-sm:w-full" type="button" icon="material-symbols:save" color="lime" :title="t('pages.editor.save')" :disabled="disabled" @click="save">
            <!-- {{ t('pages.editor.save') }} -->
          </UiButton>
        </div>
      </section>

      <section class="flex grow gap-8 max-md:flex-col" :class="{ 'md:grid md:grid-cols-2': state }">
        <div class="flex shrink grow flex-col gap-4">
          <UiInput ref="writingRef" v-model="writing" :multiline="true" :rows="writingRows" :disabled="disabled">
            <template #hint>
              {{ t('pages.editor.writing') }}
            </template>
          </UiInput>

          <UiInput ref="readingRef" v-model="reading" :multiline="true" :rows="readingRows" :disabled="disabled">
            <template #hint>
              {{ t('pages.editor.reading') }}
            </template>
          </UiInput>

          <UiInput ref="bodyRef" v-model="body" :multiline="true" :rows="4" class="grow" :disabled="disabled">
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

      <JpnEntry v-if="preview.data.value" :jpn-entry="preview.data.value" />
      <!--
      <i v-else class="block text-neutral-800">
        Пусто тут как-то...
      </i> -->
    </div>

    <!-- :class="{ hidden: hasData === false }" -->
    <span class="space-y-8 xl:hidden">
      <h1 class="text-center text-4xl">
        {{ t('pages.editor.preview') }}
      </h1>

      <UiBlock>
        <JpnEntry v-if="preview.data.value" :jpn-entry="preview.data.value" />
      </UiBlock>
    </span>
  </section>
</template>
