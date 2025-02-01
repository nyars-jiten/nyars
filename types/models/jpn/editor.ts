import { z } from 'zod'

export const EditorTxtEntryJpSchema = z.object({
  reading: z.string(),
  spelling: z.string(),
  body: z.string(),
  status: EntryStatusSchema,
  comment: z.string(),
})

export const EditorEntryJpSchema = z.object({
  entry: EntryJpSchema,
  warnings: z.array(z.string()),
})

export type EditorTxtEntryJp = z.infer<typeof EditorTxtEntryJpSchema>
export type EditorEntryJp = z.infer<typeof EditorEntryJpSchema>
