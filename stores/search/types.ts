import { SearchType } from '@/api/types/search/search-type'
import { type DeepReadonly } from 'vue'

export type ReadOnlyRequest = DeepReadonly<{
  request: string
  mode?: SearchType
}>