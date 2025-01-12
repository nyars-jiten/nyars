import type { $Fetch, NitroFetchRequest } from 'nitropack'
import type { CreateArticleJpn } from '~/types/models/articles/jpn'

export function editRepository<T>(fetch: $Fetch<T, NitroFetchRequest>) {
  const path = '/edits'

  const get = (id: string): Promise<EditResponse> => {
    return fetch<EditResponse>(`${path}/${id}`)
  }

  const getEdits = (number = 25, page = 0, statuses: string = ''): Promise<EditResponse[]> => {
    return fetch<EditResponse[]>(path, {
      params: {
        n: number,
        p: page,
        s: statuses,
      },
    })
  }

  const getEditTxt = (id: string): Promise<EditorTxtEntryJp> => {
    return fetch<EditorTxtEntryJp>(`${path}/${id}/txt`)
  }

  const updateEdit = (id: string, edit: CreateArticleJpn) => {
    return fetch<Edit>(`${path}/${id}`, {
      method: 'POST',
      body: edit,
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

  return { get, getEdits, getEditTxt, updateEdit, getEditsEntry, approveEdit, approveEditStatus, declineEdit }
}
