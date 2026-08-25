export interface KanjiComponent {
  component: string
  strokes: number
}

export interface KanjiSearchRequest {
  components: string[]
  limit?: number
}

export interface KanjiSearchResponse {
  components: string[]
  result: Record<string, string[]>
}
