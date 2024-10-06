import type { ApiError } from '#imports'
// import type { Decoder } from 'io-ts'
import type { $Fetch, NitroFetchRequest } from 'nitropack'

// import { either, task, taskEither } from 'fp-ts'
// import { pipe } from 'fp-ts/lib/function'

// type FApiRsponse = {
//   status: false
//   message: string
// }

// type SApiRespose<T> = {
//   status: true,
//   data: T
// }

// type ApiRespose<T> = FApiRsponse | SApiRespose<T>

// export async function sanity<I, A>(getter: () => Promise<I>, codec: Decoder<I, A>, or: () => A) {
//   return pipe(
//     taskEither.tryCatch(getter, either.toError),
//     taskEither.mapLeft(e => ({ status: false, message: e.message })),
//     taskEither.flatMapEither(codec.decode),
//     taskEither.getOrElse(() => task.of(or())),
//   )
// }

export const useAuth = createSharedComposable(() => useApi(<T>(fetch: $Fetch<T, NitroFetchRequest>) => {
  const path = '/auth'

  const login = (body: { login: string, password: string }) => fetch<ApiError | User>(`${path}/login`, {
    method: 'POST',
    // credentials: 'include',
    body,
  })

  const register = (body: { login: string, password: string }) => fetch<ApiError | User>(`${path}/register`, {
    method: 'POST',
    // credentials: 'include',
    body,
  })

  const logout = () => fetch<ApiError | void>(`${path}/logout`)

  return { login, register, logout }
}))
