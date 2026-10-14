import { useApiClient } from './client'

/** Пользователь вошёл: кладём в стор, сообщаем другим вкладкам, узнаём срок access */
function startSession(user: ExtendedUser) {
  useUserStore().setUser(user)
  postAuthMessage('login')
  refreshSession()
}

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
      const data = await client.post<ExtendedUser>(`${path}/login`, credentials)
      startSession(data)
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
      const data = await client.post<ExtendedUser>(`${path}/register`, credentials)
      startSession(data)
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
      return { error: null, status: 200 }
    }
    catch (error: any) {
      return { error: error.data as ApiError, status: error.statusCode as number | undefined }
    }
  }

  /**
   * Logout from every device except the current one
   */
  const logoutOthers = async () => {
    try {
      await client.post(`${path}/logout-others`)
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
    logoutOthers,
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
  const store = useUserStore()

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
    const { error, status } = await apiLogout()
    // 401 — сессии уже нет, это тоже выход; сеть/5xx — состояние не трогаем,
    // иначе после перезагрузки пользователь «воскреснет»
    if (error && status !== 401) {
      useToast().error('Не удалось выйти', { description: 'Попробуйте ещё раз.' })
      return false
    }
    store.setLoggedOut()
    postAuthMessage('logout')
    return true
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
