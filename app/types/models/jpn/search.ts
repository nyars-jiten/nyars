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
  parsed: Token[]
}
