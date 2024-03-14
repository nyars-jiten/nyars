export const useUserStore = defineStore('userStore', () => {
  const user = ref<User|null>(null)

  const api = useApi()

  const initUser = async () => {
    user.value = await api.userRepository.serverGetCurrentUser()
  }

  return { user, initUser }
})
