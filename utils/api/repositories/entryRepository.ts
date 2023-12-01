import apiFetch from '../apiFetch'

abstract class EntryRepository {
  private static _path = '/dictionary/jap'
  private static _fetch = apiFetch
}

export default EntryRepository
