/* eslint-disable ts/prefer-literal-enum-member */
export enum Access {
  None = 0,
  Autoapprove = 1 << 1,
  Wiki = 1 << 2,
  Edits = 1 << 3,
  ProfileEdit = 1 << 4,
  Satellites = 1 << 5,
  TagEdit = 1 << 6,
  Ocr = 1 << 7,
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
