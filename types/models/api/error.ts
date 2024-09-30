import { number, string, type, type TypeOf } from 'io-ts'

export const ApiError = type({
  code: number,
  message: string,
})

export type ApiError = TypeOf<typeof ApiError>
