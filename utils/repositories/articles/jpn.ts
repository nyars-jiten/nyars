import type { Decoder } from 'io-ts'
import type { $Fetch, NitroFetchRequest } from 'nitropack'
import { either, task, taskEither } from 'fp-ts'
import { pipe } from 'fp-ts/lib/function'
import { stringifyQuery } from 'vue-router'
import type { ApiError } from '~/types/models/api/error'
import type { CreateArticleJpn } from '~/types/models/articles/jpn'

export async function sanity<I, A>(getter: () => Promise<I>, codec: Decoder<I, A>, or: () => A) {
  return pipe(
    taskEither.tryCatch(getter, either.toError),
    taskEither.flatMapEither(codec.decode),
    taskEither.getOrElse(() => task.of(or())),
  )
}

export const useJpnArticles = createSharedComposable(() => useApi(<T>(fetch: $Fetch<T, NitroFetchRequest>) => {
  const path = '/jp'

  const get = (wid: V2EntryJp['wid']) =>
    fetch<V2EntryJp /* | ApiError */>(`${path}/entries/${wid}`, { method: 'GET' })

  const preview = (body: CreateArticleJpn) =>
    fetch<V2EntryJp | ApiError>(`${path}/txt-to-entry`, { method: 'POST', body })

  const create = (body: CreateArticleJpn) =>
    fetch<ApiError>(`${path}/entries`, { method: 'POST', body })


  const search = (query: string, limit: number, offset: number) =>
    fetch<JpnSearchResponse>(`search`, { method: 'POST', body: { query, limit, offset } })

  return { get, preview, create, search }
}))
