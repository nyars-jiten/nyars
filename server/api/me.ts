import { appendResponseHeader, defineEventHandler, getRequestHeader } from 'h3'
import splitCookiesString from 'set-cookie-parser'

function forwardCookies(event: any, setCookieRaw: string) {
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

export default defineEventHandler(async (event) => {
  // Get the cookie header from the incoming request
  const cookieHeader = getRequestHeader(event, 'cookie')
  const config = useRuntimeConfig()

  if (!cookieHeader) {
    // Return null if no cookie is present (user not logged in)
    return null
  }

  try {
    // Forward the request to the Golang API with the cookie
    const apiUrl = config.apiUrl || config.public.apiUrl

    // Use $fetch.raw to get full response including headers
    const rawResponse = await $fetch.raw('/users/me', {
      baseURL: apiUrl,
      method: 'GET',
      headers: {
        cookie: cookieHeader,
      },
    })

    const setCookieRaw = rawResponse.headers.get('set-cookie')
    console.log('set-cookie from API response:', setCookieRaw)
    if (setCookieRaw) {
      forwardCookies(event, setCookieRaw)
    }

    // Return the response body
    return rawResponse._data
  }
  catch (error: any) {
    // Handle errors from the Golang API
    if (error.response) {
      const setCookieRaw = error.response.headers.get('set-cookie')
      console.log('set-cookie from API error response:', setCookieRaw)

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
      statusMessage: 'Failed to fetch user data',
    })
  }
})
