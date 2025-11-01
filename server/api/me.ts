import { defineEventHandler, getRequestHeader } from 'h3'
import { proxyApiRequest } from '../utils/cookie-proxy'

export default defineEventHandler(async (event) => {
  // Get the cookie header from the incoming request
  const cookieHeader = getRequestHeader(event, 'cookie')

  if (!cookieHeader) {
    // Return null if no cookie is present (user not logged in)
    return null
  }

  return await proxyApiRequest(event, '/users/me')
})
