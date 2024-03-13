import { useApiFetch } from '../apiFetch'

export const useUserRepository = () => {
  const path = '/users'
  const fetch = useApiFetch()

  const clientLogin = (username: string, password: string) => {
    return fetch<User>(`${path}/auth`, {
      method: 'POST',
      body: {
        username,
        password
      }
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
        password
      }
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
