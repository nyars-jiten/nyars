import type { FuriganaPair } from './entry'

export interface SearchRequest {
  query: string
}

export interface SearchResponse {
  result: EntryJp[]
}

export interface Token {
  surface: string
  furigana: FuriganaPair[]
  // reading: string
  base: string
  deinflect: Deinflect[]
  children: Token[]
}

export interface Deinflect {
  source: string
  target: string
  surface: string
  rule: string
}

export interface JpnSearchResponse {
  result: EntryJp[]
  request: string[]
  unitConversions: UnitConversion[]
  eraConversions: EraConversion[]
  parsed: Token[]
  timings: Timings
}

export interface Timings {
  total: string
  tokenization: string
  search: string
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
