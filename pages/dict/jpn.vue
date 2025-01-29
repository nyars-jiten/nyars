<script setup lang="ts">
const route = useRoute()
const request = computed(() => String(route.query.q ?? ''))

const { t } = useI18n()

const { search } = useSearchRepo()

const { data, clear, refresh, status } = useAsyncData(`search-request-${request.value}`, () => search(request.value, 0, 0), {
  default: () => ({ result: [], request: '' }),
  dedupe: 'defer',
  // watch: [request],
})

const updateEntry = function () {
  const first = data.value?.result[0]
  if (first && useRoute().name === 'dict-jpn' && request) {
    navigateTo({ name: 'dict-jpn-wid', params: { wid: first.wid }, query: { q: request.value } })
  }
}

const hasResult = computed(() => request.value && (data.value?.result?.length ?? 0) > 0)
const isSearchPage = computed(() => request.value)

watch(request, () => {
  clear()
  refresh()
})
watch(data, updateEntry)

onMounted(updateEntry)
</script>

<template>
  <div>
    <NuxtLayout name="default">
      <div class="grid grow items-start gap-8" :class="{ 'md:grid-cols-[1fr_2fr]': isSearchPage }">
        <template v-if="isSearchPage">
          <div v-if="hasResult" class="space-y-4">
            <SearchResult v-for="result of data?.result" :key="result.wid" :article="result" />
          </div>
          <div v-else-if="status === 'success'">
            <div class="text-center">
              <span>{{ t('pages.search.foundNothing', [data?.request]) }}</span>
            </div>
          </div>
          <div v-else-if="status === 'pending'" class="flex space-x-2 content-center">
            <Icon class="animate-spin size-6" name="mdi:loading" />
            <span>{{ t('pages.search.pendingRequest') }}</span>
          </div>
          <div v-else>
            <span>{{ t('pages.search.errorRequest') }}</span>
          </div>
        </template>
        <NuxtPage />
      </div>
    </NuxtLayout>
  </div>
</template>
