import type { $Fetch, NitroFetchRequest } from 'nitropack'

export function useEditRepo() {
  return useApi(<T>(fetch: $Fetch<T, NitroFetchRequest>) => {
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

    const getEditsByWid = (wid: string): Promise<EditResponse[]> => {
      return fetch<EditResponse[]>(path, {
        params: { wid },
      })
    }

    const getEditTxt = (id: string): Promise<EditorTxtEntryJp> => {
      return fetch<EditorTxtEntryJp>(`${path}/${id}/txt`)
    }

    const updateEdit = (id: string, edit: EditorTxtEntryJp) => {
      return fetch<EditResponse>(`${path}/${id}`, {
        method: 'POST',
        body: edit,
      })
    }

    // TODO change type to DictionaryType
    const getEditsEntry = (entryId: string, dictionary: number, page = 0, count = 25) => {
      return fetch<EditResponse[]>(`${path}/by-entry/${dictionary}/${entryId}`, {
        params: {
          p: page,
          c: count,
        },
      })
    }

    const approveEditAsUnreviewed = (editId: string) => {
      return fetch<EditResponse>(`${path}/${editId}/approve`, {
        method: 'POST',
        params: {
          isUnreviewed: true,
        },
      })
    }

    const approveEditAsReviewed = (editId: string) => {
      return fetch<EditResponse>(`${path}/${editId}/approve`, {
        method: 'POST',
        params: {
          isUnreviewed: false,
        },
      })
    }

    const declineEdit = (editId: string) => {
      return fetch<EditResponse>(`${path}/${editId}/decline`, {
        method: 'POST',
      })
    }

    return { get, getEdits, getEditsByWid, getEditTxt, updateEdit, getEditsEntry, approveEditAsUnreviewed, approveEditAsReviewed, declineEdit }
  })
}
