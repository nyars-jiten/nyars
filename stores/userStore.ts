export const useUserStore = defineStore('user-store', () => {
  const { current } = useUser()
  const { data: user } = current()

  return { user }
})
