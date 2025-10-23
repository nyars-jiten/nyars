import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  devServer: {
    host: '127.0.0.1',
    port: 8080,
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      strictPort: true,
    },
  },
  compatibilityDate: '2025-07-15',
  app: {
    rootId: 'nyars',
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  runtimeConfig: {
    // Private keys are only available on the server
    apiUrl: '', // Server-side API URL for proxying
    public: {
      apiUrl: '', // Client-side API URL
      baseUrl: '',
      imageUrl: '',
      discordUrl: '',
    },
  },
  imports: {
    dirs: [
      '~/types/**',
      '~/utils/**',
    ],
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  fonts: {
    defaults: {
      weights: [200, 400, 700],
    },
  },
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@nuxt/icon',
    '@vee-validate/nuxt',
    '@vueuse/nuxt',
    '@nuxt/fonts',
    'nuxt-typed-router',
    'v-lazy-show/nuxt',
  ],
  eslint: {
    config: {
      standalone: false,
    },
  },
  veeValidate: {
    autoImports: true,
  },
  i18n: {
    defaultLocale: 'ru',
    locales: [
      { code: 'ru', name: 'Русский', file: 'ru.json' },
    ],
    strategy: 'no_prefix',
  },
})
// https://nuxt.com/docs/api/configuration/nuxt-config
