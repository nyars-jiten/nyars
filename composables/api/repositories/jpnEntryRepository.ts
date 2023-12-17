import { useApiFetch } from '../apiFetch'

export const useJpnEntryRepository = () => {
  abstract class JpnEntryRepository {
    private static _path = '/dictionary/jap'
    private static _fetch = useApiFetch()
  }

  return JpnEntryRepository
}
