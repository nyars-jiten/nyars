export function useAccess(access: Access): boolean {
  const { user } = storeToRefs(useUserStore())

  // check if user is logged in
  if (!user || !user.value) {
    return false
  }

  // check if user is admin
  if (user.value.isAdmin) {
    return true
  }

  return (user.value.access & access) === access
}
