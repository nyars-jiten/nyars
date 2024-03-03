import { useSearchRepository } from './api/repositories/searchRepository'
import { useJpnEntryRepository } from './api/repositories/jpnEntryRepository'
import { useEditRepository } from './api/repositories/editRepository'
import { useKotobaRepository } from './api/repositories/kotobaRepository'
import { useSatelliteRepository } from './api/repositories/satelliteRepository'

export const useApi = () => {
  const searchRepository = useSearchRepository()
  const jpnEntryRepository = useJpnEntryRepository()
  const editRepository = useEditRepository()
  const kotobaRepository = useKotobaRepository()
  const satelliteRepository = useSatelliteRepository()

  return {
    searchRepository,
    jpnEntryRepository,
    editRepository,
    kotobaRepository,
    satelliteRepository
  }
}
