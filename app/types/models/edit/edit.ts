import type { ShortUser } from '../user/user.js'
import type { DictionaryType } from './dictionaryType.js'
import type { EditStatus } from './editStatus.js'
import type { EditType } from './editType.js'

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
