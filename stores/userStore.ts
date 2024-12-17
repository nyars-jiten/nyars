export const useUserStore = defineStore('user-store', () => {
  const { current } = useUser()
  const { serverGetCurrentUser } = useApi(userRepository)
  const { data: user } = current()

  const checkAccess = (access: Access) => {
    return user?.value && (user.value.isAdmin || ((user.value.access & access) === access))
  }

  const userAccess = computed(() => ({
    hasAccessAutoapprove: checkAccess(Access.Autoapprove),
    hasAccessEdits: checkAccess(Access.Edits),
  } as UserRights))

  async function $reset() {
    user.value = await serverGetCurrentUser()
  }

  const menuState = ref(false)

  return { user, userAccess, $reset, menuState }
})
