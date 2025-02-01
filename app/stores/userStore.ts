export const useUserStore = defineStore('user-store', () => {
  const { current } = useUser()
  const { serverGetCurrentUser } = useUserRepo()
  const { data: user } = current()

  const checkAccess = (access: Access) => {
    return user?.value && (user.value.isAdmin || ((user.value.access & access) === access))
  }

  const userAccess = computed(() => ({
    hasAccessAutoapprove: checkAccess(Access.Autoapprove),
    hasAccessEdits: checkAccess(Access.Edits),
  } as UserRights))

  async function $reset() {
    const response = await serverGetCurrentUser()

    watch(response.data, (data) => {
      user.value = data
    })
  }

  const menuState = ref(true)

  function logout() {
    user.value = undefined
  }

  return { logout, user, userAccess, $reset, menuState }
})
