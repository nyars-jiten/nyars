export const useUserStore = createGlobalState(() => {
  const { current } = useUser()
  const { data: user } = current()

  return { user }
})
