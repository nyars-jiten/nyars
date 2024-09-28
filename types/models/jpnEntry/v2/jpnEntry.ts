export interface V2EntryJpResponse {
  entry: V2EntryJp
}

export interface V2EntryJp {
  wid: string
  status: V2Status
  external_entry: string
  tags: V2Tag[]
  words: V2Word[]
  meanings: V2Meaning[]
}

export interface V2Status {
  is_reviewed: boolean
  is_unconfirmed: boolean
  is_archaic: boolean
  is_dialect: boolean
  is_proper: boolean
}

export interface V2Word {
  writings: V2Writing[]
  readings: V2Reading[]
  furigana: V2FuriganaPair[][]
}

export interface V2FuriganaPair {
  word: string
  kana: string
}

export interface V2Writing {
  value: string
  tags: V2Tag[]
}

export interface V2Reading {
  value: string
  transcription?: V2Transcription
  tags: V2Tag[]
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
  int_refs: V2InternalReference[]
  ext_refs: V2ExternalReference[]
  loan_sources: V2LoanSource[]
  field_tags: V2Tag[]
  dialect_tags: V2Tag[]
  meta_tags: V2Tag[]
  is_rare: boolean
  sub_senses: V2Sense[]
}

export interface V2Tag {
  eng: string
  eng_short: string
  ru: string
  ru_short: string
}

export interface V2LoanSource {
  lang: string
  word: string
}

export interface V2InternalReference {
  value: string
  target: string
  reference_type: V2ReferenceType
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
  Abbreviation
}
