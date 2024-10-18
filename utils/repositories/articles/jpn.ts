import type { $Fetch, NitroFetchRequest } from 'nitropack'
import type { ApiError } from '~/types/models/api/error'
import type { CreateArticleJpn } from '~/types/models/articles/jpn'

export function useJpnArticles() {
  return useApi(<T>(fetch: $Fetch<T, NitroFetchRequest>) => {
    const path = '/jp'

    const get = (wid: V2EntryJp['wid']) =>
      fetch<V2EntryJp /* | ApiError */>(`${path}/entries/${wid}`, { method: 'GET' })

    const edit = (wid: V2EntryJp['wid'], body: CreateArticleJpn) =>
      fetch<ApiError>(`${path}/entries/${wid}`, { method: 'POST', body })

    const source = (wid: V2EntryJp['wid']) =>
      fetch<CreateArticleJpn /* | ApiError */>(`${path}/entries/${wid}/txt`, { method: 'GET' })

    const preview = (body: CreateArticleJpn) =>
      fetch<V2EntryJp/* | ApiError */>(`${path}/txt-to-entry`, { method: 'POST', body })

    const create = (body: CreateArticleJpn) =>
      fetch<ApiError>(`${path}/entries`, { method: 'POST', body })

    const search = (query: string, limit: number, offset: number) =>
      fetch<JpnSearchResponse>(`search`, { method: 'POST', body: { query, limit, offset } })

    return { get, edit, source, preview, create, search }
  })
}
