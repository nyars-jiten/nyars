export default defineEventHandler((event) => {
  setResponseStatus(event, 404, 'Not Found')
  setResponseHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return 'Not Found'
})
