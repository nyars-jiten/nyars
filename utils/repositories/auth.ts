import type { ApiError } from '#imports'
import type { $Fetch, NitroFetchRequest } from 'nitropack'

export function useAuth() {
  return useApi(<T>(fetch: $Fetch<T, NitroFetchRequest>) => {
    const path = '/auth'

    const login = (body: { login: string, password: string }) => fetch<ApiError | User>(`${path}/login`, {
      method: 'POST',
      body,
    })

    const register = (body: { login: string, password: string }) => fetch<ApiError | User>(`${path}/register`, {
      method: 'POST',
      body,
    })

    return { login, register }
  })
}
