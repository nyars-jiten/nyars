import type { Sense } from './sense'

export type LangMeaning = {
  lang: 'rus' | 'jpn' | 'eng' | 'lat'
  note: string
  senses: Sense[]
}
