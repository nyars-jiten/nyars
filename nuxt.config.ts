export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    port: 8080
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    },
    rootId: 'nyars'
  },
  // pages: true, Maybe is needed?
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', 'nuxt-headlessui', '@nuxtjs/i18n'],
  i18n: {
    locales: [{ code: 'ru', file: 'ru.json', name: 'Русский' }],
    defaultLocale: 'ru',
    langDir: 'locales',
    lazy: true,
    strategy: 'no_prefix'
  },
  pinia: {
    autoImports: ['defineStore', 'storeToRefs']
  },
  typescript: {
    strict: true
    // typeCheck: true; Uncomment after fix all errors
  }
})
