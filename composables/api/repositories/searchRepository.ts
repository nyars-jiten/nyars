import { useApiFetch } from '../apiFetch'

export const useSearchRepository = () => {
  abstract class SearchRepository {
    private static _path = '/Search'
    private static _fetch = useApiFetch()

    static getSuggestions(input: string, number = 10): Promise<string[]> {
      return this._fetch<string[]>(`${this._path}/preview`, {
        params: {
          r: input,
          n: number
        }
      })
    }

    static getJpnEntries(input: string, number = 20, page = 0): Promise<JpnEntriesSearchResult> {
      return this._fetch<JpnEntriesSearchResult>(`${this._path}/jap`, {
        params: {
          r: input,
          n: number,
          p: page,
          exact: false,
          hasParser: true
        }
      })
    }
  }

  return SearchRepository
}
