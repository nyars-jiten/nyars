import type { $Fetch, NitroFetchRequest } from 'nitropack'

export const kotobaRepository = <T>(fetch: $Fetch<T, NitroFetchRequest>) => {
  const path = '/Kotoba'

  // TODO change type to DictionaryType
  const getImages = (entryId: string, dictionary: number): Promise<Image[]> => {
    return fetch<Image[]>(`${path}/entry-images`, {
      params: {
        id: entryId,
        dict: dictionary
      }
    })
  }

  return { getImages }
}
