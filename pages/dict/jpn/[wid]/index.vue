<script setup lang="ts">
const wid = useRoute('dict-jpn-wid').params.wid
// const route = useRoute()
// const request = computed(() => String(route.query.q ?? ''))

// const { getJpnEntry } = useApi(jpnEntryRepository)
const { get } = useJpnArticles()
// const { getImages } = useApi(kotobaRepository)
// const { getEditsEntry } = useApi(editRepository)
// const { getSatellites } = useApi(satelliteRepository)

// const { data: jpnEntry } = await useAsyncData(() => get(wid), {
//   default: () => ({
//     wid: '0000',
//     status: {
//       isReviewed: false,
//       isUnconfirmed: false,
//       isArchaic: false,
//       isDialect: false,
//       isProper: false,
//     },
//     externalEntry: '',
//     title: '',
//     words: [],
//     tags: [],
//     meanings: [],
//     furigana: [],
//     frequency: 0,
//     preferFurigana: true,
//   } satisfies V2EntryJp),
// })

const { data: jpnEntry } = useAsyncData('jpn-article', () => get(wid))

// const { data } = useAsyncData('search-request', () => search(request.value, 0, 0), {
//   default: () => ({ result: [] }),
//   dedupe: 'defer',
//   watch: [request],
// })

// const { data: images } = await useLazyAsyncData(
//   `jpnEntryImages-${wid}`,
//   () => getImages(wid, 0),
//   {
//     default: (): Image[] => []
//   }
// )

// const { data: edits } = await useLazyAsyncData(
//   `jpnEntryEdits-${wid}`,
//   () => getEditsEntry(wid, 0),
//   {
//     default: (): Edit[] => []
//   }
// )

// const { data: satellites } = await useLazyAsyncData(
//   `jpnEntrySatellites-${wid}`,
//   () => getSatellites(wid),
//   {
//     default: (): SatelliteData[][] => [[]]
//   }
// )

definePageMeta({
  layout: false,
})

// const showData = ref(false)
useHead({ title: jpnEntry.value?.title })
</script>

<template>
  <div>
    <!-- <div v-if="request" class="space-y-4">
      <SearchResult v-for="result of data?.result" :key="result.wid" :article="result" />
    </div>
    <div v-else /> -->
    <UiBlock v-if="jpnEntry">
      <JpnEntry :jpn-entry="jpnEntry" />
    <!-- <div v-if="images.length > 0" class="rounded border border-ns-gray-100 bg-white p-8 shadow-md dark:border-ns-gray-700 dark:bg-ns-gray-800">
      <img
        :src="images[0].link"
        :alt="images[0].title"
      >
      <span class="select-text">{{ images[0].title }}</span>
    </div> -->
    <!-- <div v-if="satellites.length > 0 && satellites[0].length > 0" class="border border-ns-gray-100 bg-white p-8 shadow-md dark:border-ns-gray-700 dark:bg-ns-gray-800 md:rounded-md">
      <div class="pb-4">
        <button
          type="button"
          class="btn-generic"
          @click="showData = !showData"
        >
          {{ showData ? t('pages.jpnEntry.satelliteButtonClose') : t('pages.jpnEntry.satelliteButtonOpen') }}
        </button>
      </div>
      <div class="flex flex-col gap-4">
        <Satellite
          v-for="(satelliteData, index) of satellites"
          :key="index"
          :satellite-data="satelliteData"
          :show-data="showData"
        />
      </div>
    </div>
    <div v-if="edits.length > 0" class="flex flex-col gap-2 border border-ns-gray-100 bg-white p-8 shadow-md dark:border-ns-gray-700 dark:bg-ns-gray-800 md:rounded-md">
      <span class="pb-2 text-ns-gray-400">
        {{ t('pages.jpnEntry.editsTitle') }}
      </span>
      <Edit
        v-for="edit in edits"
        :key="edit.id"
        :edit="edit"
      />
    </div> -->
    </UiBlock>
    <NotFound v-else />
  </div>
</template>
