import { useApiFetch } from '../apiFetch'

export const useSearchRepository = () => {
  const path = '/Search'
  const fetch = useApiFetch()

  const getSuggestions = (input: string, number = 10): Promise<string[]> => {
    return fetch<string[]>(`${path}/preview`, {
      params: {
        r: input,
        n: number
      }
    })
  }

  const getJpnEntries = (input: string, number = 20, page = 0): Promise<JpnEntriesSearchResult> => {
    return fetch<JpnEntriesSearchResult>(`${path}/jap`, {
      params: {
        r: input,
        n: number,
        p: page,
        exact: false,
        hasParser: true
      }
    })
  }

  return { getSuggestions, getJpnEntries }
}
