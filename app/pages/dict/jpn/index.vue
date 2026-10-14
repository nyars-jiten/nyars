<script setup lang="ts">
import type { LocationQuery } from 'vue-router'

// Страница поиска по словарю: разбор фразы, словари, фильтры и выдача.
// Состояние (запрос, токен, словарь, фильтры) хранится в URL, поэтому после обновления страницы приходит тот же ответ.
// Шаблон страницы (шапка, подвал) задаёт родительский pages/dict/jpn.vue.
definePageMeta({
  layout: false,
})

const route = useRoute()
const router = useRouter()
const searchStore = useSearchStore()
const { searchQuery, watchParam } = storeToRefs(searchStore)
const { userAccess } = storeToRefs(useUserStore())
const { filters, open: filtersOpen, reset: resetFilters, activeCount } = useSearchFilters()

const urlState = computed(() => parseSearchQuery(route.query))
const query = computed(() => urlState.value.q)

// строка поиска в шапке показывает текущий запрос (прямой переход по ссылке, назад/вперёд)
watch(query, (q) => {
  if (searchQuery.value !== q)
    searchQuery.value = q
}, { immediate: true })

useHead({ title: () => query.value || 'Поиск' })

// на узком экране фильтры по умолчанию свёрнуты
onMounted(() => {
  if (window.matchMedia('(max-width: 900px)').matches)
    filtersOpen.value = false
})

/* ---------- URL ↔ фильтры ---------- */

const canonical = (state: SearchUrlState) => JSON.stringify(serializeSearchQuery(state))
const canonicalFilters = (value: SearchFiltersState) => JSON.stringify(serializeSearchFilters(value))

// URL → панель (переход по ссылке, назад/вперёд)
watch(() => route.query, () => {
  if (canonicalFilters(filters.value) !== canonicalFilters(urlState.value.filters))
    filters.value = urlState.value.filters
}, { immediate: true })

// панель → URL: фильтры подменяют запись истории, а не добавляют новую
function commitFilters() {
  const next = { ...urlState.value, filters: filters.value }
  if (canonical(next) !== canonical(urlState.value))
    router.replace({ query: serializeSearchQuery(next) })
}
const commitFiltersLater = useDebounceFn(commitFilters, 1000)

// чипы, селекты и флажки применяются сразу; числовые поля и ползунок — после паузы, чтобы не слать запрос на каждый знак
const typedKey = (f: SearchFiltersState) => JSON.stringify({ ...f, rankMin: 0, rankMax: 0, lenMin: 0, lenMax: 0 })
let lastTypedKey = typedKey(filters.value)
watch(filters, (value) => {
  const key = typedKey(value)
  const discrete = key !== lastTypedKey
  lastTypedKey = key
  if (discrete)
    commitFilters()
  else
    commitFiltersLater()
}, { deep: true })

/* ---------- выдача ---------- */

const {
  first,
  tokens,
  items,
  nextCursor,
  status,
  error,
  loadingMore,
  randomMode,
  activeToken,
  tokenMode,
  other,
  otherStatus,
  otherError,
  refreshing,
  cancel,
  run,
  more,
  showRandom,
  runOther,
  dictCount,
} = useJpnSearch(urlState)

// повторный поиск того же запроса из строки поиска
watch(watchParam, () => {
  run()
  runOther()
})

/* ---------- обновление выдачи: индикация, отмена, прокрутка ---------- */

// панель изменена, а URL (и запрос) ещё нет: результат устарел, показывать «ничего не найдено» рано
const settling = computed(() => canonicalFilters(filters.value) !== canonicalFilters(urlState.value.filters))
const resultsEl = useTemplateRef<HTMLElement>('resultsEl')

// выдача на экране устарела: фильтр уже изменён, а новый ответ ещё не пришёл
const stale = computed(() => refreshing.value || (settling.value && items.value.length > 0))
const showStale = ref(false)
const showSlow = ref(false)
let staleTimer: ReturnType<typeof setTimeout> | undefined
let slowTimer: ReturnType<typeof setTimeout> | undefined
watch(stale, (value) => {
  clearTimeout(staleTimer)
  clearTimeout(slowTimer)
  if (!value) {
    showStale.value = false
    showSlow.value = false
    return
  }
  // быстрые ответы не мигают индикацией
  staleTimer = setTimeout(() => {
    showStale.value = true
  }, 150)
  slowTimer = setTimeout(() => {
    showSlow.value = true
  }, 3000)
})
onBeforeUnmount(() => {
  clearTimeout(staleTimer)
  clearTimeout(slowTimer)
})

// URL последней успешной выдачи — к нему возвращает «Отменить»
let lastOkQuery: LocationQuery = { ...route.query }
watch(status, (value, prev) => {
  if (value === 'success') {
    lastOkQuery = { ...route.query }
    // новая выдача пришла, а пользователь прокручен ниже её начала — возвращаем к началу
    if (prev === 'pending') {
      nextTick(() => {
        if (resultsEl.value && resultsEl.value.getBoundingClientRect().top < 0)
          resultsEl.value.scrollIntoView({ block: 'start' })
      })
    }
  }
})

function cancelSearch() {
  cancel()
  router.replace({ query: lastOkQuery })
}

const hasFilters = computed(() => activeCount.value > 0)
const dict = computed(() => urlState.value.dict)
const isJp = computed(() => dict.value === 'jp')

/* ---------- токены ---------- */

const tokenModel = computed({
  get: () => activeToken.value,
  set: (value: number | null) => {
    router.push({ query: serializeSearchQuery({ ...urlState.value, token: value, filters: filters.value }) })
  },
})

const currentQuery = computed(() => {
  const token = activeToken.value !== null ? tokens.value[activeToken.value] : undefined
  return token ? token.base || token.surface || query.value : query.value
})

/* ---------- словари ---------- */

const scansEnabled = computed(() => Boolean(userAccess.value.hasAccessOcr))

const dictItems = computed<UiSideNavItem[]>(() => [
  { id: 'jp', label: 'Японско-русский', count: dictCount('jp') },
  { id: 'kanji', label: 'Кандзи', count: dictCount('kanji') },
  { id: 'rj', label: 'Русско-японский β', disabled: true, hint: 'Появится, когда поиск по этому словарю будет на сервере' },
  { id: 'sat', label: 'Спутники', count: dictCount('sat') },
  scansEnabled.value
    ? { id: 'ocr', label: 'Сканы', count: dictCount('ocr') }
    : { id: 'ocr', label: 'Сканы', disabled: true, hint: 'Доступно участникам с правом работы со сканами' },
])

const dictModel = computed({
  get: () => dict.value as string,
  set: (value: string) => {
    if (value === 'rj' || value === dict.value)
      return
    router.push({ query: serializeSearchQuery({ ...urlState.value, dict: value as SearchDict, filters: filters.value }) })
  },
})

/* ---------- подсказки ---------- */

// запрос понят как транскрипция в кану (мука → むか): можно искать его как слово из перевода
const transcribed = computed(() => {
  const i = first.value?.interpretation
  return !tokenMode.value && i?.transcribed && i.query ? i : null
})

function setInTranslations(value: boolean) {
  filters.value = { ...filters.value, inTranslations: value }
  commitFilters()
}

const interpretation = computed(() => {
  const i = first.value?.interpretation
  if (!i || tokenMode.value)
    return null
  if (i.transcribed && i.query)
    return `Показаны результаты для «${i.query}»`
  if (i.lang && i.lang !== 'jp')
    return i.lang === 'ru' ? 'Поиск по русским переводам' : 'Поиск по английским переводам'
  return null
})

// поиск по переводам: статьи с таким написанием не ищутся, создавать статью по русскому слову незачем
const translationSearch = computed(() => {
  const lang = first.value?.interpretation?.lang
  return (!!lang && lang !== 'jp') || filters.value.inTranslations
})

const similar = computed(() => !randomMode.value && !tokenMode.value ? first.value?.similar : undefined)
// слово, по которому реально искали (транскрипция в кану и т.п.), а не введённое
const searchedQuery = computed(() => first.value?.interpretation?.query || query.value)
const similarTitle = computed(() => similar.value?.kind === 'contains' ? `Слова, содержащие «${searchedQuery.value}»` : 'Похожие слова')
</script>

<template>
  <div>
    <h1 class="sr-only">
      Результаты поиска{{ query ? `: ${query}` : '' }}
    </h1>

    <SearchPhrase v-if="tokens.length > 1" v-model="tokenModel" :tokens="tokens" class="mt-2" />

    <div class="mt-[26px] flex flex-wrap items-start gap-9 max-md:gap-6">
      <!-- словари и фильтры -->
      <aside aria-label="Словари и фильтры" class="max-w-[280px] flex-[0_0_250px] max-md:max-w-none max-md:flex-[1_1_100%]">
        <UiSideNav v-if="query" v-model="dictModel" :items="dictItems" label="Словари" class="mb-6 transition-opacity" :class="{ 'opacity-60': showStale }" />
        <SearchFiltersPanel v-show="isJp" :disabled="tokenMode" />
        <UiButton v-if="isJp" icon="tabler:dice-3" class="mt-3 w-full" @click="showRandom()">
          Случайные статьи
        </UiButton>
      </aside>

      <!-- выдача -->
      <div ref="resultsEl" class="min-w-0 flex-[999_1_640px] scroll-mt-24">
        <!-- другие словари -->
        <template v-if="!isJp">
          <template v-if="otherStatus === 'pending' || otherStatus === 'idle'">
            <div v-for="i in 3" :key="i" class="animate-pulse border-t border-line py-[22px] first:border-t-0" aria-hidden="true">
              <div class="h-8 w-48 rounded-ctl bg-soft" />
              <div class="mt-3 h-4 w-80 max-w-full rounded-tag bg-soft" />
            </div>
            <span class="sr-only">Идёт поиск</span>
          </template>
          <div v-else-if="otherStatus === 'error'" class="py-6">
            <p class="m-0 font-semibold">
              Не удалось выполнить поиск.
            </p>
            <p class="m-0 mt-1 text-sm text-muted">
              {{ otherError?.message }}
            </p>
            <UiButton class="mt-3" icon="tabler:refresh" @click="runOther()">
              Повторить
            </UiButton>
          </div>
          <SearchScans v-else-if="dict === 'ocr'" :pages="other?.ocrItems ?? []" :query="query" />
          <SearchSatellites v-else-if="dict === 'sat'" :items="other?.satItems ?? []" :query="query" />
          <SearchKanji v-else-if="dict === 'kanji'" :items="other?.kanjiItems ?? []" :query="query" />
        </template>

        <template v-else>
          <div v-if="showStale" class="mb-3" role="status">
            <UiProgressBar label="Обновляем выдачу" />
            <p v-if="showSlow" class="m-0 mt-2 text-sm text-muted">
              Запрос выполняется дольше обычного.
              <button type="button" class="cursor-pointer text-strong hover:underline" @click="cancelSearch">
                Отменить
              </button>
            </p>
          </div>

          <div class="transition-opacity" :class="{ 'pointer-events-none opacity-50 select-none': showStale }" :aria-busy="showStale">
            <SearchConversions v-if="first" :data="first" class="mb-4" />

            <p v-if="interpretation" class="m-0 mb-3 flex flex-wrap items-center gap-x-3 text-sm text-muted">
              {{ interpretation }}
              <UiButton v-if="transcribed" variant="link" size="sm" @click="setInTranslations(true)">
                Искать «{{ query }}» в переводах
              </UiButton>
            </p>
            <p v-else-if="filters.inTranslations && query && !/[぀-ヿ一-鿿]/.test(query)" class="m-0 mb-3 flex flex-wrap items-center gap-x-3 text-sm text-muted">
              Поиск в переводах
              <UiButton variant="link" size="sm" @click="setInTranslations(false)">
                Искать как японское слово
              </UiButton>
            </p>

            <template v-if="(status === 'pending' || settling || status === 'idle') && !items.length">
              <div v-for="i in 3" :key="i" class="animate-pulse border-t border-line py-[22px] pr-9 pl-[18px] first:border-t-0" aria-hidden="true">
                <div class="h-8 w-48 rounded-ctl bg-soft" />
                <div class="mt-3 h-4 w-80 max-w-full rounded-tag bg-soft" />
                <div class="mt-2 h-4 w-64 max-w-full rounded-tag bg-soft" />
              </div>
              <span class="sr-only">Идёт поиск</span>
            </template>

            <div v-else-if="status === 'error'" class="py-6">
              <p class="m-0 font-semibold">
                Не удалось выполнить поиск.
              </p>
              <p class="m-0 mt-1 text-sm text-muted">
                {{ error?.message }}
              </p>
              <UiButton class="mt-3" icon="tabler:refresh" @click="run()">
                Повторить
              </UiButton>
            </div>

            <template v-else-if="items.length">
              <p v-if="randomMode" class="m-0 mb-3 flex flex-wrap items-center gap-x-3 text-sm text-muted">
                Показаны случайные статьи{{ query ? ` по запросу «${query}»` : '' }}.
                <UiButton variant="link" size="sm" @click="run()">
                  Показать обычную выдачу
                </UiButton>
              </p>
              <section aria-label="Статьи">
                <SearchResultItem v-for="entry in items" :key="entry.wid" :entry="entry" :query="query" />
              </section>

              <div v-if="randomMode" class="mt-2">
                <UiButton variant="link" icon="tabler:dice-3" @click="showRandom()">
                  Ещё случайные
                </UiButton>
              </div>
              <div v-else-if="nextCursor" class="mt-2">
                <UiButton variant="link" icon="tabler:chevron-down" :disabled="loadingMore" @click="more()">
                  {{ loadingMore ? 'Загрузка…' : 'Показать ещё' }}
                </UiButton>
              </div>
            </template>

            <UiEmptyState v-else-if="hasFilters && !tokenMode" title="Ничего не подходит под фильтры">
              Попробуйте ослабить фильтры или сбросить их.
              <template #actions>
                <UiButton variant="primary" @click="resetFilters">
                  Сбросить фильтры
                </UiButton>
              </template>
            </UiEmptyState>

            <UiEmptyState v-else-if="!query" title="Ничего не найдено">
              В словаре пока нет статей.
            </UiEmptyState>

            <UiEmptyState v-else-if="translationSearch" title="По переводам ничего не найдено">
              Проверьте написание или попробуйте другое слово.
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

            <section v-if="similar?.items?.length" :aria-label="similarTitle" class="mt-8">
              <UiCaption>{{ similarTitle }}</UiCaption>
              <SearchResultItem v-for="entry in similar.items" :key="entry.wid" :entry="entry" :query="query" />
            </section>

            <p v-if="items.length" class="m-0 mt-[18px] border-t border-line pt-3.5 text-sm text-muted">
              Нет нужного слова или значения?
              <NuxtLink :to="{ name: 'dict-jpn-new' }" class="text-strong no-underline hover:underline hover:underline-offset-[3px]">
                Создайте статью
              </NuxtLink>
              или предложите правку в существующей.
            </p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
