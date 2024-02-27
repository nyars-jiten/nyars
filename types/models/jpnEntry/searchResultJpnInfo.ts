export interface SearchResultJpnInfo {
  count: number
  page: number
  request: string|null
  /** If the whole phrase is found  "-1". If it is not found, the first lemma is selected "0" */
  selectedLemma: 0 | -1
  readonly parsedGrammar: ParsedWord[]
}
