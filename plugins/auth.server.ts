export default defineNuxtPlugin(async () => {
  const userStore = useUserStore()

  const api = useApi()

  const user = await api.userRepository.serverGetCurrentUser()

  userStore.user = user
})
