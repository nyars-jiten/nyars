import type { $Fetch, NitroFetchRequest } from 'nitropack'
import { EditResponseSchemaList } from '~/types/models/edit/edit'

interface GetEditListRequest {
  number?: number
  page?: number
  statuses?: string
}

export function useEditRepo() {
  return useApi(<T>(fetch: $Fetch<T, NitroFetchRequest>) => {
    const path = '/edits'

    const get = (id: string) => useAsyncData(() =>
      toApiResponse({
        data: () => fetch(`${path}/${id}`),
        schema: EditResponseSchema,
      }))

    const getEdits = ({ number = 25, page = 0, statuses = '' }: GetEditListRequest = {}) => useAsyncData(() =>
      toApiResponse({
        data: () => fetch(path, { params: { n: number, p: page, s: statuses } }),
        schema: EditResponseSchemaList,
      }), {
      default: () => [],
    })

    const getEditTxt = (id: string) => useAsyncData(() =>
      toApiResponse({
        data: () => fetch(`${path}/${id}/txt`),
        schema: EditorTxtEntryJpSchema,
      }))

    const updateEdit = (id: string, edit: EditorTxtEntryJp) => useAsyncData(() =>
      toApiResponse({
        data: () => fetch(`${path}/${id}`, { method: 'POST', body: edit }),
        schema: EditResponseSchema,
      }))

    // TODO change type to DictionaryType
    const getEditsEntry = (entryId: string, dictionary: number, page = 0, count = 25) => {
      const params = { p: page, c: count }

      return useAsyncData(() =>
        toApiResponse({
          data: () => fetch(`${path}/by-entry/${dictionary}/${entryId}`, { params }),
          schema: EditResponseSchemaList,
        }))
    }

    const approveEditAsUnreviewed = (editId: string) => {
      const params = { isUnreviewed: true }

      return useAsyncData(() =>
        toApiResponse({
          data: () => fetch(`${path}/${editId}/approve`, { method: 'POST', params }),
          schema: EditResponseSchema,
        }))
    }

    const approveEditAsReviewed = (editId: string) => {
      const params = { isUnreviewed: false }

      return useAsyncData(() =>
        toApiResponse({
          data: () => fetch(`${path}/${editId}/approve`, { method: 'POST', params }),
          schema: EditResponseSchema,
        }))
    }

    const declineEdit = (editId: string) => {
      return fetch(`${path}/${editId}/decline`, { method: 'POST' })
    }

    return { get, getEdits, getEditTxt, updateEdit, getEditsEntry, approveEditAsUnreviewed, approveEditAsReviewed, declineEdit }
  })
}
