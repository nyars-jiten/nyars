<script setup lang="ts">
const route = useRoute()
const request = computed(() => String(route.query.q))
const articleWid = useRouteArticle()

const api = useJpnArticles()

definePageMeta({
  layout: 'desktop',
})

const { data } = useAsyncData('search-request', () => api.search(request.value, 0, 0), {
  default: () => ({ result: [] }),
  dedupe: 'defer',
  watch: [request],
})
</script>

<template>
  <div class="grid grow items-start gap-8 md:grid-cols-[1fr_2fr]">
    <div class="space-y-4">
      <SearchResult v-for="result of data?.result" :key="result.wid" :article="result" />
    </div>

    <SearchSidePreview v-if="articleWid" />
  </div>
</template>
