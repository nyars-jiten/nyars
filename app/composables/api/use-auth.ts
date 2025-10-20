import type { $Fetch, NitroFetchRequest } from 'nitropack'

function useAuthApi() {
  const { $apiFetch } = useNuxtApp()
  const path = '/auth'

  return {
    fetch: $apiFetch as $Fetch<any, NitroFetchRequest>,
    path,
  }
}

// Authentication composables
export function useAuth() {
  const { fetch, path } = useAuthApi()

  const login = async (body: { login: string, password: string }) => {
    try {
      const user = await fetch<User>(`${path}/login`, {
        method: 'POST',
        body,
      })
      return { data: user, error: null }
    }
    catch (error: any) {
      return { data: null, error: error.data as ApiError }
    }
  }

  const register = async (body: { login: string, password: string }) => {
    try {
      const user = await fetch<User>(`${path}/register`, {
        method: 'POST',
        body,
      })
      return { data: user, error: null }
    }
    catch (error: any) {
      return { data: null, error: error.data as ApiError }
    }
  }

  return {
    login,
    register,
  }
}

// Authentication state management
export function useAuthState() {
  const { user } = storeToRefs(useUserStore())
  const { getCurrentUser } = useUserData()

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.isAdmin ?? false)

  const refreshUser = async () => {
    const { data } = await getCurrentUser()
    if (data.value) {
      user.value = data.value
    }
  }

  const logout = async () => {
    const { logout } = useUserAuth()
    await logout()
    user.value = null
    await navigateTo('/')
  }

  return {
    isAuthenticated,
    isAdmin,
    refreshUser,
    logout,
  }
}
