<script lang="ts" setup>
import { tv } from 'tailwind-variants'
import SearchResult from '~/components/search/search-result.vue'

const bookId = useRoute('ocr-id').params.id

const { t } = useI18n()
const { getPage, ocrImageUrl, getNextPage, updatePage } = useOcrRepo()
const { createNotification } = useNotificationStore()

const page = ref(null as OCRPageWithBook | null)

if (bookId) {
  try {
    const nextId = await getNextPage(Number(bookId))
    if (nextId && nextId.id) {
      page.value = await getPage(nextId.id)
    }
  }
  catch (e) {
    console.error(e)
  }
}

const { search } = useSearchRepo()
const { source } = useJpnRepo()
const srchResult = ref({} as JpnSearchResponse)

async function updateSearch() {
  srchResult.value = await search(page.value?.word || '', 0, 20)
}

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

function createNewEntry() {
  activeEntry.spelling = page.value?.word || ''
  activeEntry.reading = page.value?.reading || ''
  activeEntry.body = `=((сущ))\n${page.value?.meaningRu || ''}`
  activeEntry.comment = `[${page.value?.prefix}] ${page.value?.title}`
  showEditor.value = true
  isNew.value = true
  activeWid.value = ''
}

async function mergeEntry(wid: string) {
  const srcEntry = await source(wid)

  if (srcEntry.spelling.length === 0) {
    activeEntry.spelling = page.value?.word || ''
  }
  else if (page.value && !srcEntry.spelling.split(', ').includes(page.value.word)) {
    activeEntry.spelling = `${page.value?.word || ''}, ${srcEntry.spelling}`
  }
  else {
    activeEntry.spelling = srcEntry.spelling
  }

  if (srcEntry.reading.length === 0) {
    activeEntry.reading = page.value?.reading || ''
  }
  else if (page.value && !srcEntry.reading.split(', ').includes(page.value.reading)) {
    activeEntry.reading = `${page.value?.reading || ''}, ${srcEntry.reading}`
  }
  else {
    activeEntry.reading = srcEntry.reading
  }

  if (srcEntry.body.length === 0) {
    activeEntry.body = `=((сущ))\n${page.value?.meaningRu}` || ''
  }
  else if (page.value && !srcEntry.body.includes(page.value.meaningRu)) {
    activeEntry.body = `${srcEntry.body}\n=((сущ))\n- ${page.value?.meaningRu || ''}`
  }
  else {
    activeEntry.body = srcEntry.body
  }

  activeEntry.comment = `[${page.value?.prefix}] ${page.value?.title}`

  showEditor.value = true
  isNew.value = false
  activeWid.value = wid
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
    console.log('nextId', nextId)
    if (nextId) {
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

await updateSearch()
</script>

<template>
  <div class="space-y-4">
    <template v-if="page">
      <section class="space-y-2 px-4">
        <h3 class="text-[#6aa3ab] text-lg">
          [{{ page?.prefix }}] {{ page?.title }}
        </h3>

        <p class="text-sm text-gray-500">
          {{ page?.description }} simple text
        </p>

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

          <UiInput v-model="page.meaningRu" class="w-full" :multiline="true">
            <template #hint>
              meaningRu
            </template>
          </UiInput>

          <UiInput v-model="page.meaningEn" class="w-full" :multiline="true">
            <template #hint>
              meaningEn
            </template>
          </UiInput>
        </div>

        <UiButton class="max-sm:w-full" type="button" icon="material-symbols:save" color="lime" :title="t('pages.editor.save')" @click="invokeUpdatePage">
          {{ t('pages.editor.save') }}
        </UiButton>
      </section>

      <hr class="border-neutral-200 dark:border-neutral-800 my-8">

      <template v-if="srchResult.result && srchResult.result.length > 0">
        <div class="grid grid-cols-[auto_1fr] gap-4 items-start">
          <template v-for="result of srchResult.result" :key="result.wid">
            <UiButton class="flex-shrink-0" type="button" icon="mdi:source-branch-plus" color="sky" :title="t('pages.editor.save')" @click="mergeEntry(result.wid)">
              Объединить
            </UiButton>

            <SearchResult :article="result" />
          </template>
        </div>
      </template>

      <section>
        <hr class="border-neutral-200 dark:border-neutral-800 my-8">

        <UiButton type="button" icon="ic:baseline-add" color="lime" :title="t('pages.editor.save')" @click="createNewEntry()">
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
