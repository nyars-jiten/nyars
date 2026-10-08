import { defineEventHandler, getRequestHeader, send, setResponseStatus } from 'h3'
import { proxyApiRequest } from '../../utils/cookie-proxy'

export default defineEventHandler(async (event) => {
  const cookieHeader = getRequestHeader(event, 'cookie')

  if (!cookieHeader) {
    // Bare `return null` → HTTP 204 → useFetch data is undefined (Nuxt warning).
    setResponseStatus(event, 200)
    return send(event, 'null', 'application/json')
  }

  return await proxyApiRequest(event, '/users/me')
})
