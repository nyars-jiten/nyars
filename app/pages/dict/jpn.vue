<script setup lang="ts">
const route = useRoute()
// const request = computed(() => String(route.query.q ?? ''))

const { t } = useI18n()

const { search } = useSearch()
const { searchQuery, watchParam } = storeToRefs(useSearchStore())

// there's no state on SSR
if (searchQuery.value === '') {
  searchQuery.value = String(route.query.q ?? '')
}

const { data, status } = await useAsyncData(`search-request-${searchQuery.value}`, () => search(searchQuery.value, 0, 0), {
  dedupe: 'defer',
})

// const srchResult = ref<JpnSearchResponse>()
// srchResult.value = data.value
const srchResult = data

function updateEntry() {
  if (!srchResult.value?.result || srchResult.value.result.length === 0) {
    return
  }
  const first = srchResult.value?.result[0]
  if (first && route.name === 'dict-jpn' && searchQuery) {
    navigateTo({ name: 'dict-jpn-wid', params: { wid: first.wid }, query: { q: searchQuery.value } }, { replace: true })
  }
}

async function inlineSearch(req: string) {
  const inlineSearchResult = await search(req, 0, 0)
  srchResult.value = { ...inlineSearchResult, parsed: data.value?.parsed ?? [] }
  updateEntry()
}

const hasResult = computed(() => (searchQuery.value || route.query.q) && (srchResult.value?.result?.length ?? 0) > 0)
const isSearchPage = computed(() => route.query.q)

watch(watchParam, async () => {
  status.value = 'pending'
  srchResult.value = await search(searchQuery.value, 0, 0)
  status.value = 'success'
  updateEntry()
})
watch(data, updateEntry)

onMounted(updateEntry)
</script>

<template>
  <div id="jpn-search-layout">
    <NuxtLayout name="default">
      <!-- CONVERSIONS -->
      <div v-if="data?.unitConversions && data?.unitConversions.length > 0" class="text-center">
        <div class="text-xl">
          <div v-for="(conv, ci) in data?.unitConversions" :key="ci">
            {{ useFormatNumber(conv.srcValue, { precision: 3 }) }}<ruby>{{ conv.unit }}<rt>{{ conv.unitReading }}</rt></ruby> ≈ {{ useFormatNumber(conv.resValue, { precision: 3 }) }} {{ t(`pages.search.unit.${conv.metricUnit}`) }}
          </div>
        </div>
      </div>

      <div v-if="data?.eraConversions && data?.eraConversions.length > 0" class="text-center">
        <div class="text-xl">
          <div v-for="(conv, ci) in data?.eraConversions" :key="ci">
            <ruby>{{ conv.srcEra }}<rt>{{ conv.eraReading }}</rt></ruby>{{ conv.srcYear }}年 = {{ conv.gregorianYear }}
          </div>
        </div>
      </div>

      <!-- PARSER -->
      <div class="text-center">
        <div class="text-xl leading-12">
          <span v-for="(token, ti) in data?.parsed" :key="ti" class="border-b-2 pb-0.5 ml-2 cursor-pointer" @click="inlineSearch(token.base)">
            <span v-for="(furigana, fi) in token.furigana" :key="`${ti}.${fi}`">
              <ruby>{{ furigana.word }}<rt class="select-none">{{ furigana.kana }}</rt></ruby>
            </span>
          </span>
        </div>
        <div>
          <small class="text-neutral-500">
            {{ t('pages.search.searchInfo', [data?.parsed.length || '', data?.timings.tokenization || '', data?.timings.search || '']) }}
          </small>
        </div>
      </div>

      <div v-if="isSearchPage" class="grid grow items-start gap-8 md:grid-cols-[1fr_2fr]">
        <template v-if="isSearchPage">
          <div v-if="hasResult && status === 'success'" class="space-y-4 top-18 sticky h-[calc(100dvh-var(--spacing)*18*2)] overflow-y-auto">
            <SearchResult v-for="result of srchResult?.result" :key="result.wid" :article="result" class="block" />
          </div>
          <div v-else-if="status === 'success'">
            <div class="text-center">
              <span>{{ t('pages.search.foundNothing', [srchResult?.request]) }}</span>
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
      <NuxtPage v-else />
    </NuxtLayout>
  </div>
</template>
