import type { $Fetch, NitroFetchRequest } from 'nitropack'

export const editRepository = <T>(fetch: $Fetch<T, NitroFetchRequest>) => {
  const path = '/Edits'

  const getEdits = (number = 25, page = 0, statuses: number | null = null): Promise<Edit[]> => {
    return fetch<Edit[]>(path, {
      params: {
        n: number,
        p: page,
        statuses
      }
    })
  }

  const getCompare = (editId: number): Promise<EditCompare> => {
    return fetch<EditCompare>(`${path}/${editId}/compare`)
  }

  // TODO change type to DictionaryType
  const getEditsEntry = (entryId: string, dictionary: number, page = 0, count = 25) => {
    return fetch<Edit[]>(`${path}/by-entry/${dictionary}/${entryId}`, {
      params: {
        p: page,
        c: count
      }
    })
  }

  return { getEdits, getCompare, getEditsEntry }
}
