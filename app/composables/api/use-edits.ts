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

  /**
   * Get edits with optional filters
   * @param params - Query parameters for filtering edits
   * @param params.n - Limit (number of results)
   * @param params.o - Offset (pagination)
   * @param params.s - Status filter (new, accepted, declined)
   * @param params.d - Dictionary filter
   * @param params.t - Edit type filter (create, edit, remove)
   * @param params.wid - Word ID filter
   * @param params.from - Start date filter (YYYY-MM-DD)
   * @param params.to - End date filter (YYYY-MM-DD)
   * @param params.userId - User ID filter (UUID)
   */
  const getEdits = (params?: {
    n?: number
    o?: number
    s?: string
    d?: string
    t?: string
    wid?: string
    from?: string
    to?: string
    userId?: string
  }) => {
    const cacheKey = params
      ? `edits-${Object.entries(params).map(([k, v]) => `${k}-${v}`).join('-')}`
      : 'edits'
    console.log(cacheKey)

    return useAsyncData(cacheKey, () =>
      fetch<EditResponse[]>(path, {
        params,
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
