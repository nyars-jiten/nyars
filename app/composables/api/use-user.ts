import { useApiClient } from './client'

// User API client
export function useUserApi() {
  const client = useApiClient()
  const path = '/users'

  return {
    client,
    path,
  }
}

/**
 * User data composables
 * Provides methods for fetching user information
 */
export function useUserData() {
  const { client, path } = useUserApi()

  /**
   * Get current authenticated user
   * Uses useFetch to properly forward cookies during SSR
   */
  const getCurrentUser = () => {
    return useFetch<ExtendedUser>('/api/me', {
      onResponseError() {
        return null
      },
    })
  }

  /**
   * Get user by username
   * @param username - Username to lookup
   */
  const getUser = (username: string) => {
    return useAsyncData(`user-${username}`, async () => {
      try {
        return await client.get<User>(`${path}/profile/${username}`)
      }
      catch {
        return null
      }
    })
  }

  /**
   * Get weekly statistics
   */
  const getWeeklyStats = () => {
    return useAsyncData('weekly-stats', () =>
      client.get<WeeklyStats>(`${path}/weekly-stats`))
  }

  /**
   * Get user heatmap data
   * @param userId - User ID (UUID)
   * @param from - Start date (YYYY-MM-DD)
   * @param to - End date (YYYY-MM-DD)
   */
  const getUserHeatmap = (userId: string, from?: string, to?: string) => {
    return useAsyncData(`user-heatmap-${userId}-${from}-${to}`, () =>
      client.get<Array<{ date: string, value: number }>>(`${path}/${userId}/heatmap`, { from, to }))
  }

  return {
    getCurrentUser,
    getUser,
    getWeeklyStats,
    getUserHeatmap,
  }
}

/**
 * User management composables (admin functions)
 * Provides methods for managing users
 */
export function useUserManagement() {
  const { client, path } = useUserApi()

  /**
   * Update user access level
   * @param userId - User ID (UUID)
   * @param access - Access level
   */
  const updateUserAccess = async (userId: string, access: number) => {
    return await client.post<User>(`${path}/${userId}/access`, { access })
  }

  /**
   * Ban a user
   * @param userId - User ID (UUID)
   * @param reason - Ban reason
   */
  const banUser = async (userId: string, reason: string) => {
    return await client.post<User>(`${path}/${userId}/ban`, { reason })
  }

  /**
   * Unban a user
   * @param userId - User ID (UUID)
   */
  const unbanUser = async (userId: string) => {
    return await client.post<User>(`${path}/${userId}/unban`)
  }

  return {
    updateUserAccess,
    banUser,
    unbanUser,
  }
}

/**
 * User profile composables
 * Provides methods for managing user profile
 */
export function useUserProfile() {
  const { client, path } = useUserApi()

  const getUserAvatarUrl = (avatar: string) => {
    const config = useRuntimeConfig()

    return new URL(`/static/avatar/${avatar}`, config.public.imageUrl)
  }

  /**
   * Update username
   * @param newUsername - New username
   */
  const updateUsername = async (newUsername: string) => {
    return await client.post<User>(`${path}/username`, { username: newUsername })
  }

  /**
   * Update password
   * @param currentPassword - Current password
   * @param newPassword - New password
   */
  const updatePassword = async (currentPassword: string, newPassword: string) => {
    return await client.post<User>(`${path}/password`, {
      currentPassword,
      newPassword,
    })
  }

  /**
   * Upload avatar
   * @param avatar - FormData with avatar file
   */
  const uploadAvatar = async (avatar: FormData) => {
    return await client.post<User>(`${path}/avatar`, avatar)
  }

  /**
   * Remove avatar
   */
  const removeAvatar = async () => {
    return await client.delete<User>(`${path}/avatar`)
  }

  return {
    getUserAvatarUrl,
    updateUsername,
    updatePassword,
    uploadAvatar,
    removeAvatar,
  }
}
