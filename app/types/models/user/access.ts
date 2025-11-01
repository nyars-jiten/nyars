/* eslint-disable ts/prefer-literal-enum-member */
export enum Access {
  None = 0,
  Autoapprove = 1 << 0,
  Wiki = 1 << 1,
  Edits = 1 << 2,
  ProfileEdit = 1 << 3,
  Satellites = 1 << 4,
  TagEdit = 1 << 5,
  Ocr = 1 << 6,
}

export interface UserRights {
  hasAccessAutoapprove: boolean
  hasAccessWiki: boolean
  hasAccessEdits: boolean
  hasAccessProfileEdit: boolean
  hasAccessSatellites: boolean
  hasAccessTagEdit: boolean
  hasAccessOcr: boolean
}
