import type { CookieOptions } from 'nuxt/dist/app/composables/cookie'

export const useNyarsCookie = <T = string | null | undefined>(name: string, options?: CookieOptions<T>) => {
  const defaultOptions: typeof options = {
    maxAge: 400 * 24 * 60 * 60, // 400 days is Google Chrome limitation
    path: '/',
    watch: 'shallow'
  }

  const mergedOptions = Object.assign(defaultOptions, options)

  return useCookie(name, mergedOptions)
}
