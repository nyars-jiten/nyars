<script setup lang="ts">
// const wid = useRoute('dict-jpn-wid').params.wid
const route = useRoute()
const request = computed(() => String(route.query.q ?? ''))

// const { getJpnEntry } = useApi(jpnEntryRepository)
const { search } = useJpnArticles()

// const { data: jpnEntry } = useAsyncData('jpn-article', () => get(wid))

const { data } = useAsyncData('search-request', () => search(request.value, 0, 0), {
  default: () => ({ result: [] }),
  dedupe: 'defer',
  watch: [request],
})

// // const showData = ref(false)
// useHead({ title: jpnEntry.value?.title })
</script>

<template>
  <div>
    <NuxtLayout name="desktop">
      <div class="grid grow items-start gap-8" :class="{ 'md:grid-cols-[1fr_2fr]': request }">
        <div v-if="request" class="space-y-4">
          <SearchResult v-for="result of data?.result" :key="result.wid" :article="result" />
        </div>
        <NuxtPage />
      </div>
    </NuxtLayout>
  </div>
</template>
