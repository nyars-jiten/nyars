<script setup lang="ts">
// Страница поиска по словарю: разбор фразы, словари, фильтры и выдача.
// Чего пока нет на бэкенде — делается на клиенте, см. docs/backend-search.md.
// Шаблон страницы (шапка, подвал) задаёт родительский pages/dict/jpn.vue.
definePageMeta({
  layout: false,
})

const route = useRoute()
const { search } = useSearch()
const searchStore = useSearchStore()
const { searchQuery, watchParam } = storeToRefs(searchStore)
const { userAccess } = storeToRefs(useUserStore())
const { filters, open: filtersOpen, request, apply, reset: resetFilters } = useSearchFilters()

const query = computed(() => String(route.query.q ?? '').trim())

// строка поиска в шапке показывает текущий запрос (прямой переход по ссылке, назад/вперёд)
watch(query, (q) => {
  if (q && searchQuery.value !== q)
    searchQuery.value = q
}, { immediate: true })

useHead({ title: () => query.value || 'Поиск' })

// на узком экране фильтры по умолчанию свёрнуты
onMounted(() => {
  if (window.matchMedia('(max-width: 900px)').matches)
    filtersOpen.value = false
})

/* ---------- основной запрос ---------- */

const effectiveQuery = computed(() => applyMatch(query.value, filters.value.match))

const { data, status, refresh, error } = useAsyncData(
  () => `search:${effectiveQuery.value}`,
  () => effectiveQuery.value
    ? search(effectiveQuery.value, 0, 0, { filters: request.value })
    : Promise.resolve(null),
  { server: false, watch: [effectiveQuery] },
)

// повторный поиск того же запроса из строки поиска
watch(watchParam, () => refresh())

/* ---------- разбор фразы: поиск отдельного слова ---------- */

const tokens = computed(() => data.value?.parsed ?? [])
const tokenIndex = ref<number | null>(null)
const tokenQuery = computed(() => {
  if (tokenIndex.value === null)
    return ''
  const token = tokens.value[tokenIndex.value]
  return token ? token.base || token.surface : ''
})

watch(query, () => {
  tokenIndex.value = null
})

const { data: tokenData, status: tokenStatus } = useAsyncData(
  () => `search-token:${tokenQuery.value}`,
  () => tokenQuery.value ? search(tokenQuery.value, 0, 0, { filters: request.value }) : Promise.resolve(null),
  { server: false, watch: [tokenQuery] },
)

// фраза ничего не нашла целиком — показываем первое значимое слово
watch(data, (value) => {
  if (value && !value.result?.length && value.parsed?.length > 1 && tokenIndex.value === null) {
    const first = value.parsed.findIndex(token => token.base && !/^[\p{P}\p{S}\s]+$/u.test(token.surface))
    if (first !== -1)
      tokenIndex.value = first
  }
})

const current = computed(() => tokenIndex.value !== null ? tokenData.value : data.value)
const currentStatus = computed(() => tokenIndex.value !== null ? tokenStatus.value : status.value)
const currentQuery = computed(() => tokenQuery.value || query.value)

/* ---------- выдача и фильтры ---------- */

const results = computed(() => current.value?.result ?? [])
const facets = computed(() => searchFacets(results.value))
const filtered = computed(() => apply(results.value))

const PAGE = 30
const limit = ref(PAGE)
watch([currentQuery, filters], () => {
  limit.value = PAGE
}, { deep: true })
const visible = computed(() => filtered.value.slice(0, limit.value))

/* ---------- словари ---------- */

type Dict = 'jr' | 'kanji' | 'rj' | 'satellites' | 'scans'
const dict = ref<Dict>('jr')
watch(query, () => {
  dict.value = 'jr'
})

const { client: ocrClient } = useOcrApi()
const scansEnabled = computed(() => Boolean(userAccess.value.hasAccessOcr))
const { data: scans } = useAsyncData(
  () => `search-scans:${currentQuery.value}`,
  () => scansEnabled.value && currentQuery.value
    ? ocrClient.get<OCRPageWithBook[]>('/ocr/search', { q: currentQuery.value }).catch(() => [])
    : Promise.resolve([] as OCRPageWithBook[]),
  { server: false, watch: [currentQuery, scansEnabled] },
)

const SOON = 'Появится, когда поиск по этому словарю будет на сервере'
const dictItems = computed<UiSideNavItem[]>(() => [
  { id: 'jr', label: 'Японско-русский', count: currentStatus.value === 'success' ? filtered.value.length : undefined },
  { id: 'kanji', label: 'Кандзи', disabled: true, hint: SOON },
  { id: 'rj', label: 'Русско-японский β', disabled: true, hint: SOON },
  { id: 'satellites', label: 'Спутники', disabled: true, hint: SOON },
  scansEnabled.value
    ? { id: 'scans', label: 'Сканы', count: scans.value?.length ?? 0 }
    : { id: 'scans', label: 'Сканы', disabled: true, hint: 'Доступно участникам с правом работы со сканами' },
])

const dictModel = computed({
  get: () => dict.value,
  set: (value: string) => { dict.value = value as Dict },
})
</script>

<template>
  <div>
    <h1 class="sr-only">
      Результаты поиска{{ query ? `: ${query}` : '' }}
    </h1>

    <div v-if="!query" class="py-16 text-center text-muted">
      Введите слово, чтение, кандзи или русское слово в строку поиска.
    </div>

    <template v-else>
      <SearchPhrase v-if="tokens.length > 1" v-model="tokenIndex" :tokens="tokens" class="mt-2" />

      <div class="mt-[26px] flex flex-wrap items-start gap-9 max-md:gap-6">
        <!-- словари и фильтры -->
        <aside aria-label="Словари и фильтры" class="max-w-[280px] flex-[0_0_250px] max-md:max-w-none max-md:flex-[1_1_100%]">
          <UiSideNav v-model="dictModel" :items="dictItems" label="Словари" class="mb-6" />
          <SearchFiltersPanel v-show="dict === 'jr'" :facets="facets" :query="currentQuery" />
        </aside>

        <!-- выдача -->
        <div class="min-w-0 flex-[999_1_640px]">
          <SearchConversions v-if="current" :data="current" class="mb-4" />

          <template v-if="dict === 'scans'">
            <SearchScans v-if="scans?.length" :pages="scans" />
            <p v-else class="text-muted">
              На сканах ничего не найдено.
            </p>
          </template>

          <template v-else-if="currentStatus === 'pending' || currentStatus === 'idle'">
            <div v-for="i in 3" :key="i" class="animate-pulse border-t border-line py-[22px] pr-9 pl-[18px] first:border-t-0" aria-hidden="true">
              <div class="h-8 w-48 rounded-ctl bg-soft" />
              <div class="mt-3 h-4 w-80 max-w-full rounded-tag bg-soft" />
              <div class="mt-2 h-4 w-64 max-w-full rounded-tag bg-soft" />
            </div>
            <span class="sr-only">Идёт поиск</span>
          </template>

          <div v-else-if="currentStatus === 'error'" class="py-6">
            <p class="m-0 font-semibold">
              Не удалось выполнить поиск.
            </p>
            <p class="m-0 mt-1 text-sm text-muted">
              {{ error?.message }}
            </p>
            <UiButton class="mt-3" icon="tabler:refresh" @click="refresh()">
              Повторить
            </UiButton>
          </div>

          <template v-else-if="filtered.length">
            <section aria-label="Статьи">
              <SearchResultItem v-for="entry in visible" :key="entry.wid" :entry="entry" :query="query" />
            </section>

            <div v-if="filtered.length > visible.length" class="mt-2">
              <UiButton variant="link" icon="tabler:chevron-down" @click="limit += PAGE">
                Показать ещё {{ Math.min(PAGE, filtered.length - visible.length) }} из {{ filtered.length - visible.length }}
              </UiButton>
            </div>

            <p class="m-0 mt-[18px] border-t border-line pt-3.5 text-sm text-muted">
              Нет нужного слова или значения?
              <NuxtLink :to="{ name: 'dict-jpn-new' }" class="text-strong no-underline hover:underline hover:underline-offset-[3px]">
                Создайте статью
              </NuxtLink>
              или предложите правку в существующей.
            </p>
          </template>

          <UiEmptyState v-else-if="results.length" title="Все статьи скрыты фильтрами">
            По запросу найдено {{ results.length }} {{ pluralRu(results.length, 'статья', 'статьи', 'статей') }}, но ни одна не подходит под выбранные фильтры.
            <template #actions>
              <UiButton variant="primary" @click="resetFilters">
                Сбросить фильтры
              </UiButton>
            </template>
          </UiEmptyState>

          <UiEmptyState v-else>
            <template #title>
              В словаре нет статьи <span lang="ja" class="ml-1 font-jp text-2xl">{{ currentQuery }}</span>
            </template>
            Проверьте написание или посмотрите другие словари. Если слова действительно нет — добавьте его:
            статья появится в поиске после проверки.
            <template #actions>
              <UiButton variant="primary" size="lg" icon="tabler:plus" :to="{ name: 'dict-jpn-new' }">
                Создать статью <span lang="ja" class="font-jp">{{ currentQuery }}</span>
              </UiButton>
            </template>
          </UiEmptyState>
        </div>
      </div>
    </template>
  </div>
</template>
