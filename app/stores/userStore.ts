export const useUserStore = defineStore('user-store', () => {
  const { current } = useUser()
  const { serverGetCurrentUser } = useUserRepo()
  let remote = ref(current())

  const user = computed(() => remote.value.data)

  const checkAccess = (access: Access) => {
    return user?.value && (user.value.isAdmin || ((user.value.access & access) === access))
  }

  const userAccess = computed(() => ({
    hasAccessAutoapprove: checkAccess(Access.Autoapprove),
    hasAccessEdits: checkAccess(Access.Edits),
  } as UserRights))

  async function $reset() {
    const response = await serverGetCurrentUser()

    // @ts-expect-error fully rework this file
    remote.value = response
  }

  const menuState = ref(true)

  function logout() {
    remote.value.data = null
  }

  return { logout, user, userAccess, $reset, menuState }
})
