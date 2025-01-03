<script setup lang="ts">
const route = useRoute()
const request = computed(() => String(route.query.q ?? ''))

const { t } = useI18n()

const { search } = useJpnArticles()

const { data } = useAsyncData('search-request', () => search(request.value, 0, 0), {
  // default: () => ({ result: [] }),
  dedupe: 'defer',
  watch: [request],
})

const updateEntry = function () {
  const first = data.value?.result[0]
  if (first && !useRoute('dict-jpn-wid').params.wid && !useRoute('dict-jpn-new') && request) {
    navigateTo({ name: 'dict-jpn-wid', params: { wid: first.wid }, query: { q: request.value } })
  }
}

const hasResult = computed(() => request.value && (data.value?.result?.length ?? 0) > 0)
const isSearchPage = computed(() => request.value)

watch(data, updateEntry)

onMounted(updateEntry)
</script>

<template>
  <div>
    <NuxtLayout name="desktop">
      <div class="grid grow items-start gap-8" :class="{ 'md:grid-cols-[1fr_2fr]': isSearchPage }">
        <template v-if="isSearchPage">
          <div v-if="hasResult" class="space-y-4">
            <SearchResult v-for="result of data?.result" :key="result.wid" :article="result" />
          </div>
          <div v-else>
            <div class="text-center">
              <p>{{ t('pages.search.foundNothing', [data?.request]) }}</p>
            </div>
          </div>
        </template>
        <NuxtPage />
      </div>
    </NuxtLayout>
  </div>
</template>
