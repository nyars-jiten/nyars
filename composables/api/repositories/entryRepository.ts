import { useApiFetch } from '../apiFetch'

export const useEntryRepository = () => {
  abstract class EntryRepository {
    private static _path = '/dictionary/jap'
    private static _fetch = useApiFetch()
  }

  return EntryRepository
}
