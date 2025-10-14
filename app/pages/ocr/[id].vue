<script lang="ts" setup>
import SearchResult from '~/components/search/SearchResult.vue'

const routeId = useRoute('ocr-id').params.id

const { t } = useI18n()
const { getPage, ocrImageUrl, getNextPage } = useOcrRepo()
const { createNotification } = useNotificationStore()

const page = ref(null as OCRPageWithBook | null)

if (routeId) {
  try {
    page.value = await getPage(routeId)
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

async function navigatePage(nextType: NextPage) {
  if (!page.value)
    return

  try {
    const nextId = await getNextPage(page.value.id, page.value.bookId, page.value.innerIndex, nextType)
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

await updateSearch()
</script>

<template>
  <div>
    {{ page }}

    <template v-if="page">
      <h3 class="text-[#6aa3ab] text-lg">
        [{{ page?.prefix }}] {{ page?.title }}
      </h3>
      <div>
        {{ page?.description }}
      </div>
      <div class="flex gap-4 items-center mb-4">
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
      <div class="border rounded border-neutral-200 p-2 dark:border-neutral-700">
        <img
          v-if="page?.file"
          :src="ocrImageUrl(page.prefix, page.file).href"
          alt="page image"
          class="w-[70%] mt-2 mb-2"
        >
        <div>
          Raw: <span>{{ page?.rawLine }}</span>
        </div>
        <div v-if="page" class="flex flex-wrap gap-4 mt-4">
          <div class="flex-1 min-w-[350px]">
            <UiInput v-model="page.word" class="w-full">
              <template #hint>
                word
              </template>
            </UiInput>
          </div>

          <div class="flex-1 min-w-[350px]">
            <UiInput v-model="page.reading" class="w-full">
              <template #hint>
                reading
              </template>
            </UiInput>
          </div>

          <div class="flex-1 min-w-[350px]">
            <UiInput v-model="page.meaningRu" class="w-full" :multiline="true">
              <template #hint>
                meaningRu
              </template>
            </UiInput>
          </div>

          <div class="flex-1 min-w-[350px]">
            <UiInput v-model="page.meaningEn" class="w-full" :multiline="true">
              <template #hint>
                meaningEn
              </template>
            </UiInput>
          </div>
        </div>
        <UiButton class="max-sm:w-full mt-4" type="button" icon="material-symbols:save" color="lime" :title="t('pages.editor.save')">
          {{ t('pages.editor.save') }}
        </UiButton>
      </div>

      <div class="mt-8">
        <div class="gap-8 mx-8">
          <div v-if="srchResult.result.length > 0 " class="space-y-4">
            <div v-for="result of srchResult?.result" :key="result.wid" class="flex items-start gap-4">
              <UiButton class="flex-shrink-0 mt-4" type="button" icon="mdi:source-branch-plus" color="sky" :title="t('pages.editor.save')" @click="mergeEntry(result.wid)">
                Объединить
              </UiButton>
              <div class="flex-1">
                <SearchResult :article="result" />
              </div>
            </div>
          </div>
        </div>
        <ui-button class="mt-8" type="button" icon="ic:baseline-add" color="lime" :title="t('pages.editor.save')" @click="createNewEntry()">
          Создать новую статью
        </ui-button>
      </div>

      <div v-if="showEditor" class="my-8 p-4 border rounded border-neutral-200 dark:border-neutral-700">
        {{ isNew ? 'New Entry' : `Edit entry ${activeWid}` }}
        <JpnEditor :is-new="isNew" :entry="activeEntry" :wid="activeWid" />
      </div>
    </template>
  </div>
</template>
