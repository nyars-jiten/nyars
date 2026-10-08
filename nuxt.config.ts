import process from 'node:process'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  devtools: { enabled: process.env.NODE_ENV !== 'production' },
  sourcemap: {
    server: process.env.NODE_ENV !== 'production',
    client: process.env.NODE_ENV !== 'production',
  },
  css: ['~/assets/css/tailwind.css'],
  devServer: {
    host: '127.0.0.1',
    port: 8080,
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
    server: {
      strictPort: true,
    },
  },
  routeRules: {
    '/**': { isr: false },
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
      {
        name: 'Manrope',
        subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
        weights: [400, 500, 600, 700, 800],
      },
      {
        name: 'Zen Old Mincho',
        subsets: ['japanese', 'latin'],
        weights: [400, 700],
      },
      {
        name: 'Zen Maru Gothic',
        subsets: ['japanese', 'latin'],
        weights: [500, 700],
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
