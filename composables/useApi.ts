import { useSearchRepository } from './api/repositories/searchRepository'

export const useApi = () => {
  abstract class Api {
    static readonly searchRepository = useSearchRepository()
  }

  return { Api }
}
