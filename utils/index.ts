import SearchRepository from './api/repositories/searchRepository'

abstract class Api {
  static readonly searchRepository = SearchRepository
}

export { Api }
