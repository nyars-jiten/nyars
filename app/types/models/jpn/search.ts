export interface SearchRequest {
  query: string
}

export interface SearchResponse {
  result: EntryJp[]
}

export interface JpnSearchResponse {
  result: EntryJp[]
  request: string[]
}
