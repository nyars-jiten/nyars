export const useUserStore = defineStore('user-store', () => {
  const { getCurrentUser } = useUserData()
  const { data: user, error, refresh: $refresh } = getCurrentUser()
  // когда истечёт access-токен (мс); известно после первого refresh
  const accessExpiresAt = ref<number | null>(null)
  // SSR не смог выяснить, залогинен ли пользователь (ошибка сети/сервера) — это не «гость»
  const authUnknown = computed(() => !user.value && !!error.value)

  const checkAccess = (access: Access) => {
    return user?.value && (user.value.isAdmin || ((user.value.access & access) === access))
  }

  const userAccess = computed(() => ({
    hasAccessAutoapprove: checkAccess(Access.Autoapprove),
    hasAccessWiki: checkAccess(Access.Wiki),
    hasAccessEdits: checkAccess(Access.Edits),
    hasAccessProfileEdit: checkAccess(Access.ProfileEdit),
    hasAccessSatellites: checkAccess(Access.Satellites),
    hasAccessTagEdit: checkAccess(Access.TagEdit),
    hasAccessOcr: checkAccess(Access.Ocr),
  } as UserRights))

  function setUser(value: ExtendedUser | null, expiresAt?: number | null) {
    user.value = value
    if (expiresAt !== undefined)
      accessExpiresAt.value = expiresAt
  }

  function setLoggedOut() {
    user.value = null
    accessExpiresAt.value = null
    error.value = undefined
  }

  /** Освежить сессию перед важным действием, если access скоро истечёт */
  function checkAuth() {
    ensureFreshSession()
  }

  const menuState = ref(true)

  return { user, userAccess, menuState, accessExpiresAt, authUnknown, setUser, setLoggedOut, checkAuth, $refresh }
})
