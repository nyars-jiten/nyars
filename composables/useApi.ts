import { useSearchRepository } from './api/repositories/searchRepository'
import { useJpnEntryRepository } from './api/repositories/jpnEntryRepository'
import { useEditRepository } from './api/repositories/editRepository'

export const useApi = () => {
  const searchRepository = useSearchRepository()
  const jpnEntryRepository = useJpnEntryRepository()
  const editRepository = useEditRepository()

  return { searchRepository, jpnEntryRepository, editRepository }
}
