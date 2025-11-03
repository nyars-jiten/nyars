import { useApiClient } from './client'

/**
 * Edits API client
 */
export function useEditsApi() {
  const client = useApiClient()
  const path = '/edits'

  return {
    client,
    path,
  }
}

/**
 * Edits data management composable
 */
export function useEditsData() {
  const { client, path } = useEditsApi()

  const getEdit = (id: string) => {
    return useAsyncData(`edit-${id}`, () =>
      client.get<EditResponse>(`${path}/${id}`))
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
    username?: string
  }, options?: { watch?: any[] }) => {
    const cacheKey = params
      ? `edits-${Object.entries(params).map(([k, v]) => `${k}-${v}`).join('-')}`
      : 'edits'

    return useAsyncData(cacheKey, () =>
      client.get<EditResponse[]>(path, params), options)
  }

  const getEditsByWid = (wid: string) => {
    return useAsyncData(`edits-wid-${wid}`, () =>
      client.get<EditResponse[]>(path, { wid }))
  }

  const getEditsByEntry = (entryId: string, dictionary: number, page = 0, count = 25) => {
    return useAsyncData(`edits-entry-${dictionary}-${entryId}-${page}-${count}`, () =>
      client.get<EditResponse[]>(`${path}/by-entry/${dictionary}/${entryId}`, {
        p: page,
        c: count,
      }))
  }

  const getEditTxt = (id: string) => {
    return useAsyncData(`edit-txt-${id}`, () =>
      client.get<EditorTxtEntryJp>(`${path}/${id}/txt`))
  }

  return {
    getEdit,
    getEdits,
    getEditsByWid,
    getEditsByEntry,
    getEditTxt,
  }
}

/**
 * Edit actions composable
 */
export function useEditActions() {
  const { client, path } = useEditsApi()

  const updateEdit = async (id: string, edit: EditorTxtEntryJp) => {
    return await client.post<EditResponse>(`${path}/${id}`, edit)
  }

  const approveEditAsUnreviewed = async (editId: string) => {
    return await client.post<EditResponse>(`${path}/${editId}/approve`, null, { isUnreviewed: true })
  }

  const approveEditAsReviewed = async (editId: string) => {
    return await client.post<EditResponse>(`${path}/${editId}/approve`, null, { isUnreviewed: false })
  }

  const declineEdit = async (editId: string) => {
    return await client.post<EditResponse>(`${path}/${editId}/decline`)
  }

  return {
    updateEdit,
    approveEditAsUnreviewed,
    approveEditAsReviewed,
    declineEdit,
  }
}
