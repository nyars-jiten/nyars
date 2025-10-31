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
   * Perform a search
   * @param query - Search query
   * @param limit - Limit number of results
   * @param offset - Offset for pagination
   */
  const search = async (query: string, limit: number, offset: number) => {
    return await client.post<JpnSearchResponse>('search', { query, limit, offset })
  }

  return {
    getSuggestions,
    search,
  }
}

/**
 * Reactive search composable
 * Provides reactive search state and pagination
 */
export function useReactiveSearch() {
  const query = ref('')
  const limit = ref(25)
  const offset = ref(0)

  const { search } = useSearch()

  const searchResults = computed(() => {
    if (!query.value.trim())
      return null
    return search(query.value, limit.value, offset.value)
  })

  /**
   * Navigate to next page
   */
  const nextPage = () => {
    offset.value += limit.value
  }

  /**
   * Navigate to previous page
   */
  const prevPage = () => {
    offset.value = Math.max(0, offset.value - limit.value)
  }

  /**
   * Reset search state
   */
  const resetSearch = () => {
    query.value = ''
    offset.value = 0
  }

  return {
    query,
    limit,
    offset,
    searchResults,
    nextPage,
    prevPage,
    resetSearch,
  }
}
