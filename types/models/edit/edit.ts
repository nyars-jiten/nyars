import type { ShortUser } from '../user/user.ts'
import type { DictionaryType } from './dictionaryType'
import type { EditStatus } from './editStatus'
import type { EditType } from './editType'

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
