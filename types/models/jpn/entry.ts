import { z } from 'zod'

export enum ReferenceType {
  Synonym,
  PartialSynonym,
  Antonym,
  Confer,
  Abbreviation,
}

export const ReferenceTypeSchema = z.nativeEnum(ReferenceType)

export const EntryStatusSchema = z.object({
  isUnreviewed: z.boolean(),
  isUnconfirmed: z.boolean(),
  isArchaic: z.boolean(),
  isDialect: z.boolean(),
  isProper: z.boolean(),
  isDeleted: z.boolean(),
})

export const TagSchema = z.object({
  eng: z.string(),
  engShort: z.string(),
  rus: z.string(),
  rusShort: z.string(),
})

export const TranscriptionSchema = z.object({
  kana: z.string(),
  rus: z.string(),
})

export const PitchPairSchema = z.object({
  m: z.string(), // Mora
  s: z.number(), // State
  sl: z.boolean(), // Silent
  n: z.boolean(), // Nasal
  sp: z.boolean(), // Split
})

export const SpellingSchema = z.object({
  value: z.string(),
  tags: z.array(TagSchema),
  isMarked: z.boolean(),
})

export const FuriganaPairSchema = z.object({
  word: z.string(),
  kana: z.string(),
})

export const FuriganaSchema = z.object({
  pairs: z.array(FuriganaPairSchema),
  transcription: TranscriptionSchema,
  tags: z.array(TagSchema),
  isMarked: z.boolean(),
  freq: z.number(),
})

export const PitchSchema = z.object({
  pitchNum: z.number(),
  diagram: z.array(PitchPairSchema),
  audio: z.string(),
})

export const ReadingSchema = z.object({
  value: z.string(),
  transcription: z.nullable(TranscriptionSchema),
  tags: z.array(TagSchema),
  isMarked: z.boolean(),
  pitch: z.array(PitchSchema),
})

export const WordSchema = z.object({
  spellings: z.array(SpellingSchema),
  readings: z.array(ReadingSchema),
})

//

const BaseContentSchema = z.object({
  v: z.string(),
  t: z.string(),
})

type BaseContent = z.infer<typeof BaseContentSchema>

export type Content = BaseContent & { c: Content[] }

export const ContentSchema: z.ZodType<Content> = BaseContentSchema.extend({
  c: z.lazy(() => ContentSchema.array()),
})

//

export const LoanSourceSchema = z.object({
  lang: z.string(),
  word: z.string(),
})

export const InternalReferenceSchema = z.object({
  value: z.string(),
  target: z.string(),
  referenceType: ReferenceTypeSchema,
  preview: z.array(ContentSchema),
})

export const ExternalReferenceSchema = z.object({
  value: z.string(),
  target: z.string(),
})

export const ExampleSchema = z.object({
  sentence: z.array(ContentSchema),
  translation: z.array(ContentSchema),
})

//

const BaseSenseSchema = z.object({
  ix: z.string(),
  content: z.array(ContentSchema),
  lemmaContent: z.array(ContentSchema),
  examples: z.array(ExampleSchema),
  intRefs: z.array(InternalReferenceSchema),
  extRefs: z.array(ExternalReferenceSchema),
  loanSources: z.array(LoanSourceSchema),
  fieldTags: z.array(TagSchema),
  dialectTags: z.array(TagSchema),
  metaTags: z.array(TagSchema),
  isRare: z.boolean(),
})

type BaseSense = z.infer<typeof BaseSenseSchema>

export type Sense = BaseSense & { subSenses: Sense[] }

export const SenseSchema: z.ZodType<Sense> = BaseSenseSchema.extend({
  subSenses: z.lazy(() => SenseSchema.array()),
})

//

export const MeaningSchema = z.object({
  tags: z.array(TagSchema),
  senses: z.array(SenseSchema),
  note: z.array(ContentSchema),
})

export const EntryJpSchema = z.object({
  wid: z.string(),
  status: EntryStatusSchema,
  externalEntry: z.string(),
  title: z.string(),
  tags: z.array(TagSchema),
  words: z.array(WordSchema),
  meanings: z.array(MeaningSchema),
  furigana: z.array(FuriganaSchema),
  frequency: z.number(),
  preferFurigana: z.boolean(),
  hideRare: z.boolean(),
})

export const EntryJpResponseSchema = z.object({
  entry: EntryJpSchema,
})

export type EntryStatus = z.infer<typeof EntryStatusSchema>
export type Tag = z.infer<typeof TagSchema>
export type Transcription = z.infer<typeof TranscriptionSchema>
export type PitchPair = z.infer<typeof PitchPairSchema>
export type Spelling = z.infer<typeof SpellingSchema>
export type FuriganaPair = z.infer<typeof FuriganaPairSchema>
export type Furigana = z.infer<typeof FuriganaSchema>
export type Pitch = z.infer<typeof PitchSchema>
export type Reading = z.infer<typeof ReadingSchema>
export type Word = z.infer<typeof WordSchema>
export type LoanSource = z.infer<typeof LoanSourceSchema>
export type InternalReference = z.infer<typeof InternalReferenceSchema>
export type ExternalReference = z.infer<typeof ExternalReferenceSchema>
export type Example = z.infer<typeof ExampleSchema>
export type Meaning = z.infer<typeof MeaningSchema>
export type EntryJp = z.infer<typeof EntryJpSchema>
export type EntryJpResponse = z.infer<typeof EntryJpResponseSchema>
