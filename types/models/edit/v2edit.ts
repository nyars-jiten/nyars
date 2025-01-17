import type { ShortUser } from '../user/user.ts'

export interface EditResponse {
  id: string
  wid: string
  dictionary: DictionaryType
  type: EditType
  status: EditStatus
  author: ShortUser | null
  approver: ShortUser | null
  comment: string
  title: string
  entryStatus: V2Status
  createdAt: Date
  updatedAt: Date
  diffSrc: EditDiff[]
  diffDst: EditDiff[]
  diffRawSrc: EditDiff[]
  diffRawDst: EditDiff[]
}

export interface EditDiff {
  c: string
  d: boolean
}
