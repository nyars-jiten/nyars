/**
 * API response types
 */

export interface ApiResponse<T> {
  data: T | null
  error: ApiError | null
}

export interface ApiError {
  message: string
  details?: any
  code?: number
}

export interface ApiPagination {
  limit: number
  offset: number
  total?: number
}

/**
 * Request/Response wrappers for better type safety
 */
export type RequestBody<T> = T
export type ResponseBody<T> = T
export type QueryParams = Record<string, string | number | boolean | undefined>

/**
 * Common HTTP methods
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

/**
 * Request configuration
 */
export interface RequestConfig {
  method?: HttpMethod
  body?: any
  params?: QueryParams
  headers?: Record<string, string>
}


