import type { Pinia } from 'pinia'

// Проактивное обновление сессии: старт, таймер, возврат на вкладку, появление сети
const REFRESH_BEFORE_EXPIRY = 60 * 1000
const MIN_DELAY = 5 * 1000

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  initAuthSession(nuxtApp.$pinia as Pinia, config.public.apiUrl)

  const store = useUserStore()
  const { user, accessExpiresAt } = storeToRefs(store)

  let timer: ReturnType<typeof setTimeout> | undefined
  watch([user, accessExpiresAt], () => {
    clearTimeout(timer)
    if (!user.value || !accessExpiresAt.value)
      return
    const delay = Math.max(accessExpiresAt.value - Date.now() - REFRESH_BEFORE_EXPIRY, MIN_DELAY)
    timer = setTimeout(() => refreshSession(), delay)
  }, { immediate: true })

  nuxtApp.hook('app:mounted', () => {
    // пользователь считается залогиненным (или SSR не смог проверить) — освежаем сессию и узнаём срок access
    if (store.user || store.authUnknown)
      refreshSession()
  })

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible')
      ensureFreshSession()
  })
  window.addEventListener('online', () => ensureFreshSession())
})
