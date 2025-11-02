import { defineEventHandler } from 'h3'
import { proxyApiRequest } from '../../../utils/cookie-proxy'

export default defineEventHandler(async (event) => {
  return await proxyApiRequest(event, '/ocr/books')
})
