// Фильтры и сортировка выдачи поиска.
// Пока бэкенд их не поддерживает, всё применяется на клиенте к полученной выдаче,
// а параметры дополнительно уходят в запрос (поле filters) — см. docs/backend-search.md.

export type SearchSort = 'relevance' | 'frequency' | 'length' | 'gojuon'
export type SearchMatch = 'exact' | 'start' | 'contains' | 'pattern'
export type JlptFilter = JlptLevel | 'none'

export interface SearchFilters {
  sort: SearchSort
  /** null — как ввели (поведение бэкенда по умолчанию) */
  match: SearchMatch | null
  /** снятые флажки частей речи: новые части речи по умолчанию включены */
  posExcluded: string[]
  /** пусто — все уровни */
  jlpt: JlptFilter[]
  /** положение ползунков частотности, 0–100 */
  rank: [number, number]
  includeUnranked: boolean
  /** пометы: статья должна иметь хотя бы одну из выбранных */
  labels: string[]
  /** длина заголовка в знаках; null — без ограничения */
  lengthMin: number | null
  lengthMax: number | null
  withExamples: boolean
  hideUnreviewed: boolean
  /** искать и в переводах — только на бэкенде */
  inTranslations: boolean
}

export const RANK_MAX = 50000

/** ползунок 0–100 → ранг; квадратичная шкала, чтобы частым словам досталось больше хода */
export function sliderToRank(value: number) {
  return Math.round((value / 100) ** 2 * RANK_MAX)
}

function defaults(): SearchFilters {
  return {
    sort: 'relevance',
    match: null,
    posExcluded: [],
    jlpt: [],
    rank: [0, 100],
    includeUnranked: true,
    labels: [],
    lengthMin: null,
    lengthMax: null,
    withExamples: false,
    hideUnreviewed: false,
    inTranslations: false,
  }
}

export const SORT_OPTIONS: UiOption<SearchSort>[] = [
  { value: 'relevance', label: 'По релевантности' },
  { value: 'frequency', label: 'По частотности' },
  { value: 'length', label: 'По длине заголовка' },
  { value: 'gojuon', label: 'По алфавиту (годзюон)' },
]

export function matchOptions(query: string): UiOption<SearchMatch>[] {
  const q = query.replace(/^"|"$/g, '').replace(/^\*|\*$/g, '') || '蛙'
  const short = Array.from(q).length > 4 ? `${Array.from(q).slice(0, 3).join('')}…` : q
  return [
    { value: 'exact', label: 'точное', hint: short },
    { value: 'start', label: 'начало', hint: `${short}…` },
    { value: 'contains', label: 'вхождение', hint: `…${short}…` },
    { value: 'pattern', label: 'шаблон', hint: '蛙*の?' },
  ]
}

/**
 * Запрос с учётом типа совпадения. Бэкенд уже понимает синтаксис:
 * "слово" — точное, * и ? — подстановки (см. примеры на главной).
 */
export function applyMatch(query: string, match: SearchMatch | null) {
  const q = query.trim()
  if (!q || !match || match === 'pattern')
    return q
  const bare = q.replace(/^"(.*)"$/, '$1').replace(/^\*+|\*+$/g, '')
  if (match === 'exact')
    return `"${bare}"`
  if (match === 'start')
    return `${bare}*`
  return `*${bare}*`
}

export function useSearchFilters() {
  const filters = useState<SearchFilters>('search-filters', defaults)
  const open = useState<boolean>('search-filters-open', () => true)

  function reset() {
    // тип совпадения и сортировка — часть запроса, их сбрасываем тоже
    filters.value = defaults()
  }

  const activeCount = computed(() => {
    const f = filters.value
    const d = defaults()
    let n = 0
    if (f.sort !== d.sort)
      n++
    if (f.match)
      n++
    if (f.posExcluded.length)
      n++
    if (f.jlpt.length)
      n++
    if (f.rank[0] !== 0 || f.rank[1] !== 100 || !f.includeUnranked)
      n++
    n += f.labels.length ? 1 : 0
    if (f.lengthMin !== null || f.lengthMax !== null)
      n++
    n += [f.withExamples, f.hideUnreviewed, f.inTranslations].filter(Boolean).length
    return n
  })

  /** Параметры для бэкенда — сейчас он их игнорирует */
  const request = computed(() => {
    const f = filters.value
    return {
      sort: f.sort,
      match: f.match,
      posExcluded: f.posExcluded,
      jlpt: f.jlpt,
      rankMin: sliderToRank(f.rank[0]),
      rankMax: f.rank[1] >= 100 ? null : sliderToRank(f.rank[1]),
      includeUnranked: f.includeUnranked,
      labels: f.labels,
      lengthMin: f.lengthMin,
      lengthMax: f.lengthMax,
      withExamples: f.withExamples,
      hideUnreviewed: f.hideUnreviewed,
      inTranslations: f.inTranslations,
    }
  })

  function apply(entries: readonly EntryJp[]): EntryJp[] {
    const f = filters.value
    const rankFiltered = f.rank[0] !== 0 || f.rank[1] !== 100
    const rankMin = sliderToRank(f.rank[0])
    const rankMax = f.rank[1] >= 100 ? Infinity : sliderToRank(f.rank[1])

    const result = entries.filter((entry) => {
      if (f.hideUnreviewed && entry.status.isUnreviewed)
        return false
      if (f.withExamples && entryExampleCount(entry) === 0)
        return false

      if (f.posExcluded.length) {
        const groups = entryPosGroups(entry)
        if (groups.length && groups.every(g => f.posExcluded.includes(g.id)))
          return false
      }

      if (f.jlpt.length) {
        const level = entryJlpt(entry)
        if (!f.jlpt.includes(level ?? 'none'))
          return false
      }

      const rank = entry.frequency > 0 ? entry.frequency : null
      if (rank === null) {
        if (!f.includeUnranked)
          return false
      }
      else if (rankFiltered && (rank < rankMin || rank > rankMax)) {
        return false
      }

      if (f.labels.length) {
        const labels = entryLabels(entry)
        if (!f.labels.some(label => labels.includes(label)))
          return false
      }

      if (f.lengthMin !== null || f.lengthMax !== null) {
        const length = Array.from(headwordForms(entry)[0]?.text ?? entry.title).length
        if (f.lengthMin !== null && length < f.lengthMin)
          return false
        if (f.lengthMax !== null && length > f.lengthMax)
          return false
      }

      return true
    })

    if (f.sort === 'frequency')
      result.sort((a, b) => (a.frequency || Infinity) - (b.frequency || Infinity))
    else if (f.sort === 'length')
      result.sort((a, b) => Array.from(headwordForms(a)[0]?.text ?? '').length - Array.from(headwordForms(b)[0]?.text ?? '').length)
    else if (f.sort === 'gojuon')
      result.sort((a, b) => entryReading(a).localeCompare(entryReading(b), 'ja'))

    return result
  }

  return { filters, open, reset, activeCount, request, apply }
}

export interface SearchFacets {
  pos: { id: string, label: string, count: number }[]
  jlpt: Record<JlptFilter, number>
  labels: { label: string, count: number }[]
}

/** Значения для панели фильтров со счётчиками — по всей выдаче, до фильтрации */
export function searchFacets(entries: readonly EntryJp[]): SearchFacets {
  const pos = new Map<string, { id: string, label: string, count: number }>()
  const labels = new Map<string, number>()
  const jlpt = { N5: 0, N4: 0, N3: 0, N2: 0, N1: 0, none: 0 } as Record<JlptFilter, number>

  for (const entry of entries) {
    for (const group of entryPosGroups(entry)) {
      const item = pos.get(group.id) ?? { ...group, count: 0 }
      item.count++
      pos.set(group.id, item)
    }
    for (const label of entryLabels(entry))
      labels.set(label, (labels.get(label) ?? 0) + 1)
    jlpt[entryJlpt(entry) ?? 'none']++
  }

  return {
    pos: [...pos.values()].sort((a, b) => b.count - a.count),
    jlpt,
    labels: [...labels.entries()].map(([label, count]) => ({ label, count })).sort((a, b) => b.count - a.count).slice(0, 12),
  }
}
