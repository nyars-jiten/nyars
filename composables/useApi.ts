import { useSearchRepository } from './api/repositories/searchRepository'
import { useJpnEntryRepository } from './api/repositories/jpnEntryRepository'
import { useEditRepository } from './api/repositories/editRepository'
import { useKotobaRepository } from './api/repositories/kotobaRepository'
import { useSatelliteRepository } from './api/repositories/satelliteRepository'
import { useUserRepository } from './api/repositories/userRepository'

export const useApi = () => {
  const searchRepository = useSearchRepository()
  const jpnEntryRepository = useJpnEntryRepository()
  const editRepository = useEditRepository()
  const kotobaRepository = useKotobaRepository()
  const satelliteRepository = useSatelliteRepository()
  const userRepository = useUserRepository()

  return {
    searchRepository,
    jpnEntryRepository,
    editRepository,
    kotobaRepository,
    satelliteRepository,
    userRepository
  }
}
