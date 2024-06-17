export interface ParsedWord {
  readonly word: string
  readonly ruby: string
  pos: string | null
  lemma: string | null
  readonly grammar: string
  notFound: boolean
}
