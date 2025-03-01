export const useUserStore = defineStore('user-store', () => {
  const { current } = useUser()
  const { serverGetCurrentUser } = useUserRepo()
  const { data: user } = current()
  const updTime = ref(Date.now())

  const checkAccess = (access: Access) => {
    checkAuth()
    return user?.value && (user.value.isAdmin || ((user.value.access & access) === access))
  }

  const userAccess = computed(() => ({
    hasAccessAutoapprove: checkAccess(Access.Autoapprove),
    hasAccessEdits: checkAccess(Access.Edits),
  } as UserRights))

  async function $reset() {
    updTime.value = Date.now()
    user.value = await serverGetCurrentUser()
  }

  async function checkAuth() {
    if (Date.now() - updTime.value > (1 * 60 * 1000)) { // every 15 min 
      $reset()
    }
  }

  const menuState = ref(true)

  return { user, userAccess, $reset, menuState }
})
