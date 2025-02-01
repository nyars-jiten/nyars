import { z } from 'zod'

export const AuthErrorSchema = z.object({
  code: z.number(),
  text: z.string(),
  time: z.string().time(),
})

export type AuthError = z.infer<typeof AuthErrorSchema>
