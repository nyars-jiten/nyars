export const useUserStore = defineStore('userStore', () => {
  const user = ref<User | null>(null)

  // const { serverGetCurrentUser } = useApi(userRepository)

  const initUser = async () => {
    return {}
    // user.value = await serverGetCurrentUser()
  }

  return { user, initUser }
})
