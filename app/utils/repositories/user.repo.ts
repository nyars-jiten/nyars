import type { $Fetch, NitroFetchRequest } from 'nitropack'

export function useUserRepo() {
  return useApi(<T>(fetch: $Fetch<T, NitroFetchRequest>) => {
    const path = '/users'

    const clientLogout = () => fetch(`${path}/logout`, { method: 'POST' })

    const clientGetUser = (username: string) => {
      return useAsyncData(() =>
        toApiResponse({
          data: () => fetch(`${path}/profile/${username}`),
          schema: UserSchema,
        }))
    }

    const serverGetCurrentUser = () => useAsyncData(() => toApiResponse({
      data: () => fetch(`${path}/me`),
      schema: ExtendedUserSchema,
    }))

    const getWeeklyStats = () => useAsyncData(() => toApiResponse({
      data: () => fetch(`${path}/weekly-stats`),
      schema: WeeklyStatsSchema,
    }))

    return { clientLogout, clientGetUser, serverGetCurrentUser, getWeeklyStats }
  })
}
