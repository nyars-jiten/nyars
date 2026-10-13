import { useApiClient } from './client'

/**
 * Search API client
 */
export function useSearchApi() {
  const client = useApiClient()
  const path = '/search'

  return {
    client,
    path,
  }
}

/**
 * Search functionality composable
 */
export function useSearch() {
  const { client, path } = useSearchApi()

  /**
   * Get search suggestions
   * @param input - Search input
   * @param number - Number of suggestions (default: 10)
   */
  const getSuggestions = async (input: string, number = 10) => {
    return await client.get<string[]>(`${path}/preview`, { q: input, n: number })
  }

  /**
   * Perform a search (filters, cursor pagination, tokens, other dictionaries)
   */
  const search = async (body: SearchRequest, signal?: AbortSignal) => {
    return await client.post<JpnSearchResponse>(path, body, undefined, signal)
  }

  /**
   * 25 random entries for the query and filters
   */
  const random = async (body: RandomRequest, signal?: AbortSignal) => {
    return await client.post<RandomResponse>(`${path}/random`, body, undefined, signal)
  }

  return {
    getSuggestions,
    search,
    random,
  }
}

/**
 * Tags for the search filter. GET /jp/tags returns a map by category (Pos, Fld, Dial, ...);
 * it is flattened here. A flat list (swagger GET /tags) is accepted too.
 */
export function useSearchTags() {
  const { client } = useSearchApi()

  return useAsyncData('search-tags', async () => {
    const raw = await client.get<Tag[] | Record<string, Tag[]>>('/jp/tags')
    const list = Array.isArray(raw)
      ? raw
      : Object.entries(raw ?? {}).flatMap(([category, tags]) => tags.map(tag => ({ ...tag, category: (tag as SearchTag).category ?? category })))
    return list.filter(tag => typeof tag.id === 'number') as SearchTag[]
  }, { server: false, default: () => [] as SearchTag[] })
}
