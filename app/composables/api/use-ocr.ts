import { useApiClient } from './client'

/**
 * OCR API client
 */
export function useOcrApi() {
  const client = useApiClient()
  const path = '/ocr'
  const config = useRuntimeConfig()

  return {
    client,
    path,
    config,
  }
}

/**
 * OCR data management composable
 */
export function useOcrData() {
  const { client, path } = useOcrApi()

  // SSR-compatible: uses server proxy
  const getBooks = () => {
    return useFetch<OCRBook[]>('/_api/ocr/books')
  }

  // SSR-compatible: uses server proxy
  const getPage = (id: string) => {
    return useFetch<OCRPageWithBook>(`/_api/ocr/pages/${id}`, { deep: true })
  }

  // Client-only: direct API call
  const searchPages = (query: string) => {
    return useAsyncData(`ocr-search-${query}`, () =>
      client.get<OCRPageWithBook[]>(`${path}/search`, { q: query }))
  }

  // Client-only: direct API call
  const searchPagesByWid = (wid: string) => {
    return useAsyncData(`ocr-search-wid-${wid}`, () =>
      client.get<OCRPageWithBook[]>(`${path}/search-wid`, { wid }))
  }

  // Client-only: direct API call
  const getNextPage = async (bookId: number, innerIndex: number = 0, type: number = 0, currentId: string = '') => {
    return await client.get<Record<string, string>>(`${path}/pages/${currentId}/next`, { bookId, innerIndex, type })
  }

  return {
    getBooks,
    searchPages,
    searchPagesByWid,
    getPage,
    getNextPage,
  }
}

/**
 * OCR actions composable
 */
export function useOcrActions() {
  const { client, path } = useOcrApi()

  // Client-only: direct API call
  const updatePage = async (id: string, data: OCRPageWithBook) => {
    return await client.post<OCRPageWithBook>(`${path}/pages/${id}`, data)
  }

  return {
    updatePage,
  }
}

/**
 * OCR utilities composable
 */
export function useOcrUtils() {
  const { config } = useOcrApi()

  const ocrImageUrl = (prefix: string, file: string) =>
    new URL(`/static/ocr/${prefix}/${file}`, config.public.imageUrl)

  return {
    ocrImageUrl,
  }
}
