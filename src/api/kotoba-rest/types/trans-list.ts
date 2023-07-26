import type { TransVariant } from './trans-variant'

export type TransList = {
  [key in string]: {
    [key in TransVariant]: string
  }
}
