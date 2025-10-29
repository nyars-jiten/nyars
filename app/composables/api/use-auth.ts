import { useApiClient } from './client'

/**
 * Authentication API client
 */
export function useAuth() {
  const client = useApiClient()
  const path = '/auth'

  /**
   * Login with credentials
   * @param credentials - Login credentials with login and password
   */
  const login = async (credentials: { login: string, password: string }) => {
    try {
      const data = await client.post<User>(`${path}/login`, credentials)
      return { data, error: null }
    }
    catch (error: any) {
      return { data: null, error: error.data as ApiError }
    }
  }

  /**
   * Register a new user
   * @param credentials - Registration credentials with login and password
   */
  const register = async (credentials: { login: string, password: string }) => {
    try {
      const data = await client.post<User>(`${path}/register`, credentials)
      return { data, error: null }
    }
    catch (error: any) {
      return { data: null, error: error.data as ApiError }
    }
  }

  /**
   * Logout current user
   */
  const logout = async () => {
    try {
      await client.post(`${path}/logout`)
      return { error: null }
    }
    catch (error: any) {
      return { error: error.data as ApiError }
    }
  }

  return {
    login,
    register,
    logout,
  }
}

/**
 * Authentication state composable
 * Provides reactive authentication state
 */
export function useAuthState() {
  const { user } = storeToRefs(useUserStore())
  const { getCurrentUser } = useUserData()
  const { logout: apiLogout } = useAuth()

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.isAdmin ?? false)
  const isBot = computed(() => user.value?.isBot ?? false)
  const isBanned = computed(() => user.value?.banned ?? false)

  /**
   * Refresh user data
   */
  const refreshUser = async () => {
    const { data } = await getCurrentUser()
    if (data.value) {
      user.value = data.value
    }
  }

  /**
   * Logout current user
   */
  const logout = async () => {
    await apiLogout()
    user.value = undefined
  }

  return {
    user: readonly(user),
    isAuthenticated,
    isAdmin,
    isBot,
    isBanned,
    refreshUser,
    logout,
  }
}
