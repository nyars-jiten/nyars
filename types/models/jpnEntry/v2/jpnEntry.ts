export interface EntryJpResponse {
  entry: EntryJp;
}

export interface EntryJp {
  wid: string;
  status: Status;
  external_entry: string;
  tags: Tag[];
  words: Word[];
  meanings: Meaning[];
}

export interface Status {
  is_reviewed: boolean;
  is_unconfirmed: boolean;
  is_archaic: boolean;
  is_dialect: boolean;
  is_proper: boolean;
}

export interface Word {
  writings: Writing[];
  readings: Reading[];
  furigana: FuriganaPair[][];
}

export interface FuriganaPair {
  word: string;
  kana: string;
}

export interface Writing {
  value: string;
  tags: Tag[];
}

export interface Reading {
  value: string;
  transcription?: Transcription;
  tags: Tag[];
}

export interface Transcription {
  kana: string;
  rus: string;
}

export interface Meaning {
  tags: Tag[];
  senses: Sense[];
  note: Content[];
}

export interface Sense {
  content: Content[];
  examples: Example[];
  int_refs: InternalReference[];
  ext_refs: ExternalReference[];
  loan_sources: LoanSource[];
  field_tags: Tag[];
  dialect_tags: Tag[];
  meta_tags: Tag[];
  is_rare: boolean;
  sub_senses: Sense[];
}

export interface Tag {
  eng: string;
  eng_short: string;
  ru: string;
  ru_short: string;
}

export interface LoanSource {
  lang: string;
  word: string;
}

export interface InternalReference {
  value: string;
  target: string;
  reference_type: ReferenceType;
}

export interface ExternalReference {
  value: string;
  target: string;
}

export interface Example {
  sentence: Content[];
  translation: Content[];
}

export interface Content {
  content?: Content[];
  value: string;
  tag: string;
}

export enum ReferenceType {
  Synonym = 0,
  PartialSynonym,
  Antonym,
  Confer,
  Abbreviation,
}
