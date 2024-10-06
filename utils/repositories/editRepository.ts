import type { $Fetch, NitroFetchRequest } from 'nitropack'

export function editRepository<T>(fetch: $Fetch<T, NitroFetchRequest>) {
  const path = '/edits'

  const getEdits = (number = 25, page = 0, statuses: number | null = null): Promise<EditResponse[]> => {
    return fetch<EditResponse[]>(path, {
      params: {
        n: number,
        p: page,
        statuses,
      },
    })
  }

  // TODO change type to DictionaryType
  const getEditsEntry = (entryId: string, dictionary: number, page = 0, count = 25) => {
    return fetch<Edit[]>(`${path}/by-entry/${dictionary}/${entryId}`, {
      params: {
        p: page,
        c: count,
      },
    })
  }

  return { getEdits, getEditsEntry }
}
