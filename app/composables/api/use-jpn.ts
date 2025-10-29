import { useApiClient } from './client'

/**
 * Japanese Dictionary API client
 */
export function useJpnApi() {
  const client = useApiClient()
  const path = '/jp'

  return {
    client,
    path,
  }
}

/**
 * Japanese dictionary entries composable
 */
export function useJpnEntries() {
  const { client, path } = useJpnApi()

  const getEntry = (wid: EntryJp['wid'], options?: { watch?: any[] }) => {
    return useAsyncData(`entry-${wid}`, () => client.get<EntryJp>(`${path}/entries/${wid}`), options)
  }

  const getEntrySource = (wid: EntryJp['wid']) => {
    return useAsyncData(`entry-source-${wid}`, () =>
      client.get<EditorTxtEntryJp>(`${path}/entries/${wid}/txt`))
  }

  const getSatellites = (wid: string) => {
    return useAsyncData(`satellites-${wid}`, () =>
      client.get<EntryJpSatellite[]>(`${path}/entries/${wid}/satellites`))
  }

  const editEntry = async (wid: EntryJp['wid'], body: EditorTxtEntryJp) => {
    return await client.post(`${path}/entries/${wid}`, body)
  }

  const removeEntry = async (wid: EntryJp['wid'], body: EditorTxtEntryJp) => {
    return await client.delete(`${path}/entries/${wid}`, body)
  }

  const createEntry = async (body: EditorTxtEntryJp) => {
    return await client.post(`${path}/entries`, body)
  }

  const previewEntry = async (body: EditorTxtEntryJp) => {
    return await client.post<EditorEntryJp>(`${path}/txt-to-entry`, body)
  }

  const checkDuplicates = async (body: EditorTxtEntryJp) => {
    return await client.post<EntryJp[]>(`${path}/check-duplicates`, body)
  }

  const getLLMData = (wid: string) => {
    return useAsyncData(`llm-data-${wid}`, () =>
      client.get<LLMStoredResponse | null>(`${path}/entries/${wid}/llm`))
  }

  const sendLLMRequest = async (wid: string) => {
    return await client.post(`${path}/entries/${wid}/llm`)
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
    getLLMData,
    sendLLMRequest,
  }
}

/**
 * Tags management composable
 */
export function useJpnTags() {
  const { client, path } = useJpnApi()

  const getTags = (q: string) => {
    return useAsyncData(`tags-${q}`, () =>
      client.get<Record<string, Tag[]>>(`${path}/tags`, { q }))
  }

  const updateTag = async (id: number, body: Tag) => {
    return await client.put<Tag>(`${path}/tags/${id}`, body)
  }

  const createTag = async (body: Tag) => {
    return await client.post<Tag>(`${path}/tags`, body)
  }

  return {
    getTags,
    updateTag,
    createTag,
  }
}

/**
 * Downloads composable
 */
export function useJpnDownloads() {
  const { client, path } = useJpnApi()

  const getDownloads = () => {
    return useAsyncData('downloads', () =>
      client.get<Download[]>(`${path}/downloads`))
  }

  return {
    getDownloads,
  }
}
