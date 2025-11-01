import { defineEventHandler, getRouterParam } from 'h3'
import { proxyApiRequest } from '../../../utils/cookie-proxy'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Page ID is required',
    })
  }

  return await proxyApiRequest(event, `/ocr/pages/${id}`)
})
