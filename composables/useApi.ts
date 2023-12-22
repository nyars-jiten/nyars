import { useSearchRepository } from './api/repositories/searchRepository'

export const useApi = () => {
  const searchRepository = useSearchRepository()

  return { searchRepository }
}
