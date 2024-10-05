export const useUserStore = createGlobalState(() => {
  const user = ref<User | null>(null)

  const initUser = async () => {
    const { current } = useUser()

    const result = await current()
    if ('code' in result === false) {
      // user.value = result
    }
  }

  return { user, initUser }
})
