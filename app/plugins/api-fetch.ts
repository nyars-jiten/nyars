import type { $Fetch } from 'nitropack'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const baseFetch = $fetch.create({
    baseURL: config.public.apiUrl,
    credentials: 'include',
    retry: false, // повторы делаем сами: после refresh и только для 401
    onRequestError({ error, options }) {
      // запрос отменили намеренно (новый поиск вместо старого, «Отменить») — это не ошибка
      if (options.signal?.aborted || error?.name === 'AbortError')
        return
      console.error('[API Fetch] Request error:', error)
    },
    onResponseError({ request, response }) {
      switch (response.status) {
        case 401:
          console.warn('[API Fetch] Unauthorized request:', request)
          break
        case 403:
          console.warn('[API Fetch] Forbidden request:', request)
          break
        case 404:
          console.warn('[API Fetch] Not found:', request)
          break
        case 500:
          console.error('[API Fetch] Server error:', request)
          break
        default:
          console.error(`[API Fetch] HTTP ${response.status} error:`, request)
      }
    },
  })

  // 401 на обычном запросе → один refresh → повтор запроса.
  // Разлогин происходит только внутри refreshSession (401 от /auth/refresh).
  const apiFetch = (async (request: any, options?: any) => {
    try {
      return await baseFetch(request, options)
    }
    catch (error: any) {
      // стор берём лениво и только на клиенте: на сервере создавать его в плагине незачем
      const userStore = import.meta.client ? useUserStore() : null
      const isAuthCall = typeof request === 'string' && request.startsWith('/auth/')
      if (
        !import.meta.client
        || error?.response?.status !== 401
        || isAuthCall
        || options?.signal?.aborted
        || !userStore
        || (!userStore.user && !userStore.authUnknown) // гость: обновлять нечего
      ) {
        throw error
      }
      if (await refreshSession() === 'ok')
        return baseFetch(request, options)
      throw error
    }
  }) as $Fetch
  apiFetch.raw = baseFetch.raw
  apiFetch.create = baseFetch.create

  return {
    provide: {
      apiFetch,
    },
  }
})
