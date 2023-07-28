import type { References } from './references'
import type { Tags } from './tags'

export type Sense = {
  tags: Tags
  value: string
  examples: { value: string; translation: string }[]
  isRare: boolean
  references: References
}
