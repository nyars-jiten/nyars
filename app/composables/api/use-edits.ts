import type { $Fetch, NitroFetchRequest } from 'nitropack'

function useEditsApi() {
  const { $apiFetch } = useNuxtApp()
  const path = '/edits'

  return {
    fetch: $apiFetch as $Fetch<any, NitroFetchRequest>,
    path,
  }
}

// Edits data management
export function useEditsData() {
  const { fetch, path } = useEditsApi()

  const getEdit = (id: string) => {
    return useAsyncData(`edit-${id}`, () =>
      fetch<EditResponse>(`${path}/${id}`))
  }

  const getEdits = (number = 25, page = 0, statuses: string = '') => {
    return useAsyncData(`edits-${number}-${page}-${statuses}`, () =>
      fetch<EditResponse[]>(path, {
        params: {
          n: number,
          p: page,
          s: statuses,
        },
      }))
  }

  const getEditsByWid = (wid: string) => {
    return useAsyncData(`edits-wid-${wid}`, () =>
      fetch<EditResponse[]>(path, {
        params: { wid },
      }))
  }

  const getEditsByEntry = (entryId: string, dictionary: number, page = 0, count = 25) => {
    return useAsyncData(`edits-entry-${dictionary}-${entryId}-${page}-${count}`, () =>
      fetch<EditResponse[]>(`${path}/by-entry/${dictionary}/${entryId}`, {
        params: {
          p: page,
          c: count,
        },
      }))
  }

  const getEditTxt = (id: string) => {
    return useAsyncData(`edit-txt-${id}`, () =>
      fetch<EditorTxtEntryJp>(`${path}/${id}/txt`))
  }

  return {
    getEdit,
    getEdits,
    getEditsByWid,
    getEditsByEntry,
    getEditTxt,
  }
}

// Edit actions
export function useEditActions() {
  const { fetch, path } = useEditsApi()

  const updateEdit = async (id: string, edit: EditorTxtEntryJp) => {
    return await fetch<EditResponse>(`${path}/${id}`, {
      method: 'POST',
      body: edit,
    })
  }

  const approveEditAsUnreviewed = async (editId: string) => {
    return await fetch<EditResponse>(`${path}/${editId}/approve`, {
      method: 'POST',
      params: {
        isUnreviewed: true,
      },
    })
  }

  const approveEditAsReviewed = async (editId: string) => {
    return await fetch<EditResponse>(`${path}/${editId}/approve`, {
      method: 'POST',
      params: {
        isUnreviewed: false,
      },
    })
  }

  const declineEdit = async (editId: string) => {
    return await fetch<EditResponse>(`${path}/${editId}/decline`, {
      method: 'POST',
    })
  }

  return {
    updateEdit,
    approveEditAsUnreviewed,
    approveEditAsReviewed,
    declineEdit,
  }
}

