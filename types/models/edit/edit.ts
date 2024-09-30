import type { DictionaryType } from './dictionaryType'
import type { EditStatus } from './editStatus'
import type { EditType } from './editType'

export interface Edit {
  id: number
  dictionary: DictionaryType
  /** entry id */
  identifier: string
  /** example: "title": { "引く": ["hiku"],"弾く": ["hiku"] } */
  title: Record<string, string[]>
  type: EditType
  status: EditStatus
  author: User
  approver: User | null
  commentsCount: number
  createdDate: Date
  modifiedDate: Date
}
