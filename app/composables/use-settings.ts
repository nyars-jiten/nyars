// Settings management composable
export function useSettings() {
  const { updateUsername, updatePassword, uploadAvatar, removeAvatar } = useUserProfile()

  // Username change with optimistic updates
  const changeUsername = async (newUsername: string) => {
    const { user } = storeToRefs(useUserStore())

    // Optimistic update
    const oldUsername = user.value?.username
    if (user.value) {
      user.value.username = newUsername
    }

    try {
      await updateUsername(newUsername)
      // Refresh user data to get server state
      await refreshCookie('user')
      return { success: true, error: null }
    }
    catch (error) {
      // Revert optimistic update on error
      if (user.value && oldUsername) {
        user.value.username = oldUsername
      }
      return { success: false, error }
    }
  }

  // Password change
  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      await updatePassword(currentPassword, newPassword)
      return { success: true, error: null }
    }
    catch (error) {
      return { success: false, error }
    }
  }

  // Avatar management
  const changeAvatar = async (avatar: FormData) => {
    try {
      await uploadAvatar(avatar)
      // Refresh user data
      await refreshCookie('user')
      return { success: true, error: null }
    }
    catch (error) {
      return { success: false, error }
    }
  }

  const deleteAvatar = async () => {
    try {
      await removeAvatar()
      // Refresh user data
      await refreshCookie('user')
      return { success: true, error: null }
    }
    catch (error) {
      return { success: false, error }
    }
  }

  return {
    changeUsername,
    changePassword,
    changeAvatar,
    deleteAvatar,
  }
}
