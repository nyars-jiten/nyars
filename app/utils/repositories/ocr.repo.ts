import type { $Fetch, NitroFetchRequest } from 'nitropack'

export function useOcrRepo() {
  return useApi(<T>(fetch: $Fetch<T, NitroFetchRequest>) => {
    const path = '/ocr'
    const config = useRuntimeConfig()

    const ocrImageUrl = (prefix: string, file: string) => new URL(`/static/ocr/${prefix}/${file}`, config.public.imageUrl)

    const getBooks = () =>
      fetch<OCRBook[]>(`${path}/books`, { method: 'GET' })

    const searchPages = (query: string) =>
      fetch<OCRPageWithBook[]>(`${path}/search`, { method: 'GET', query: { q: query } })

    const searchPagesByWid = (wid: string) =>
      fetch<OCRPageWithBook[]>(`${path}/search-wid`, { method: 'GET', query: { wid } })

    const getPage = (id: string) =>
      fetch<OCRPageWithBook>(`${path}/pages/${id}`, { method: 'GET' })

    return { getBooks, searchPages, searchPagesByWid, getPage, ocrImageUrl }
  })
}
