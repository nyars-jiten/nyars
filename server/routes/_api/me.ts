import { defineEventHandler, getRequestHeader } from 'h3'
import { proxyApiRequest } from '../../utils/cookie-proxy'

export default defineEventHandler(async (event) => {
  // Get the cookie header from the incoming request
  const cookieHeader = getRequestHeader(event, 'cookie')

  // Нет сессионных cookie (например, только cookie палитры) — гость, к API не ходим
  if (!cookieHeader || !/(?:^|;\s*)(?:access_token|refresh_token)=/.test(cookieHeader)) {
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
    // Сеть/5xx — это «неизвестно», а не «гость»: клиент не должен считать пользователя вышедшим
    throw createError({ statusCode: 503, statusMessage: 'Auth check failed' })
  }
})
