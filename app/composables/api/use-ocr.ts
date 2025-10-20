import type { $Fetch, NitroFetchRequest } from 'nitropack'

function useOcrApi() {
  const { $apiFetch } = useNuxtApp()
  const path = '/ocr'
  const config = useRuntimeConfig()

  return {
    fetch: $apiFetch as $Fetch<any, NitroFetchRequest>,
    path,
    config,
  }
}

// OCR data management
export function useOcrData() {
  const { fetch, path } = useOcrApi()

  const getBooks = () => {
    return useAsyncData('ocr-books', () =>
      fetch<OCRBook[]>(`${path}/books`))
  }

  const searchPages = (query: string) => {
    return useAsyncData(`ocr-search-${query}`, () =>
      fetch<OCRPageWithBook[]>(`${path}/search`, {
        method: 'GET',
        query: { q: query },
      }))
  }

  const searchPagesByWid = (wid: string) => {
    return useAsyncData(`ocr-search-wid-${wid}`, () =>
      fetch<OCRPageWithBook[]>(`${path}/search-wid`, {
        method: 'GET',
        query: { wid },
      }))
  }

  const getPage = (id: string) => {
    return useAsyncData(`ocr-page-${id}`, () =>
      fetch<OCRPageWithBook>(`${path}/pages/${id}`))
  }

  const getNextPage = (bookId: number, innerIndex: number = 0, type: number = 0, currentId: string = '') => {
    return useAsyncData(`ocr-next-page-${bookId}-${innerIndex}-${type}-${currentId}`, () =>
      fetch<Record<string, string>>(`${path}/pages/${currentId}/next`, {
        method: 'GET',
        query: { bookId, innerIndex, type },
      }))
  }

  return {
    getBooks,
    searchPages,
    searchPagesByWid,
    getPage,
    getNextPage,
  }
}

// OCR actions
export function useOcrActions() {
  const { fetch, path } = useOcrApi()

  const updatePage = async (id: string, data: OCRPageWithBook) => {
    return await fetch<OCRPageWithBook>(`${path}/pages/${id}`, {
      method: 'POST',
      body: data,
    })
  }

  return {
    updatePage,
  }
}

// OCR utilities
export function useOcrUtils() {
  const { config } = useOcrApi()

  const ocrImageUrl = (prefix: string, file: string) =>
    new URL(`/static/ocr/${prefix}/${file}`, config.public.imageUrl)

  return {
    ocrImageUrl,
  }
}

