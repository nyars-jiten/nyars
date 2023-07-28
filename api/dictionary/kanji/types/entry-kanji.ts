import { type InternalEntryKanji } from './internal-entry-kanji'
import { type KanjiImage } from './kanji-image'
import { type Radical } from './radical'

export type EntryKanji = {
  kid: string
  entry: InternalEntryKanji
  images: KanjiImage[]
  radical: Radical
  isReviewed: boolean
}
