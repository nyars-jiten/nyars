import { array, string, type, type TypeOf } from 'io-ts'

export const CreateArticleJpn = type({
  body: string,
  reading: string,
  spelling: string,
})

const CreateArticleJpnList = array(CreateArticleJpn)

export type CreateArticleJpn = TypeOf<typeof CreateArticleJpn>
export type CreateArticleJpnList = TypeOf<typeof CreateArticleJpnList>

export interface EditorTxtEntryJp {
  reading: string
  spelling: string
  body: string
}

export interface WeeklyStats {
  stats: WeeklyUserStats[]
  site: StatsSite
}

export interface StatsSite {
  jpn: number
  jpnRev: number
  kanji: number
  kanjiRev: number
  rus: number
  rusRev: number
  jpnPrev: number
  jpnRevPrev: number
  kanjiPrev: number
  kanjiRevPrev: number
  rusPrev: number
  rusRevPrev: number
}

export interface WeeklyUserStats {
  stats: StatsUser
  user: ShortUser
}

export interface StatsUser {
  jpnNew: number
  jpnEdit: number
  kanjiNew: number
  kanjiEdit: number
  rusNew: number
  rusEdit: number
  autoNew: number
  autoEdit: number
  reviews: number
  rating: number
  edits: number
}

export interface V2EntryJpResponse {
  entry: V2EntryJp
}

export interface JpnSearchResponse {
  result: V2EntryJp[]
  request: string
}

export interface EditorEntryJp {
  entry: V2EntryJp
  warnings: string[]
}

export interface V2EntryJp {
  wid: string
  status: V2Status
  externalEntry: string
  title: string
  tags: V2Tag[]
  words: V2Word[]
  meanings: V2Meaning[]
  furigana: Furigana[]
  frequency: number
  preferFurigana: boolean
  hideRare: boolean
}

export interface Furigana {
  pairs: V2FuriganaPair[]
  transcription: V2Transcription
  tags: V2Tag[]
  isMarked: boolean
  freq: number
}

export interface V2Status {
  isReviewed: boolean
  isUnconfirmed: boolean
  isArchaic: boolean
  isDialect: boolean
  isProper: boolean
}

export interface V2Word {
  spellings: V2Spelling[]
  readings: V2Reading[]
}

export interface V2FuriganaPair {
  word: string
  kana: string
}

export interface V2Spelling {
  value: string
  tags: V2Tag[]
  isMarked: boolean
}

export interface V2Reading {
  value: string
  transcription?: V2Transcription
  tags: V2Tag[]
  isMarked: boolean
  pitch: V2Pitch[]
}

export interface V2Pitch {
  pitchNum: number
  diagram: V2PitchPair[]
  audio: string
}

export interface V2PitchPair {
  m: string // Mora
  s: number // State
  sl: boolean // Silent
  n: boolean // Nasal
  sp: boolean // Split
}

export interface V2Transcription {
  kana: string
  rus: string
}

export interface V2Meaning {
  tags: V2Tag[]
  senses: V2Sense[]
  note: V2Content[]
}

export interface V2Sense {
  content: V2Content[]
  lemmaContent: V2Content[]
  examples: V2Example[]
  intRefs: V2InternalReference[]
  extRefs: V2ExternalReference[]
  loanSources: V2LoanSource[]
  fieldTags: V2Tag[]
  dialectTags: V2Tag[]
  metaTags: V2Tag[]
  isRare: boolean
  subSenses: V2Sense[]
}

export interface V2Tag {
  eng: string
  engShort: string
  rus: string
  rusShort: string
  split?: string[]
}

export interface V2LoanSource {
  lang: string
  word: string
}

export interface V2InternalReference {
  value: string
  target: string
  referenceType: V2ReferenceType
}

export interface V2ExternalReference {
  value: string
  target: string
}

export interface V2Example {
  sentence: V2Content[]
  translation: V2Content[]
}

export interface V2Content {
  content?: V2Content[]
  value: string
  tag: string
}

export enum V2ReferenceType {
  Synonym = 0,
  PartialSynonym,
  Antonym,
  Confer,
  Abbreviation,
}
