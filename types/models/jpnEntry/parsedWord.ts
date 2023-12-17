export interface ParsedWord {
  readonly word: string|null
  readonly ruby: string|null
  pos: string|null
  lemma: string|null
  readonly grammar: string|null
  notFound: boolean
}
