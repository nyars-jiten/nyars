<script setup lang="ts">
definePageMeta({
  layout: 'hz',
  // Transitions + SSR mismatch leave this page's vnode tree stuck (spinner never clears).
  pageTransition: false,
})

const route = useRoute()
const { t } = useI18n()

const { search } = useSearch()
const { searchQuery, watchParam } = storeToRefs(useSearchStore())

if (searchQuery.value === '')
  searchQuery.value = String(route.query.q ?? '')

const srchResult = ref<JpnSearchResponse | null>(null)
const loadStatus = ref<'idle' | 'pending' | 'success' | 'error'>('idle')
const selectedToken = ref(-1)
/** Phrase tokens from the last full-query parse (kept across token inline searches). */
const phraseParsed = ref<Token[]>([])

let searchSeq = 0

async function runSearch(query: string, opts: { keepPhrase?: boolean } = {}) {
  if (import.meta.server)
    return

  const q = query.trim()
  if (!q) {
    searchSeq += 1
    srchResult.value = null
    loadStatus.value = 'idle'
    if (!opts.keepPhrase)
      phraseParsed.value = []
    return
  }

  const seq = ++searchSeq
  loadStatus.value = 'pending'
  try {
    const res = await search(q, 0, 0)
    if (seq !== searchSeq)
      return
    if (opts.keepPhrase && phraseParsed.value.length) {
      srchResult.value = { ...res, parsed: phraseParsed.value }
    }
    else {
      srchResult.value = res
      phraseParsed.value = res?.parsed ?? []
    }
    loadStatus.value = 'success'
  }
  catch (e) {
    if (seq !== searchSeq)
      return
    console.error('[dict/jpn] search failed', e)
    loadStatus.value = 'error'
  }
}

async function inlineSearch(req: string) {
  await runSearch(req, { keepPhrase: true })
}

const isEntryPage = computed(() => {
  const name = String(route.name ?? '')
  return name === 'dict-jpn-wid' || name === 'dict-jpn-wid-editor'
})
const isSearchList = computed(() => !!route.query.q && !isEntryPage.value)

watch(selectedToken, (idx) => {
  const token = phraseParsed.value[idx]
  if (token?.base?.trim())
    void inlineSearch(token.base)
})

watch(watchParam, () => {
  selectedToken.value = -1
  void runSearch(searchQuery.value)
})

watch(
  () => String(route.query.q ?? ''),
  (q) => {
    if (q && q !== searchQuery.value)
      searchQuery.value = q
    if (!q) {
      searchSeq += 1
      srchResult.value = null
      phraseParsed.value = []
      loadStatus.value = 'idle'
      return
    }
    void runSearch(q)
  },
  { immediate: import.meta.client },
)

onMounted(() => {
  const q = String(route.query.q ?? '')
  if (q && loadStatus.value === 'idle')
    void runSearch(q)
})

const hasResult = computed(() => (srchResult.value?.result?.length ?? 0) > 0)

const resultLabel = computed(() => {
  if (selectedToken.value >= 0) {
    const tok = phraseParsed.value[selectedToken.value]
    return tok?.surface || tok?.base || searchQuery.value
  }
  return searchQuery.value || String(route.query.q ?? '')
})

const emptyQueryLabel = computed(() => {
  const req = srchResult.value?.request
  if (Array.isArray(req) && req.length)
    return req.join(', ')
  return resultLabel.value
})

const isBusy = computed(() => loadStatus.value === 'pending' || loadStatus.value === 'idle')
</script>

<template>
  <div id="jpn-search-layout">
    <div v-if="isSearchList">
      <ClientOnly>
        <div>
          <div
            v-if="(srchResult?.unitConversions?.length || srchResult?.eraConversions?.length)"
            class="mb-3 rounded-2xl bg-surf px-4 py-3 text-center text-[15px]"
          >
            <div v-for="(conv, ci) in srchResult?.unitConversions" :key="`u-${ci}`">
              {{ useFormatNumber(conv.srcValue, { precision: 3 }) }}<ruby>{{ conv.unit }}<rt>{{ conv.unitReading }}</rt></ruby>
              ≈ {{ useFormatNumber(conv.resValue, { precision: 3 }) }} {{ t(`pages.search.unit.${conv.metricUnit}`) }}
            </div>
            <div v-for="(conv, ci) in srchResult?.eraConversions" :key="`e-${ci}`">
              <ruby>{{ conv.srcEra }}<rt>{{ conv.eraReading }}</rt></ruby>{{ conv.srcYear }}年 = {{ conv.gregorianYear }}
            </div>
          </div>

          <HzPhrasePanel
            v-if="phraseParsed.length"
            v-model="selectedToken"
            class="mt-2"
            :tokens="phraseParsed"
          />

          <div class="mt-6.5 flex flex-wrap items-start gap-9">
            <HzFilters />

            <main class="min-w-0 flex-[999_1_640px]">
              <div class="mb-3 flex flex-wrap items-baseline gap-x-3.5 gap-y-1.5">
                <h1 class="m-0 text-[15px] font-semibold text-muted normal-case! tracking-normal!">
                  Результаты для
                  <span class="hz-jp text-[20px] font-bold text-ink" lang="ja">{{ resultLabel }}</span>
                </h1>
              </div>

              <HzDictTabs :count="srchResult?.result?.length ?? 0" />

              <section aria-label="Статьи" class="mt-1">
                <div v-if="isBusy" class="flex items-center gap-2 py-10 text-muted">
                  <span class="inline-block size-5 animate-spin border-2 border-current border-r-transparent rounded-full" aria-hidden="true" />
                  <span>{{ t('pages.search.pendingRequest') }}</span>
                </div>
                <div v-else-if="loadStatus === 'error'" class="py-10 text-center">
                  <span>{{ t('pages.search.errorRequest') }}</span>
                </div>
                <div v-else-if="!hasResult" class="py-10 text-center text-muted">
                  <span>{{ t('pages.search.foundNothing', [emptyQueryLabel]) }}</span>
                </div>
                <div v-else class="space-y-3">
                  <HzResultCard
                    v-for="result of srchResult?.result"
                    :key="result.wid"
                    :article="result"
                  />
                </div>
              </section>
            </main>
          </div>
        </div>

        <template #fallback>
          <div class="flex items-center gap-2 py-10 text-muted">
            <span class="inline-block size-5 animate-spin border-2 border-current border-r-transparent rounded-full" aria-hidden="true" />
            <span>{{ t('pages.search.pendingRequest') }}</span>
          </div>
        </template>
      </ClientOnly>
    </div>

    <div v-else-if="isEntryPage">
      <div v-if="route.query.q" class="mb-4">
        <NuxtLink
          :to="{ name: 'dict-jpn', query: { q: String(route.query.q) } }"
          class="text-[13.5px] font-semibold"
        >
          ← К результатам
        </NuxtLink>
      </div>
      <NuxtPage />
    </div>

    <NuxtPage v-else />
  </div>
</template>
