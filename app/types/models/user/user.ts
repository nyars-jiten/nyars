import { z } from 'zod'

export const ShortUserSchema = z.object({
  id: z.string(),
  username: z.string(),
  // isBot: z.boolean(),
  avatar: z.string(),
})

export const UserSchema = ShortUserSchema.extend({
  login: z.string(),
  banned: z.boolean(),
  isAdmin: z.boolean(),
  createdAt: z.string(),
})

export const ExtendedUserSchema = UserSchema.extend({
  access: z.number(),
  settings: z.string(),
})

export type ShortUser = z.infer<typeof ShortUserSchema>
export type User = z.infer<typeof UserSchema>
export type ExtendedUser = z.infer<typeof ExtendedUserSchema>
