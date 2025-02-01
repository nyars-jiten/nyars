import { z } from 'zod'

export const EditDiffSchema = z.object({
  c: z.string(),
  d: z.boolean(),
})

export type EditDiff = z.infer<typeof EditDiffSchema>
