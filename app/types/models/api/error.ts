import { z } from 'zod'

export const ApiErrorSchema = z.object({
  code: z.number(),
  message: z.string(),
})

export type ApiError = z.infer<typeof ApiErrorSchema>
