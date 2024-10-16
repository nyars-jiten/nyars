import { array, string, type, type TypeOf } from 'io-ts'

export const CreateArticleJpn = type({
  body: string,
  reading: string,
  writing: string,
})

const CreateArticleJpnList = array(CreateArticleJpn)

export type CreateArticleJpn = TypeOf<typeof CreateArticleJpn>
export type CreateArticleJpnList = TypeOf<typeof CreateArticleJpnList>

export interface V2EntryJpResponse {
  entry: V2EntryJp
}

export interface JpnSearchResponse {
  result: V2EntryJp[]
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
}

export interface Furigana {
  pairs: V2FuriganaPair[]
  tags: V2Tag[]
  isMarked: boolean
}

export interface V2Status {
  isReviewed: boolean
  isUnconfirmed: boolean
  isArchaic: boolean
  isDialect: boolean
  isProper: boolean
}

export interface V2Word {
  writings: V2Writing[]
  readings: V2Reading[]
}

export interface V2FuriganaPair {
  word: string
  kana: string
}

export interface V2Writing {
  value: string
  tags: V2Tag[]
  isMarked: boolean
}

export interface V2Reading {
  value: string
  transcription?: V2Transcription
  tags: V2Tag[]
  isMarked: boolean
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
  ru: string
  ruShort: string
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
