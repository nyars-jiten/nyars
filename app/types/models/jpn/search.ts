import { z } from 'zod'

export const SearchRequestSchema = z.object({
  query: z.string(),
})

export const SearchResponseSchema = z.object({
  result: z.array(EntryJpSchema),
})

export const JpnSearchResponseSchema = z.object({
  result: z.array(EntryJpSchema),
  request: z.array(z.string()),
})

export type SearchRequest = z.infer<typeof SearchRequestSchema>
export type SearchResponse = z.infer<typeof SearchResponseSchema>
export type JpnSearchResponse = z.infer<typeof JpnSearchResponseSchema>
