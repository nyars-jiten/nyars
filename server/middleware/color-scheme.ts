// Просим Chromium присылать системную тему (Sec-CH-Prefers-Color-Scheme): так сервер с первого же
// запроса без cookie `palette` рисует нужную палитру. Остальные браузеры подхватывает plugins/palette.client.ts.
export default defineEventHandler((event) => {
  setResponseHeader(event, 'Accept-CH', 'Sec-CH-Prefers-Color-Scheme')
  appendResponseHeader(event, 'Vary', 'Sec-CH-Prefers-Color-Scheme')
  appendResponseHeader(event, 'Vary', 'Cookie')
})
