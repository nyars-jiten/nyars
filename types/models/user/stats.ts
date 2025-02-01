import { z } from 'zod'

export const StatsUserSchema = z.object({
  jpnNew: z.number(),
  jpnEdit: z.number(),
  kanjiNew: z.number(),
  kanjiEdit: z.number(),
  rusNew: z.number(),
  rusEdit: z.number(),
  autoNew: z.number(),
  autoEdit: z.number(),
  reviews: z.number(),
  rating: z.number(),
  edits: z.number(),
})

export const StatsSiteSchema = z.object({
  jpn: z.number(),
  jpnRev: z.number(),
  kanji: z.number(),
  kanjiRev: z.number(),
  rus: z.number(),
  rusRev: z.number(),
  jpnPrev: z.number(),
  jpnRevPrev: z.number(),
  kanjiPrev: z.number(),
  kanjiRevPrev: z.number(),
  rusPrev: z.number(),
  rusRevPrev: z.number(),
})

export const WeeklyUserStatsSchema = z.object({
  stats: StatsUserSchema,
  user: ShortUserSchema,
})

export const WeeklyStatsSchema = z.object({
  stats: z.array(WeeklyUserStatsSchema),
  site: StatsSiteSchema,
})

export type StatsUser = z.infer<typeof StatsUserSchema>
export type StatsSite = z.infer<typeof StatsSiteSchema>
export type WeeklyUserStats = z.infer<typeof WeeklyUserStatsSchema>
export type WeeklyStats = z.infer<typeof WeeklyStatsSchema>
