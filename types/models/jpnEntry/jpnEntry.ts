export interface JpnEntry {
  wid: string|null
  externalEntry: string|null
  isReviewed: boolean
  isUnconfirmed: boolean
  isArchaic: boolean
  needUpdate: boolean
  entry: JpnEntryContent
  picturesId: number
  kanjis: KanjiEntry[]|null
}
