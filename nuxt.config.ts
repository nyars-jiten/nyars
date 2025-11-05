import { env } from 'node:process'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  debug: env.NODE_ENV === 'development',
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  devServer: {
    host: '127.0.0.1',
    port: 8090,
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
    families: [
      {
        name: 'Noto Sans JP',
        subsets: ['japanese'],
      },
      {
        name: 'Exo 2',
        subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
      },
    ],
    defaults: {
      subsets: [],
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      styles: ['normal', 'italic'],
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
