import type { $Fetch, NitroFetchRequest } from 'nitropack'

export const jpnEntryRepository = <T>(fetch: $Fetch<T, NitroFetchRequest>) => {
  const path = '/dictionary/jap'

  const getWeeklyTopUsers = (): Promise<User[]> => {
    return fetch<User[]>(`${path}/stats-user`)
  }

  const getJpnEntry = (wid: string): Promise<JpnEntry> => {
    return fetch<JpnEntry>(`${path}/entries/${wid}`)
  }

  return { getWeeklyTopUsers, getJpnEntry }
}
