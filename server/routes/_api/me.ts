import { defineEventHandler, getRequestHeader } from 'h3'
import { proxyApiRequest } from '../../utils/cookie-proxy'

export default defineEventHandler(async (event) => {
  // Get the cookie header from the incoming request
  const cookieHeader = getRequestHeader(event, 'cookie')

  if (!cookieHeader) {
    // Return null if no cookie is present (user not logged in)
    return null
  }

  try {
    return await proxyApiRequest(event, '/users/me')
  }
  catch (error: any) {
    // Cookies can be present without a session (e.g. the palette cookie) or with an expired one:
    // that is "not logged in", not an error. Deletion cookies are already forwarded by the proxy.
    if (error?.statusCode === 401 || error?.statusCode === 403) {
      return null
    }
    throw error
  }
})
