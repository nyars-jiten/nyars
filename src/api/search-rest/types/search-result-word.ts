import { type EntryJp } from '@/api/dictionary/jp/types'
import { type SearchResultJpInfo } from './search-result-jp-info'

export type SearchResultWord = {
  info: SearchResultJpInfo
  result: EntryJp[]
}
