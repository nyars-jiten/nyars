/**
 * Devtools / PWA probe /sw.js and /dev-sw.js. Our [...404] catch-all would
 * return the SPA HTML (200). Nuxt 4.2 then crashes its error overlay with
 * `html.replace is not a function` (fixed upstream in 4.3). Short-circuit.
 */
export default defineEventHandler((event) => {
  const path = getRequestURL(event).pathname
  if (
    path === '/sw.js'
    || path === '/dev-sw.js'
    || path.endsWith('/dev-sw.js')
    || path.endsWith('/sw.js')
  ) {
    setResponseStatus(event, 404, 'Not Found')
    setResponseHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
    return 'Not Found'
  }
})
