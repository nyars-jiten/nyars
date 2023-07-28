import { type EntryKanji } from '../../kanji/types'
import { type InternalEntryJp } from './internal-entry-jp'

export type EntryJp = {
  wid: string
  entry: InternalEntryJp
  externalEntry: string | null
  isReviewed: boolean
  isUnconfirmed: boolean
  kanjis: EntryKanji[] | null
  picturesId: number
}
