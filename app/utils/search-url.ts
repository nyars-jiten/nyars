// Состояние поиска в URL: q, t (токен), dict и фильтры — чтобы после обновления страницы приходил тот же ответ.
// Разбор защитный: неизвестные значения отбрасываются, чтобы не получить 400 от бэкенда.
import type { LocationQuery, LocationQueryRaw } from 'vue-router'

export const SEARCH_SORTS: readonly SearchSort[] = ['freq', 'length', 'edited', 'gojuon', 'iroha', 'kiriji', 'romaji']
export const SEARCH_MARKS: readonly SearchMark[] = ['unreviewed', 'unconfirmed', 'archaic', 'dialect', 'proper']
export const DEF_LANGS: readonly DefLang[] = ['ru', 'en', 'jp']
export const SEARCH_DICTS: readonly SearchDict[] = ['jp', 'ocr', 'sat', 'kanji']

/** Положение ползунков частотности: 0–100 */
export const RANK_SLIDER_MAX = 100

export interface SearchFiltersState {
  sort: SearchSort
  desc: boolean
  /** теги, части речи и JLPT — по id тега */
  tags: Record<number, TriState>
  marks: Partial<Record<SearchMark, TriState>>
  /** null — любой язык определения */
  defLang: DefLang | null
  /** границы ранга; null — без ограничения */
  rankMin: number | null
  rankMax: number | null
  includeUnranked: boolean
  lenMin: number | null
  lenMax: number | null
  inTranslations: boolean
}

export function defaultSearchFilters(): SearchFiltersState {
  return {
    sort: 'freq',
    desc: false,
    tags: {},
    marks: {},
    defLang: null,
    rankMin: null,
    rankMax: null,
    includeUnranked: true,
    lenMin: null,
    lenMax: null,
    inTranslations: false,
  }
}

export interface SearchUrlState {
  q: string
  /** индекс токена, выбранного кликом; null — весь запрос */
  token: number | null
  dict: SearchDict
  filters: SearchFiltersState
}

/** Максимальный ранг по частотности: правый край слайдера */
export const RANK_MAX = 50000

/** ползунок 0–100 → ранг; квадратичная шкала, чтобы частым словам досталось больше хода */
export function sliderToRank(value: number) {
  return Math.round((value / 100) ** 2 * RANK_MAX)
}

/** ранг → положение ползунка 0–100 */
export function rankToSlider(rank: number) {
  return Math.round(Math.sqrt(Math.min(Math.max(rank, 0), RANK_MAX) / RANK_MAX) * 100)
}

function first(value: LocationQuery[string] | undefined): string {
  const v = Array.isArray(value) ? value[0] : value
  return typeof v === 'string' ? v : ''
}

function int(value: string): number | null {
  return /^\d{1,9}$/.test(value) ? Number(value) : null
}

function parseSigned(value: string): [number, TriState][] {
  const result: [number, TriState][] = []
  for (const part of value.split(',')) {
    const exclude = part.startsWith('-')
    const id = int(exclude ? part.slice(1) : part)
    if (id !== null)
      result.push([id, exclude ? 'exclude' : 'include'])
  }
  return result
}

function serializeSigned(entries: [string | number, TriState | undefined][]) {
  return entries.filter(([, v]) => v).map(([k, v]) => `${v === 'exclude' ? '-' : ''}${k}`).join(',')
}

export function parseSearchQuery(query: LocationQuery): SearchUrlState {
  const filters = defaultSearchFilters()

  const sort = first(query.sort) as SearchSort
  if (SEARCH_SORTS.includes(sort))
    filters.sort = sort
  filters.desc = first(query.desc) === '1'

  for (const [id, state] of parseSigned(first(query.tags)))
    filters.tags[id] = state

  for (const part of first(query.marks).split(',')) {
    const exclude = part.startsWith('-')
    const mark = (exclude ? part.slice(1) : part) as SearchMark
    if (SEARCH_MARKS.includes(mark))
      filters.marks[mark] = exclude ? 'exclude' : 'include'
  }

  const lang = first(query.lang) as DefLang
  if (DEF_LANGS.includes(lang))
    filters.defLang = lang

  const rank = /^(\d{0,7})-(\d{0,7})$/.exec(first(query.rank))
  if (rank) {
    filters.rankMin = rank[1] ? Number(rank[1]) : null
    filters.rankMax = rank[2] ? Number(rank[2]) : null
  }
  filters.includeUnranked = first(query.unranked) !== '0'

  const len = /^(\d{0,3})-(\d{0,3})$/.exec(first(query.len))
  if (len) {
    filters.lenMin = len[1] ? Number(len[1]) : null
    filters.lenMax = len[2] ? Number(len[2]) : null
  }
  filters.inTranslations = first(query.tr) === '1'

  const dict = first(query.dict) as SearchDict
  const token = int(first(query.t))

  return {
    q: first(query.q).trim(),
    token,
    // другие словари ищут только по тексту запроса
    dict: SEARCH_DICTS.includes(dict) && first(query.q).trim() ? dict : 'jp',
    filters,
  }
}

/** Параметры фильтров для URL; значения по умолчанию пропускаются */
export function serializeSearchFilters(filters: SearchFiltersState): LocationQueryRaw {
  const d = defaultSearchFilters()
  const query: LocationQueryRaw = {}
  if (filters.sort !== d.sort)
    query.sort = filters.sort
  if (filters.desc)
    query.desc = '1'
  const tags = serializeSigned(Object.entries(filters.tags))
  if (tags)
    query.tags = tags
  const marks = serializeSigned(Object.entries(filters.marks))
  if (marks)
    query.marks = marks
  if (filters.defLang)
    query.lang = filters.defLang
  if (filters.rankMin !== null || filters.rankMax !== null)
    query.rank = `${filters.rankMin ?? ''}-${filters.rankMax ?? ''}`
  if (!filters.includeUnranked)
    query.unranked = '0'
  if (filters.lenMin !== null || filters.lenMax !== null)
    query.len = `${filters.lenMin ?? ''}-${filters.lenMax ?? ''}`
  if (filters.inTranslations)
    query.tr = '1'
  return query
}

export function serializeSearchQuery(state: SearchUrlState): LocationQueryRaw {
  const query: LocationQueryRaw = {}
  if (state.q)
    query.q = state.q
  if (state.token !== null)
    query.t = String(state.token)
  if (state.dict !== 'jp')
    query.dict = state.dict
  return { ...query, ...serializeSearchFilters(state.filters) }
}

function includeExclude<K extends string | number>(entries: [K, TriState | undefined][]) {
  const include = entries.filter(([, v]) => v === 'include').map(([k]) => k)
  const exclude = entries.filter(([, v]) => v === 'exclude').map(([k]) => k)
  return include.length || exclude.length
    ? { ...(include.length && { include }), ...(exclude.length && { exclude }) }
    : undefined
}

/** Тело filters для API; undefined, если ничего не задано */
export function buildSearchFilters(f: SearchFiltersState): SearchFilters | undefined {
  const d = defaultSearchFilters()
  const result: SearchFilters = {}
  if (f.sort !== d.sort)
    result.sort = f.sort
  if (f.desc)
    result.desc = true
  const tags = includeExclude(Object.entries(f.tags).map(([id, v]) => [Number(id), v] as [number, TriState]))
  if (tags)
    result.tags = tags
  const marks = includeExclude(Object.entries(f.marks) as [SearchMark, TriState][])
  if (marks)
    result.marks = marks
  if (f.defLang)
    result.defLang = { include: [f.defLang] }
  if (f.rankMin !== null)
    result.rankMin = f.rankMin
  if (f.rankMax !== null)
    result.rankMax = f.rankMax
  if (!f.includeUnranked)
    result.includeUnranked = false
  if (f.lenMin !== null)
    result.lenMin = f.lenMin
  if (f.lenMax !== null)
    result.lenMax = f.lenMax
  if (f.inTranslations)
    result.inTranslations = true
  return Object.keys(result).length ? result : undefined
}
