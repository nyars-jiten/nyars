import type { $Fetch, NitroFetchRequest } from 'nitropack'

export function editRepository<T>(fetch: $Fetch<T, NitroFetchRequest>) {
  const path = '/edits'

  const getEdits = (number = 25, page = 0, statuses: string = ''): Promise<EditResponse[]> => {
    return fetch<EditResponse[]>(path, {
      params: {
        n: number,
        p: page,
        s: statuses,
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

  const approveEdit = (editId: string) => {
    return fetch<Edit>(`${path}/${editId}/approve`, {
      method: 'POST',
    })
  }

  const approveEditStatus = (editId: string) => {
    return fetch<Edit>(`${path}/${editId}/approve`, {
      method: 'POST',
      params: {
        status: false,
      },
    })
  }

  const declineEdit = (editId: string) => {
    return fetch<Edit>(`${path}/${editId}/decline`, {
      method: 'POST',
    })
  }

  return { getEdits, getEditsEntry, approveEdit, approveEditStatus, declineEdit }
}
