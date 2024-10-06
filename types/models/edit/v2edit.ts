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
  /** example: "title": { "引く": ["hiku"],"弾く": ["hiku"] } */
  title: Record<string, string[]>
  createdAt: Date
  updatedAt: Date
  diffSrc: EditDiff[]
  diffDst: EditDiff[]
}

export interface EditDiff {
  c: string
  d: boolean
}
