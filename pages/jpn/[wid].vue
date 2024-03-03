<script setup lang="ts">
  const route = useRoute('jpn-wid')

  const api = useApi()

  const { data: jpnEntry } = await useAsyncData(
    'jpnEntry',
    () => api.jpnEntryRepository.getJpnEntry(route.params.wid)
  )

  const { data: images } = await useLazyAsyncData(
    'jpnEntryImages',
    () => api.kotobaRepository.getImages(route.params.wid, 0),
    {
      default: (): Image[] => []
    }
  )

  const { data: edits } = await useLazyAsyncData(
    'jpnEntryEdits',
    () => api.editRepository.getEditsEntry(route.params.wid, 0),
    {
      default: (): Edit[] => []
    }
  )

  const { data: satellites } = await useLazyAsyncData(
    'jpnEntrySatellites',
    () => api.satelliteRepository.getSatellites(route.params.wid),
    {
      default: (): SatelliteData[] => []
    }
  )

  const showData = ref(false)

  const createTitle = () => {
    if (!jpnEntry.value) {
      return ''
    }
    const { writings, readings } = jpnEntry.value.entry.words[0]

    if (writings.length === 0) {
      return readings[0].value
    }
    if (writings.length > 0) {
      return writings[0].value
    }
    return ''
  }

  definePageMeta({
    validate: (route) => {
      const param = (route.params as { wid: unknown }).wid
      return typeof param === 'string' && /^[a-zA-Z0-9]{4}$/.test(param)
    },
    alias: ['/dict/jp/:wid', '/jp/:wid'] // TODO: DELETE THIS IN FUTURE
  })
  useHead({
    title: `${createTitle()}`
  })
</script>

<template>
  <div class="flex flex-col gap-4">
    <JpnEntry v-if="jpnEntry" :jpn-entry="jpnEntry" />
    <NotFound v-else />
    <div v-if="images.length > 0" class="rounded border border-ns-gray-100 bg-white p-8 shadow-md dark:border-ns-gray-700 dark:bg-ns-gray-800">
      <img
        :src="images[0].link"
        :alt="images[0].title"
      >
      <span class="select-text">{{ images[0].title }}</span>
    </div>
    <div v-if="satellites.length > 0" class="border border-ns-gray-100 bg-white p-8 shadow-md md:rounded-md dark:border-ns-gray-700 dark:bg-ns-gray-800">
      <div class="pb-4">
        <button
          type="button"
          class="btn-generic"
          @click="showData = !showData"
        >
          {{ showData ? $t('pages.jpnEntry.satelliteButtonClose') : $t('pages.jpnEntry.satelliteButtonOpen') }}
        </button>
      </div>
      <div class="flex flex-col gap-4">
        <Satellite
          v-for="satelliteData of satellites"
          :key="satelliteData.key"
          :satellite-data="satelliteData"
          :show-data="showData"
        />
      </div>
    </div>
    <div v-if="edits.length > 0" class="flex flex-col gap-2 border border-ns-gray-100 bg-white p-8 shadow-md md:rounded-md dark:border-ns-gray-700 dark:bg-ns-gray-800">
      <span class="pb-2 text-ns-gray-400">
        {{ $t('pages.jpnEntry.editsTitle') }}
      </span>
      <Edit
        v-for="edit in edits"
        :key="edit.id"
        :edit="edit"
      />
    </div>
  </div>
</template>
