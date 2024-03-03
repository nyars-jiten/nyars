import { useApiFetch } from '../apiFetch'

export const useSatelliteRepository = () => {
  const path = '/Satellites'
  const fetch = useApiFetch()

  const getSatellites = (entryId: string): Promise<SatelliteData[]> => {
    return fetch<SatelliteData[]>(`${path}/${entryId}`)
  }

  return { getSatellites }
}
