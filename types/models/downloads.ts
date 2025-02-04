import { z } from 'zod'

export const DownloadSchema = z.object({
  id: z.string(),
  type: z.string(),
  date: z.number(),
  count: z.number(),
  size: z.number(),
  filepath: z.string(),
  createdAt: z.string(),
})

export type Download = z.infer<typeof DownloadSchema>
