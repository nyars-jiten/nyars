import type { ShortUser } from '../user/user'
import type { DictionaryType } from './dictionary-type'
import type { EditStatus } from './edit-status'
import type { EditType } from './edit-type'

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
  entryStatus: EntryStatus
  createdAt: Date
  updatedAt: Date
  diffSrc: EditDiff[]
  diffDst: EditDiff[]
  diffRawSrc: EditDiff[]
  diffRawDst: EditDiff[]
}
