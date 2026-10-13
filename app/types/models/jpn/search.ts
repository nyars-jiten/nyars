import type { components } from '~/generated/api'

type Schemas = components['schemas']

// Запрос и вспомогательные структуры берутся из OpenAPI-схемы (bun run api:types)
export type SearchRequest = Schemas['dto.SearchRequest']
export type SearchFilters = Schemas['dto.SearchFilters']
export type RandomRequest = Schemas['dto.RandomRequest']
export type SearchToken = Schemas['dto.SearchToken']
export type DictCount = Schemas['dto.DictCount']
export type SearchInterpretation = Schemas['dto.Interpretation']
export type SatEntry = Schemas['dto.SatEntry']
export type StoreKanjiItem = Schemas['entities.StoreKanjiItem']

export type SearchDict = NonNullable<SearchRequest['dict']>
export type SearchSort = NonNullable<SearchFilters['sort']>
export type SearchMark = NonNullable<NonNullable<NonNullable<SearchFilters['marks']>['include']>[number]>
export type DefLang = NonNullable<NonNullable<NonNullable<SearchFilters['defLang']>['include']>[number]>

/** В схеме все поля необязательные, а EntryJp и OCR-страницы описаны у нас — уточняем */
export type JpnSearchResponse = Omit<Schemas['dto.SearchResponse'], 'dict' | 'mode' | 'items' | 'timings' | 'similar' | 'ocrItems' | 'unitConversions' | 'eraConversions'> & {
  unitConversions?: UnitConversion[]
  eraConversions?: EraConversion[]
  dict: SearchDict
  mode: 'query' | 'token'
  items: EntryJp[]
  timings: NonNullable<Schemas['dto.SearchResponse']['timings']>
  similar?: { kind: 'contains' | 'fuzzy', items: EntryJp[] }
  ocrItems?: OCRPageWithBook[]
}

export interface RandomResponse {
  items: EntryJp[]
}

export interface UnitConversion {
  srcValue: number
  resValue: number
  unit: string
  unitReading: string
  metricUnit: string
}

export interface EraConversion {
  srcEra: string
  srcYear: number
  gregorianYear: number
  eraReading: string
}
