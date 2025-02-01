import { z } from 'zod'

export const ThemeSchema = z.enum(['light', 'dark'])

export const SettingsSchema = z.object({
  theme: ThemeSchema,
})

export type Theme = z.infer<typeof ThemeSchema>
export type Settings = z.infer<typeof SettingsSchema>
