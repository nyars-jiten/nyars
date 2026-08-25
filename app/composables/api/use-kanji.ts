import { useApiClient } from './client'

/**
 * Kanji API client
 */
export function useKanjiApi() {
  const client = useApiClient()
  const path = '/kanji'

  return {
    client,
    path,
  }
}

/**
 * Kanji components composable
 */
export function useKanji() {
  const { client, path } = useKanjiApi()

  const getComponents = (params?: { min_strokes?: number, max_strokes?: number }) => {
    return useAsyncData('kanji-components', () =>
      client.get<KanjiComponent[]>(`${path}/components`, params))
  }

  const searchByComponents = async (components: string[], limit?: number) => {
    return await client.post<KanjiSearchResponse>(`${path}/search`, { components, limit })
  }

  return {
    getComponents,
    searchByComponents,
  }
}
