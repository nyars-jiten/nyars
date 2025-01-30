import type { $Fetch, NitroFetchRequest } from 'nitropack'

export function useSearchRepo() {
  return useApi(<T>(fetch: $Fetch<T, NitroFetchRequest>) => {
    const path = '/search'

    const getSuggestions = (input: string, number = 10): Promise<string[]> => {
      return fetch<string[]>(`${path}/preview`, {
        params: {
          q: input,
          n: number,
        },
      })
    }

    const search = (query: string, limit: number, offset: number) =>
      fetch<JpnSearchResponse>(`search`, { method: 'POST', body: { query, limit, offset } })

    return { getSuggestions, search }
  })
}
