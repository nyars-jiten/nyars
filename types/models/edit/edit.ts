import type { DictionaryType } from './dictionaryType'
import type { EditType } from './editType'
import type { EditStatus } from './editStatus'

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
  approver: User
  commentsCount: number
  createdDate: Date
  modifiedDate: Date
}
