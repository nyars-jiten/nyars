import type { $Fetch, NitroFetchRequest } from 'nitropack'

function useJpnApi() {
  const { $apiFetch } = useNuxtApp()
  const path = '/jp'

  return {
    fetch: $apiFetch as $Fetch<any, NitroFetchRequest>,
    path,
  }
}

// Japanese dictionary entries
export function useJpnEntries() {
  const { fetch, path } = useJpnApi()

  const getEntry = (wid: EntryJp['wid'], options?: { watch?: any[] }) => {
    return useAsyncData(`entry-${wid}`, () => fetch<EntryJp>(`${path}/entries/${wid}`), options)
  }

  const getEntrySource = (wid: EntryJp['wid']) => {
    return useAsyncData(`entry-source-${wid}`, () =>
      fetch<EditorTxtEntryJp>(`${path}/entries/${wid}/txt`))
  }

  const getSatellites = (wid: string) => {
    return useAsyncData(`satellites-${wid}`, () =>
      fetch<EntryJpSatellite[]>(`${path}/entries/${wid}/satellites`))
  }

  const editEntry = async (wid: EntryJp['wid'], body: EditorTxtEntryJp) => {
    return await fetch<ApiError>(`${path}/entries/${wid}`, {
      method: 'POST',
      body,
    })
  }

  const removeEntry = async (wid: EntryJp['wid'], body: EditorTxtEntryJp) => {
    return await fetch<ApiError>(`${path}/entries/${wid}`, {
      method: 'DELETE',
      body,
    })
  }

  const createEntry = async (body: EditorTxtEntryJp) => {
    return await fetch<ApiError>(`${path}/entries`, {
      method: 'POST',
      body,
    })
  }

  const previewEntry = async (body: EditorTxtEntryJp) => {
    return await fetch<EditorEntryJp>(`${path}/txt-to-entry`, {
      method: 'POST',
      body,
    })
  }

  const checkDuplicates = async (body: EditorTxtEntryJp) => {
    return await fetch<EntryJp[]>(`${path}/check-duplicates`, {
      method: 'POST',
      body,
    })
  }

  return {
    getEntry,
    getEntrySource,
    getSatellites,
    editEntry,
    removeEntry,
    createEntry,
    previewEntry,
    checkDuplicates,
  }
}

// Tags management
export function useJpnTags() {
  const { fetch, path } = useJpnApi()

  const getTags = (q: string) => {
    return useAsyncData(`tags-${q}`, () =>
      fetch<Record<string, Tag[]>>(`${path}/tags`, {
        method: 'GET',
        query: { q },
      }))
  }

  const updateTag = async (id: number, body: Tag) => {
    return await fetch<Tag>(`${path}/tags/${id}`, {
      method: 'POST',
      body,
    })
  }

  const createTag = async (body: Tag) => {
    return await fetch<Tag>(`${path}/tags`, {
      method: 'POST',
      body,
    })
  }

  return {
    getTags,
    updateTag,
    createTag,
  }
}

// Downloads
export function useJpnDownloads() {
  const { fetch, path } = useJpnApi()

  const getDownloads = () => {
    return useAsyncData('downloads', () =>
      fetch<Download[]>(`${path}/downloads`))
  }

  return {
    getDownloads,
  }
}
