export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const apiFetch = $fetch.create({
    baseURL: config.public.apiUrl,
    credentials: 'include',
    retry: false, // Disable automatic retry to handle auth errors properly
    onRequestError({ error }) {
      console.error('[API Fetch] Request error:', error)
    },
    onResponseError({ request, response }) {
      // Handle different error status codes
      switch (response.status) {
        case 401:
          console.warn('[API Fetch] Unauthorized request:', request)
          // Clear any cached user data on 401
          if (import.meta.client) {
            const { user } = storeToRefs(useUserStore())
            user.value = null
          }
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

  return {
    provide: {
      apiFetch,
    },
  }
})
