import type { H3Event } from 'h3'
import { appendResponseHeader, createError, getRequestHeader } from 'h3'
import splitCookiesString from 'set-cookie-parser'

/**
 * Parse and forward Set-Cookie headers from API response to client
 */
export function forwardCookies(event: H3Event, setCookieRaw: string) {
  // Parse the set-cookie header
  const parsed = splitCookiesString.parse(setCookieRaw, { map: false })

  parsed.forEach((c) => {
    const parts: string[] = [`${c.name}=${c.value}`]

    // Add cookie attributes
    if (c.path)
      parts.push(`Path=${c.path}`)
    if (c.expires)
      parts.push(`Expires=${new Date(c.expires).toUTCString()}`)
    if (c.maxAge !== undefined)
      parts.push(`Max-Age=${c.maxAge}`)
    if (c.httpOnly)
      parts.push('HttpOnly')
    if (c.secure)
      parts.push('Secure')
    if (c.sameSite)
      parts.push(`SameSite=${c.sameSite}`)

    const cookieString = parts.join('; ')
    console.log('Forwarding cookie:', cookieString)

    // Use appendResponseHeader to allow multiple Set-Cookie headers
    appendResponseHeader(event, 'set-cookie', cookieString)
  })
}

/**
 * Proxy a request to the API, forwarding cookies both ways
 */
export async function proxyApiRequest<T>(
  event: H3Event,
  endpoint: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    params?: Record<string, any>
    body?: any
  } = {},
): Promise<T> {
  const cookieHeader = getRequestHeader(event, 'cookie')
  const config = useRuntimeConfig()
  const apiUrl = config.apiUrl || config.public.apiUrl

  try {
    // Use $fetch.raw to get full response including headers
    const rawResponse = await $fetch.raw<T>(endpoint, {
      baseURL: apiUrl,
      method: options.method || 'GET',
      headers: cookieHeader ? { cookie: cookieHeader } : {},
      params: options.params,
      body: options.body,
    })

    const setCookieRaw = rawResponse.headers.get('set-cookie')
    if (setCookieRaw) {
      forwardCookies(event, setCookieRaw)
    }

    // Return the response body
    return rawResponse._data as T
  }
  catch (error: any) {
    // Handle errors from the API
    if (error.response) {
      const setCookieRaw = error.response.headers.get('set-cookie')

      // IMPORTANT: Set cookies BEFORE throwing the error
      // This ensures cookies (including max-age=0 deletion cookies) are sent to the client
      if (setCookieRaw) {
        forwardCookies(event, setCookieRaw)
      }

      throw createError({
        statusCode: error.response.status,
        statusMessage: error.response.statusText,
        data: error.response._data,
      })
    }

    // Handle network or other errors
    throw createError({
      statusCode: 500,
      statusMessage: 'API request failed',
    })
  }
}
