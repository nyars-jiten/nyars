import type { $Fetch, NitroFetchRequest } from 'nitropack'

class ApiAuthError extends Error {
  readonly code: AuthError['code']
  readonly time: AuthError['time']

  constructor({ text, code, time }: AuthError) {
    super(text)

    this.name = 'ApiAuthError'

    this.code = code
    this.time = time
  }
}

function toAuthError(e: unknown) {
  const data = AuthErrorSchema.parse(e)

  throw new ApiAuthError(data)
}

export function useAuthRepo() {
  return useApi(<T>(fetch: $Fetch<T, NitroFetchRequest>) => {
    const path = '/auth'

    const login = (body: { login: string, password: string }) => useAsyncData(() =>
      toApiResponse({
        data: () => fetch(`${path}/login`, { method: 'POST', body }),
        schema: UserSchema,
        toError: toAuthError,
      }))

    const register = ({ login, password }: { login: string, password: string }) => {
      const body = { username: login, password }

      useAsyncData(() =>
        toApiResponse({
          data: () => fetch(`${path}/register`, { method: 'POST', body }),
          schema: UserSchema,
          toError: toAuthError,
        }))
    }

    return { login, register }
  })
}
