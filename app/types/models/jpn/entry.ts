export interface EntryJpResponse {
  entry: EntryJp
}

export interface EntryJp {
  wid: string
  status: EntryStatus
  externalEntry: string
  title: string
  tags: Tag[]
  words: Word[]
  meanings: Meaning[]
  furigana: Furigana[]
  frequency: number
  preferFurigana: boolean
  hideRare: boolean
}

export interface Furigana {
  pairs: FuriganaPair[]
  transcription: Transcription
  tags: Tag[]
  isMarked: boolean
  freq: number
}

export interface EntryStatus {
  isUnreviewed: boolean
  isUnconfirmed: boolean
  isArchaic: boolean
  isDialect: boolean
  isProper: boolean
  isDeleted: boolean
}

export interface Word {
  spellings: Spelling[]
  readings: Reading[]
}

export interface FuriganaPair {
  word: string
  kana: string
}

export interface Spelling {
  value: string
  tags: Tag[]
  isMarked: boolean
}

export interface Reading {
  value: string
  transcription?: Transcription
  tags: Tag[]
  isMarked: boolean
  pitch: Pitch[]
}

export interface Pitch {
  pitchNum: number
  diagram: PitchPair[]
  audio: string
}

export interface PitchPair {
  m: string // Mora
  s: number // State
  sl: boolean // Silent
  n: boolean // Nasal
  sp: boolean // Split
}

export interface Transcription {
  kana: string
  rus: string
}

export interface Meaning {
  tags: Tag[]
  senses: Sense[]
  note: Content[]
}

export interface Sense {
  ix: string
  content: Content[]
  lemmaContent: Content[]
  examples: Example[]
  intRefs: InternalReference[]
  extRefs: ExternalReference[]
  loanSources: LoanSource[]
  fieldTags: Tag[]
  dialectTags: Tag[]
  metaTags: Tag[]
  isRare: boolean
  subSenses: Sense[]
}

export interface Tag {
  id: number
  type: string
  priority: number
  eng: string
  engShort: string
  rus: string
  rusShort: string
}

export interface LoanSource {
  lang: string
  word: string
}

export interface InternalReference {
  value: string
  target: string
  referenceType: ReferenceType
  preview: Content[]
}

export interface ExternalReference {
  value: string
  target: string
}

export interface Example {
  sentence: Content[]
  translation: Content[]
}

export interface Content {
  c?: Content[] // content
  v: string // value
  t: string // tag
}

export enum ReferenceType {
  Synonym = 0,
  PartialSynonym,
  Antonym,
  Confer,
  Abbreviation,
}
