import { z } from 'zod'

export const EditResponseSchema = z.object({
  id: z.string(),
  wid: z.string(),
  dictionary: z.nativeEnum(DictionaryType),
  type: z.nativeEnum(EditType),
  status: z.nativeEnum(EditStatus),
  author: ShortUserSchema.nullable(),
  approver: ShortUserSchema.nullable(),
  comment: z.string(),
  title: z.string(),
  entryStatus: EntryStatusSchema.optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  diffSrc: EditDiffSchema.array(),
  diffDst: EditDiffSchema.array(),
  diffRawSrc: EditDiffSchema.array().nullable(),
  diffRawDst: EditDiffSchema.array().nullable(),
})

export const EditResponseSchemaList = z.array(EditResponseSchema)

export type EditResponse = z.infer<typeof EditResponseSchema>
export type EditResponseList = z.infer<typeof EditResponseSchemaList>
