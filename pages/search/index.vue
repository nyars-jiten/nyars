<script setup lang="ts">
const request = useRouteSearchRequest()
const api = useJpnArticles()

const { data, execute } = useAsyncData(`search-${request.value}`, () => api.search(request.value, 0, 0), {
  default: () => ({ result: [] }),
  lazy: false,
  dedupe: 'defer',
})

// TODO: debounce
watch(request, () => execute)

definePageMeta({
  layout: 'desktop',
})

const wid = useRouteArticle()

const { data: article } = useAsyncData(() => {
  const result = data.value?.result.find(x => x.wid === wid.value)
  if (result) {
    return Promise.resolve(result)
  }

  if (wid.value) {
    return api.get(wid.value)
  }

  return Promise.resolve(null)
}, { watch: [wid] })

watch(wid, () => window.scrollTo(0, 0))
</script>

<template>
  <div class="grid grow items-start gap-8 md:grid-cols-[1fr_2fr]">
    <div class="space-y-4">
      <SearchResult v-for="result of data?.result" :key="result.wid" :article="result" />
    </div>

    <UiBlock>
      <JpnEntry v-if="article" :jpn-entry="article" />
    </UiBlock>
  </div>
</template>
