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
  return useApi((fetch) => {
    const path = '/auth'

    const login = (body: { login: string, password: string }) => {
      const promise = fetch(`${path}/login`, { method: 'POST', body })

      return useAsyncData(() => toApiResponse({
        data: () => promise,
        schema: UserSchema,
        toError: toAuthError,
      }), {
        deep: true
      });
    }

    const register = ({ login, password }: { login: string, password: string }) => {
      const body = { username: login, password }

      const promise = fetch(`${path}/register`, { method: 'POST', body })

      return useAsyncData(() => toApiResponse({
        data: () => promise,
        schema: UserSchema,
        toError: toAuthError,
      }), {
        deep: true
      });
    }

    return { login, register }
  });
}
