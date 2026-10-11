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

/** Сведения о кандзи для статьи. Пока не отдаются бэкендом — см. docs/backend-entry.md */
export interface KanjiInfo {
  kanji: string
  /** основное значение по-русски */
  meaning: string
  /** онные чтения: カイ */
  on: string[]
  /** кунные чтения: うみ, もっ-て */
  kun: string[]
  /** N5 … N1 */
  jlpt?: string
  /** уровень Канкэн: 準1級 */
  kanken?: string
}
