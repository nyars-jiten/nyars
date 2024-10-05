import type { $Fetch, NitroFetchRequest } from 'nitropack'

export function userRepository<T>(fetch: $Fetch<T, NitroFetchRequest>) {
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
    return fetch(`${path}/signOut`)
  }

  const serverGetCurrentUser = () => {
    return fetch<User>(`${path}/current`).catch(() => null)
  }

  return { clientLogin, clientRegister, clientLogout, serverGetCurrentUser }
}
