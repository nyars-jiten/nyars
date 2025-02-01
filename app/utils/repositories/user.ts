import type { $Fetch, NitroFetchRequest } from 'nitropack'

export function useUser() {
  return useApi(<T>(fetch: $Fetch<T, NitroFetchRequest>) => {
    const path = '/users'

    const current = () => useAsyncData(() => fetch</* ApiError | */ ExtendedUser>(`${path}/me`, {
      // method: 'GET',
      // credentials: 'include',
      headers: useRequestHeaders(['cookie']),
    }), {
      server: false,
    })

    return { current }
  })
}
