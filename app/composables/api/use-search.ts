import type { $Fetch, NitroFetchRequest } from 'nitropack'

function useSearchApi() {
  const { $apiFetch } = useNuxtApp()
  const path = '/search'

  return {
    fetch: $apiFetch as $Fetch<any, NitroFetchRequest>,
    path,
  }
}

// Search functionality
export function useSearch() {
  const { fetch, path } = useSearchApi()

  const getSuggestions = (input: string, number = 10) => {
    return useAsyncData(`suggestions-${input}-${number}`, () =>
      fetch<string[]>(`${path}/preview`, {
        params: {
          q: input,
          n: number,
        },
      }))
  }

  const search = (query: string, limit: number, offset: number) => {
    return useAsyncData(`search-${query}-${limit}-${offset}`, () =>
      fetch<JpnSearchResponse>('search', {
        method: 'POST',
        body: { query, limit, offset },
      }))
  }

  return {
    getSuggestions,
    search,
  }
}

// Search with reactive parameters
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

  const nextPage = () => {
    offset.value += limit.value
  }

  const prevPage = () => {
    offset.value = Math.max(0, offset.value - limit.value)
  }

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

