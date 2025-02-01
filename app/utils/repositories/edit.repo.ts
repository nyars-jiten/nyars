interface GetEditListRequest {
  number?: number
  page?: number
  statuses?: string
}

export function useEditRepo() {
  return useApi((fetch) => {
    const path = '/edits'

    const get = (id: string) => {
      const promise = fetch(`${path}/${id}`)

      return useAsyncData(() => toApiResponse({
        data: () => promise,
        schema: EditResponseSchema
      }), {
        deep: true
      });
    }

    const getEdits = ({ number = 25, page = 0, statuses = '' }: GetEditListRequest = {}) => {
      const params = { n: number, p: page, s: statuses }

      const promise = fetch(path, { params })

      return useAsyncData(() => toApiResponse({
        data: () => promise,
        schema: EditResponseSchemaList,
      }), {
        default: () => [],
      });
    }

    const getEditTxt = (id: string) => {
      const promise = fetch(`${path}/${id}/txt`)

      return useAsyncData(() => toApiResponse({
        data: () => promise,
        schema: EditorTxtEntryJpSchema,
      }), {
        deep: true
      });
    }

    const updateEdit = (id: string, edit: EditorTxtEntryJp) => {
      const promise = fetch(`${path}/${id}`, { method: 'POST', body: edit })

      return useAsyncData(() => toApiResponse({
        data: () => promise,
        schema: EditResponseSchema,
      }), {
        deep: true
      });
    }

    // TODO change type to DictionaryType
    const getEditsEntry = (entryId: string, dictionary: number, page = 0, count = 25) => {
      const params = { p: page, c: count }

      const promise = fetch(`${path}/by-entry/${dictionary}/${entryId}`, { params })

      return useAsyncData(() => toApiResponse({
        data: () => promise,
        schema: EditResponseSchemaList,
      }), {
        deep: true
      });
    }

    const approveEditAsUnreviewed = (editId: string) => {
      const params = { isUnreviewed: true }

      const promise = fetch(`${path}/${editId}/approve`, { method: 'POST', params })

      return useAsyncData(() => toApiResponse({
        data: () => promise,
        schema: EditResponseSchema,
      }), {
        deep: true
      });
    }

    const approveEditAsReviewed = (editId: string) => {
      const params = { isUnreviewed: false }

      const promise = fetch(`${path}/${editId}/approve`, { method: 'POST', params })

      return useAsyncData(() => toApiResponse({
        data: () => promise,
        schema: EditResponseSchema,
      }), {
        deep: true
      });
    }

    const declineEdit = (editId: string) => {
      return fetch(`${path}/${editId}/decline`, { method: 'POST' })
    }

    return { get, getEdits, getEditTxt, updateEdit, getEditsEntry, approveEditAsUnreviewed, approveEditAsReviewed, declineEdit }
  });
}
