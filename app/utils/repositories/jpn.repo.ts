export function useJpnRepo() {
  return useApi((fetch) => {
    const path = '/jp'

    const get = (wid: EntryJp['wid']) =>
      fetch<EntryJp /* | ApiError */>(`${path}/entries/${wid}`, { method: 'GET' })

    const edit = (wid: EntryJp['wid'], body: EditorTxtEntryJp) =>
      fetch<ApiError>(`${path}/entries/${wid}`, { method: 'POST', body })

    const remove = (wid: EntryJp['wid'], body: EditorTxtEntryJp) =>
      fetch<ApiError>(`${path}/entries/${wid}`, { method: 'DELETE', body })

    const source = (wid: EntryJp['wid']) =>
      fetch<EditorTxtEntryJp /* | ApiError */>(`${path}/entries/${wid}/txt`, { method: 'GET' })

    const preview = (body: EditorTxtEntryJp) =>
      fetch<EditorEntryJp /* | ApiError */>(`${path}/txt-to-entry`, { method: 'POST', body })

    const create = (body: EditorTxtEntryJp) =>
      fetch<ApiError>(`${path}/entries`, { method: 'POST', body })

    const tagList = (q: string) =>
      fetch<Record<string, Tag[]>>(`${path}/tags`, { method: 'GET', query: { q } })

    const checkDuplicates = (body: EditorTxtEntryJp) =>
      fetch<EntryJp[]>(`${path}/check-duplicates`, { method: 'POST', body })

    return { get, edit, remove, source, preview, create, tagList, checkDuplicates }
  })
}
