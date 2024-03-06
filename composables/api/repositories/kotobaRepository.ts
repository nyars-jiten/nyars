import { useApiFetch } from '../apiFetch'

export const useKotobaRepository = () => {
  const path = '/Kotoba'
  const fetch = useApiFetch()

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
