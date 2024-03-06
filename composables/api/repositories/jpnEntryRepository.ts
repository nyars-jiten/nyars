import { useApiFetch } from '../apiFetch'

export const useJpnEntryRepository = () => {
  const path = '/dictionary/jap'
  const fetch = useApiFetch()

  const getWeeklyTopUsers = (): Promise<User[]> => {
    return fetch<User[]>(`${path}/stats-user`)
  }

  const getJpnEntry = (wid: string): Promise<JpnEntry> => {
    return fetch<JpnEntry>(`${path}/entries/${wid}`)
  }

  return { getWeeklyTopUsers, getJpnEntry }
}
