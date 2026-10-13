// Состояние фильтров и сортировки выдачи. Фильтрация и сортировка выполняются на сервере,
// здесь только состояние панели и сборка тела filters (см. app/utils/search-url.ts).
// Синхронизация с URL — в app/pages/dict/jpn/index.vue.

export const SORT_OPTIONS: UiOption<SearchSort>[] = [
  { value: 'freq', label: 'По частотности' },
  { value: 'length', label: 'По длине заголовка' },
  { value: 'edited', label: 'По дате правки' },
  { value: 'gojuon', label: 'По алфавиту (годзюон)' },
  { value: 'iroha', label: 'По алфавиту (ироха)' },
  { value: 'kiriji', label: 'По киридзи' },
  { value: 'romaji', label: 'По ромадзи' },
]

export const MARK_OPTIONS: { value: SearchMark, label: string }[] = [
  { value: 'unreviewed', label: 'не проверено' },
  { value: 'unconfirmed', label: 'не подтверждается' },
  { value: 'archaic', label: 'устаревшее' },
  { value: 'dialect', label: 'диалектное' },
  { value: 'proper', label: 'имя собственное' },
]

export const DEF_LANG_OPTIONS: UiOption<DefLang | ''>[] = [
  { value: '', label: 'не выбрано' },
  { value: 'ru', label: 'русский' },
  { value: 'en', label: 'английский' },
  { value: 'jp', label: 'японский' },
]

export function useSearchFilters() {
  const filters = useState<SearchFiltersState>('search-filters', defaultSearchFilters)
  const open = useState<boolean>('search-filters-open', () => true)

  function reset() {
    filters.value = defaultSearchFilters()
  }

  const activeCount = computed(() => {
    const f = filters.value
    const d = defaultSearchFilters()
    let n = 0
    if (f.sort !== d.sort || f.desc)
      n++
    n += Object.keys(f.tags).length
    n += Object.keys(f.marks).length
    if (f.defLang)
      n++
    if (f.rankMin !== d.rankMin || f.rankMax !== d.rankMax || !f.includeUnranked)
      n++
    if (f.lenMin !== null || f.lenMax !== null)
      n++
    if (f.inTranslations)
      n++
    return n
  })

  /** Тело filters для API; undefined, если фильтров нет */
  const request = computed(() => buildSearchFilters(filters.value))

  return { filters, open, reset, activeCount, request }
}
