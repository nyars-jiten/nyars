import type { $Fetch, NitroFetchRequest } from 'nitropack'

export function useUserRepo() {
  return useApi(<T>(fetch: $Fetch<T, NitroFetchRequest>) => {
    const path = '/users'

    const clientLogin = (login: string, password: string) => {
      return fetch<User>(`${path}/auth`, {
        method: 'POST',
        body: {
          login,
          password,
        },
      })
        .then((user) => {
          return { data: user, error: null }
        })
        .catch((error) => {
          return { data: null, error: error.data as AuthError }
        })
    }

    const clientRegister = (username: string, password: string) => {
      return fetch<User>(`${path}/register`, {
        method: 'POST',
        body: {
          username,
          password,
        },
      })
        .then((user) => {
          return { data: user, error: null }
        })
        .catch((error) => {
          return { data: null, error: error.data as AuthError }
        })
    }

    const clientLogout = () => {
      return fetch(`${path}/logout`, {
        method: 'POST',
      })
    }

    const clientGetUser = (username: string) => {
      return fetch<User>(`${path}/profile/${username}`).catch(() => null)
    }

    const serverGetCurrentUser = () => {
      return fetch<ExtendedUser>(`${path}/me`).catch(() => null)
    }

    const getWeeklyStats = (): Promise<WeeklyStats> => {
      return fetch<WeeklyStats>(`${path}/weekly-stats`)
    }

    return { clientLogin, clientRegister, clientLogout, clientGetUser, serverGetCurrentUser, getWeeklyStats }
  })
}
