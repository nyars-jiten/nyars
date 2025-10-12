import type { TypeOf } from 'io-ts'
import { number, string, type } from 'io-ts'

export const _ApiError = type({
  code: number,
  message: string,
})

export type ApiError = TypeOf<typeof _ApiError>
