<script lang="ts" setup>
import { tv } from 'tailwind-variants'

const pageId = useRoute('ocr-id').params.id
const bookId = useRoute('ocr-id').query.bookId

const { t } = useI18n()
const { getPage, getNextPage } = useOcrData()
const { updatePage } = useOcrActions()
const { ocrImageUrl } = useOcrUtils()
const { createNotification } = useNotificationStore()

if (bookId) {
  try {
    const nextId = await getNextPage(Number(bookId))
    if (nextId.id) {
      await useRouter().replace({ name: 'ocr-id', params: { id: nextId.id } })
    }
  }
  catch (e) {
    console.error(e)
  }
}

const { data: page } = !bookId ? getPage(pageId) : { data: ref(null) }

const { search } = useSearch()
const { getEntrySource } = useJpnEntries()

const searchWord = computed(() => page.value?.word || '')

const { data: srchResult, refresh: updateSearch } = await useAsyncData(
  () => `search-request-${searchWord.value}`,
  () => search(searchWord.value, 0, 20),
  {
    dedupe: 'defer',
    watch: [searchWord],
  },
)

const newEntry = {
  spelling: '',
  reading: '',
  body: '',
  comment: '',
  status: {
    isUnreviewed: false,
    isUnconfirmed: false,
    isArchaic: false,
    isDialect: false,
    isProper: false,
    isDeleted: false,
  },
} satisfies EditorTxtEntryJp

const activeEntry = newEntry
const showEditor = ref(false)
const isNew = ref(false)
const activeWid = ref('')
const editorSection = ref<HTMLElement>()

function createNewEntry() {
  activeEntry.spelling = page.value?.word || ''
  activeEntry.reading = page.value?.reading || ''
  activeEntry.body = `=((сущ))\n${page.value?.meaningRu || ''}`
  activeEntry.comment = `[${page.value?.prefix}] ${page.value?.title}`
  showEditor.value = true
  isNew.value = true
  activeWid.value = ''
  nextTick(() => {
    editorSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

async function mergeEntry(wid: string) {
  const { data: srcEntry } = await getEntrySource(wid)

  if (!srcEntry.value) {
    return
  }

  if (srcEntry.value.spelling.length === 0) {
    activeEntry.spelling = page.value?.word || ''
  }
  else if (page.value && !srcEntry.value.spelling.split(', ').includes(page.value.word)) {
    activeEntry.spelling = `${page.value?.word || ''}, ${srcEntry.value.spelling}`
  }
  else {
    activeEntry.spelling = srcEntry.value.spelling
  }

  if (srcEntry.value.reading.length === 0) {
    activeEntry.reading = page.value?.reading || ''
  }
  else if (page.value && !srcEntry.value.reading.split(', ').includes(page.value.reading)) {
    activeEntry.reading = `${page.value?.reading || ''}, ${srcEntry.value.reading}`
  }
  else {
    activeEntry.reading = srcEntry.value.reading
  }

  if (srcEntry.value.body.length === 0) {
    activeEntry.body = `=((сущ))\n${page.value?.meaningRu}` || ''
  }
  else if (page.value && !srcEntry.value.body.includes(page.value.meaningRu)) {
    activeEntry.body = `${srcEntry.value.body}\n=((сущ))\n- ${page.value?.meaningRu || ''}`
  }
  else {
    activeEntry.body = srcEntry.value.body
  }

  activeEntry.comment = `[${page.value?.prefix}] ${page.value?.title}`

  showEditor.value = true
  isNew.value = false
  activeWid.value = wid

  nextTick(() => {
    editorSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

enum NextPage {
  Random = 0,
  Next,
  Prev,
}

async function invokeUpdatePage() {
  try {
    if (!page.value)
      return
    page.value = await updatePage(page.value.id, page.value)
    createNotification(t('pages.ocr.update-success'), NyarsNotificationType.Success)
    await updateSearch()
  }
  catch (e) {
    console.error(e)
    createNotification(t('pages.ocr.update-error'), NyarsNotificationType.Error)
  }
}

async function navigatePage(nextType: NextPage) {
  if (!page.value)
    return

  try {
    const nextId = await getNextPage(page.value.bookId, page.value.innerIndex, nextType, page.value.id)
    if (nextId.id) {
      await navigateTo({ name: 'ocr-id', params: { id: nextId.id ?? '' } })
    }
  }
  catch (e) {
    console.error(e)
    createNotification('pages.ocr.no-more-pages', NyarsNotificationType.Warning)
  }
}

async function actionOnEditorSave() {
  createNotification(t('pages.editor.notification.success'), NyarsNotificationType.Success)
  showEditor.value = false
  await updateSearch()
}

// Text transformation functions
function transformBrackets(field: 'meaningRu' | 'meaningEn') {
  if (!page.value)
    return
  // Swap both directions: () ↔ [] and {} → ()
  const transformed = page.value[field]
    .replace(/\(/g, '⟪TEMP_OPEN⟫')
    .replace(/\)/g, '⟪TEMP_CLOSE⟫')
    .replace(/\[/g, '(')
    .replace(/\]/g, ')')
    .replace(/⟪TEMP_OPEN⟫/g, '[')
    .replace(/⟪TEMP_CLOSE⟫/g, ']')
    .replace(/\{/g, '(')
    .replace(/\}/g, ')')

  // Force reactivity by creating a new object reference
  page.value = { ...page.value, [field]: transformed }
  updateUnexpectedChars()
}

function trimWhitespace(field: 'meaningRu' | 'meaningEn') {
  if (!page.value)
    return
  const cleaned = page.value[field].replace(/\s+/g, ' ').trim()

  // Force reactivity by creating a new object reference
  page.value = { ...page.value, [field]: cleaned }
  updateUnexpectedChars()
}

const unexpectedChars = ref('')

function updateUnexpectedChars() {
  if (!page.value) {
    unexpectedChars.value = ''
    return
  }

  /* eslint-disable regexp/no-obscure-range */
  const wordC = page.value.word.replace(/[ぁ-ゔゞァ-・ヽヾ゛゜ー一-龯]/g, '')
  const readingC = page.value.reading.replace(/[ぁ-ゔァ-ンー\sa-z:'!]/gi, '')
  const meaningEngC = page.value.meaningEn.replace(/[a-z\s,;.\\\-[\]()]/gi, '')
  const meaningRuC = page.value.meaningRu.replace(/[а-яё\s,;.\\\-[\]()]/gi, '')
  /* eslint-enable regexp/no-obscure-range */

  unexpectedChars.value = `${wordC}|${readingC}|${meaningRuC}|${meaningEngC}`
}

watch([
  () => page.value?.word,
  () => page.value?.reading,
  () => page.value?.meaningEn,
  () => page.value?.meaningRu,
], () => {
  updateUnexpectedChars()
}, { immediate: true })

const statusStyles = tv({
  variants: {
    status: {
      0: 'text-sky-300',
      1: 'text-yellow-300',
      2: 'text-green-300',
      3: 'text-red-300',
    },
  },
})
</script>

<template>
  <div class="space-y-4">
    <template v-if="page">
      <section class="space-y-2 px-4">
        <h3 class="text-blue-300 text-lg">
          [{{ page?.prefix }}] {{ page?.title }}
        </h3>

        <div>
          <Content allow-external :data="page?.description" class="text-gray-500" />
        </div>

        <div class="flex gap-2 items-center">
          <div :class="statusStyles.variants.status[page?.status || 0]">
            {{ t(`pages.ocr.status.${page?.status}`) }}
          </div>
          <div class="text-gray-500">
            |
          </div>
          <div>
            статья {{ page?.innerIndex + 1 }}
          </div>
        </div>
      </section>

      <!-- <hr class="border-neutral-200 dark:border-neutral-800 my-8"> -->

      <div class="flex gap-4 items-center px-4">
        <UiButton
          type="button"
          icon="material-symbols:arrow-back"
          variant="outline"
          @click="navigatePage(NextPage.Prev)"
        >
          Previous
        </UiButton>

        <UiButton
          type="button"
          icon="material-symbols:shuffle"
          color="sky"
          variant="outline"
          @click="navigatePage(NextPage.Random)"
        >
          Random
        </UiButton>

        <UiButton
          type="button"
          icon="material-symbols:arrow-forward"
          variant="outline"
          @click="navigatePage(NextPage.Next)"
        >
          Next
        </UiButton>
      </div>

      <hr class="border-neutral-200 dark:border-neutral-800 my-8">

      <div class="px-4 space-y-4">
        <img
          class="w-[50%] "
          :src="ocrImageUrl(page.prefix, page.file).href"
          alt="page image"
        >

        <UiInput v-if="page" v-model="page.rawLine" :disabled="true" :selectable="true" class="w-full" />
      </div>

      <hr class="border-neutral-200 dark:border-neutral-800 my-8">

      <section class="space-y-4 px-4">
        <div v-if="page" class="grid grid-cols-2 gap-4">
          <UiInput v-model="page.word" class="w-full">
            <template #hint>
              word
            </template>
          </UiInput>

          <UiInput v-model="page.reading" class="w-full">
            <template #hint>
              reading
            </template>
          </UiInput>

          <div class="space-y-2">
            <UiInput v-model="page.meaningRu" class="w-full" :multiline="true">
              <template #hint>
                meaningRu
              </template>
            </UiInput>
            <div class="flex gap-1 flex-wrap">
              <button type="button" class="px-2 py-1 text-xs bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded" @click="transformBrackets('meaningRu')">
                () ↔ []
              </button>
              <button type="button" class="px-2 py-1 text-xs bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded" @click="trimWhitespace('meaningRu')">
                Spaces
              </button>
            </div>
          </div>

          <div class="space-y-2">
            <UiInput v-model="page.meaningEn" class="w-full" :multiline="true">
              <template #hint>
                meaningEn
              </template>
            </UiInput>
            <div class="flex gap-1 flex-wrap">
              <button type="button" class="px-2 py-1 text-xs bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded" @click="transformBrackets('meaningEn')">
                () ↔ []
              </button>
              <button type="button" class="px-2 py-1 text-xs bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded" @click="trimWhitespace('meaningEn')">
                Spaces
              </button>
            </div>
          </div>
        </div>

        <div v-if="unexpectedChars.length > 3">
          Сомнительные символы: <span class="bg-rose-500">{{ unexpectedChars }}</span>
        </div>

        <UiButton class="max-sm:w-full" type="button" icon="material-symbols:save" color="lime" :label="t('pages.editor.save')" @click="invokeUpdatePage">
          {{ t('pages.editor.save') }}
        </UiButton>
      </section>

      <hr class="border-neutral-200 dark:border-neutral-800 my-8">

      <template v-if="srchResult?.result && srchResult.result.length > 0">
        <div class="grid grid-cols-[auto_1fr] gap-4 items-start">
          <template v-for="result of srchResult.result" :key="result.wid">
            <UiButton class="shrink-0" type="button" icon="mdi:source-branch-plus" color="sky" :label="t('pages.editor.save')" @click="mergeEntry(result.wid)">
              Объединить
            </UiButton>

            <SearchResult :article="result" />
          </template>
        </div>
      </template>

      <section ref="editorSection">
        <hr class="border-neutral-200 dark:border-neutral-800 my-8">

        <UiButton type="button" icon="ic:baseline-add" color="lime" :label="t('pages.editor.save')" @click="createNewEntry()">
          Создать новую статью
        </UiButton>

        <hr class="border-neutral-200 dark:border-neutral-800 my-8">

        <div v-if="showEditor" class="my-8 p-4 border rounded border-neutral-200 dark:border-neutral-700">
          {{ isNew ? 'New Entry' : `Edit entry ${activeWid}` }}
          <JpnEditor
            :is-new="isNew"
            :entry="activeEntry"
            :wid="activeWid"
            @save="actionOnEditorSave"
            @remove="actionOnEditorSave"
          />
        </div>
      </section>
    </template>
  </div>
</template>
