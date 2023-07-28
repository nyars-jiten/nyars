import type { Meaning } from './meaning'
import type { Word } from './word'

export type InternalEntryJp = {
  words: Word[]
  tags: string[]
  meanings: Meaning[]
  externalEntry: string
}
