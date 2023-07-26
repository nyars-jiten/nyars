import type { KanjiFormType } from './kanji-form-type'

export type KanjiForm = {
  literal: string
  type: KanjiFormType
  data?: string
}
