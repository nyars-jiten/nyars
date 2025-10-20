import type { $Fetch, NitroFetchRequest } from 'nitropack'

// Base API composable
function useUserApi() {
  const { $apiFetch } = useNuxtApp()
  const path = '/users'

  return {
    fetch: $apiFetch as $Fetch<any, NitroFetchRequest>,
    path,
  }
}

// Authentication composables
export function useUserAuth() {
  const { fetch, path } = useUserApi()

  const login = async (login: string, password: string) => {
    try {
      const user = await fetch<User>(`${path}/auth`, {
        method: 'POST',
        body: { login, password },
      })
      return { data: user, error: null }
    }
    catch (error: any) {
      return { data: null, error: error.data as AuthError }
    }
  }

  const register = async (username: string, password: string) => {
    try {
      const user = await fetch<User>(`${path}/register`, {
        method: 'POST',
        body: { username, password },
      })
      return { data: user, error: null }
    }
    catch (error: any) {
      return { data: null, error: error.data as AuthError }
    }
  }

  const logout = async () => {
    return await fetch(`${path}/logout`, {
      method: 'POST',
    })
  }

  return {
    login,
    register,
    logout,
  }
}

// User data composables
export function useUserData() {
  const { fetch, path } = useUserApi()

  // Get current user (server-side)
  const getCurrentUser = () => {
    return useAsyncData('current-user', () =>
      fetch<ExtendedUser>(`${path}/me`).catch(() => null))
  }

  // Get user by username
  const getUser = (username: string) => {
    return useAsyncData(`user-${username}`, () =>
      fetch<User>(`${path}/profile/${username}`).catch(() => null))
  }

  // Get weekly stats
  const getWeeklyStats = () => {
    return useAsyncData('weekly-stats', () =>
      fetch<WeeklyStats>(`${path}/weekly-stats`))
  }

  return {
    getCurrentUser,
    getUser,
    getWeeklyStats,
  }
}

// User management composables (admin functions)
export function useUserManagement() {
  const { fetch, path } = useUserApi()

  const updateUserAccess = async (userId: string, access: number) => {
    return await fetch<User>(`${path}/${userId}/access`, {
      method: 'POST',
      body: { access },
    })
  }

  const banUser = async (userId: string, reason: string) => {
    return await fetch<User>(`${path}/${userId}/ban`, {
      method: 'POST',
      body: { reason },
    })
  }

  const unbanUser = async (userId: string) => {
    return await fetch<User>(`${path}/${userId}/unban`, {
      method: 'POST',
    })
  }

  return {
    updateUserAccess,
    banUser,
    unbanUser,
  }
}

// User profile composables
export function useUserProfile() {
  const { fetch, path } = useUserApi()

  const updateUsername = async (newUsername: string) => {
    return await fetch<User>(`${path}/username`, {
      method: 'POST',
      body: { username: newUsername },
    })
  }

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    return await fetch<User>(`${path}/password`, {
      method: 'POST',
      body: { currentPassword, newPassword },
    })
  }

  const uploadAvatar = async (avatar: FormData) => {
    return await fetch<User>(`${path}/avatar`, {
      method: 'POST',
      body: avatar,
    })
  }

  const removeAvatar = async () => {
    return await fetch<User>(`${path}/avatar`, {
      method: 'DELETE',
    })
  }

  return {
    updateUsername,
    updatePassword,
    uploadAvatar,
    removeAvatar,
  }
}

