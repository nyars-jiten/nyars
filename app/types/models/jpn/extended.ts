export interface EntryJpSatellite {
  id: string
  title: string
  body: EntryJpSatelliteBody[]
}

export interface EntryJpSatelliteBody {
  text: string
  lines: number
}
