import { useSearchRepository } from './api/repositories/searchRepository'
import { useJpnEntryRepository } from './api/repositories/jpnEntryRepository'

export const useApi = () => {
  const searchRepository = useSearchRepository()
  const jpnEntryRepository = useJpnEntryRepository()

  return { searchRepository, jpnEntryRepository }
}
