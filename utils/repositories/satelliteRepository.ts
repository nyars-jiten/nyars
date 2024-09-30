import type { $Fetch, NitroFetchRequest } from 'nitropack'

export function satelliteRepository<T>(fetch: $Fetch<T, NitroFetchRequest>) {
  const path = '/Satellites'

  const getSatellites = (entryId: string): Promise<SatelliteData[][]> => {
    return fetch<SatelliteData[][]>(`${path}/${entryId}`)
  }

  return { getSatellites }
}
