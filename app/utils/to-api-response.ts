import type { ZodType } from 'zod'

interface ToApiResponse<T extends ZodType> {
  data: () => Promise<any>
  schema: T
  toError?: (e: unknown) => void
}

function toApiResponseError(e: unknown) {
  const data = ApiErrorSchema.parse(e)

  throw new Error(data.message, { cause: data })
}

export async function toApiResponse<V extends ZodType, T extends ZodType<V['_output']>>({ data: promise, schema, toError = toApiResponseError }: ToApiResponse<T>) {
  try {
    const data = await promise()
    return schema.parse(data) as T['_output']
  }
  catch (e) {
    toError(e)
  }
}
