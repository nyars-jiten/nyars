import { defineCachedEventHandler } from 'nitropack/runtime'

// Объявления сайта: сначала спрашиваем бэкенд (GET /announcements), а пока там нет эндпоинта
// (404) или бэкенд недоступен — берём значение NUXT_ANNOUNCEMENTS. Ответ общий для всех,
// cookie не нужны, поэтому кэшируется на минуту.
export default defineCachedEventHandler(async () => {
  const config = useRuntimeConfig()
  const apiUrl = config.apiUrl || config.public.apiUrl

  try {
    const response = await $fetch<unknown>('/announcements', { baseURL: apiUrl, timeout: 3000 })
    return parseAnnouncements(response)
  }
  catch (error: any) {
    const status: number | undefined = error?.statusCode ?? error?.response?.status
    // нет эндпоинта или нет связи с бэкендом: объявления из окружения
    if (status === 404 || status === undefined)
      return parseAnnouncements(config.announcements)
    console.warn('[announcements] backend error', status)
    return []
  }
}, {
  name: 'announcements',
  getKey: () => 'all',
  maxAge: import.meta.dev ? 0 : 60,
  swr: true,
})
