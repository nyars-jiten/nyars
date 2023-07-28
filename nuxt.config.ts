export default defineNuxtConfig({
  devtools: { enabled: true },
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
  }
})
