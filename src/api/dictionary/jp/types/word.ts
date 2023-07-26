import type { Reading } from './reading'
import type { Writing } from './writing'

export type Word = {
  writings: Writing[]
  readings: Reading[]
}
