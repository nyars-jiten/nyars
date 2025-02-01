export function useUserRepo() {
  return useApi((fetch) => {
    const path = '/users'

    const clientLogout = () => fetch(`${path}/logout`, { method: 'POST' })

    const clientGetUser = (username: string) => {
      const promise = fetch(`${path}/profile/${username}`)

      return useAsyncData(() => toApiResponse({
        data: () => promise,
        schema: UserSchema,
      }), {
        deep: true
      });
    }

    const serverGetCurrentUser = () => {
      const promise = fetch(`${path}/me`)

      return useAsyncData(() => toApiResponse({
        data: () => promise,
        schema: ExtendedUserSchema,
      }), {
        deep: true
      });
    }

    const getWeeklyStats = () => {
      const promise = fetch(`${path}/weekly-stats`)

      return useAsyncData(() => toApiResponse({
        data: () => promise,
        schema: WeeklyStatsSchema,
      }), {
        deep: true
      });
    }

    return { clientLogout, clientGetUser, serverGetCurrentUser, getWeeklyStats }
  });
}
