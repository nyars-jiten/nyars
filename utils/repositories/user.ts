import type { ApiError } from '#imports'
import type { $Fetch, NitroFetchRequest } from 'nitropack'

export const useUser = createSharedComposable(() => useApi(<T>(fetch: $Fetch<T, NitroFetchRequest>) => {
  const path = '/users'

  const current = () => useAsyncData(() => fetch<ApiError | User>(`${path}/current`, {
    method: 'GET',
    credentials: 'include',
  }), {
    // server: false,
  })

  return { current }
}))
