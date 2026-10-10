import { execSync } from 'node:child_process'
import process from 'node:process'
import tailwindcss from '@tailwindcss/vite'

// Сведения о сборке для подвала: хэш коммита и время сборки.
// В Docker/CI git может быть недоступен — тогда хэш берётся из GIT_SHA (build-arg) или GITHUB_SHA.
function gitSha() {
  const fromEnv = process.env.GIT_SHA || process.env.GITHUB_SHA
  if (fromEnv)
    return fromEnv
  try {
    return execSync('git rev-parse HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim()
  }
  catch {
    return ''
  }
}

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
    plugins: [tailwindcss()],
    server: {
      strictPort: true,
    },
  },
  nitro: {
    // Локальная разработка: браузер ходит в API через dev-сервер (тот же origin),
    // без CORS и без обращений к другому порту. Включается переменной NUXT_DEV_API_PROXY:
    //   NUXT_DEV_API_PROXY=http://127.0.0.1:3000
    //   NUXT_PUBLIC_API_URL=http://localhost:8080/_dev-api
    //   NUXT_PUBLIC_IMAGE_URL=http://localhost:8080   (картинки и аудио — /static/*)
    // Префиксы не /api, чтобы не перехватывать служебные маршруты Nuxt (/api/_nuxt_icon).
    devProxy: process.env.NUXT_DEV_API_PROXY
      ? {
          '/_dev-api': { target: `${process.env.NUXT_DEV_API_PROXY}/api`, changeOrigin: true },
          '/static': { target: `${process.env.NUXT_DEV_API_PROXY}/static`, changeOrigin: true },
        }
      : {},
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
      buildSha: gitSha(),
      buildTime: new Date().toISOString(),
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
      // шрифты нового дизайна (UI kit)
      {
        name: 'Manrope',
        subsets: ['latin', 'cyrillic'],
        weights: [400, 500, 600, 700, 800],
        styles: ['normal'],
        global: true,
      },
      {
        name: 'Zen Kaku Gothic New',
        subsets: ['japanese', 'latin', 'cyrillic'],
        weights: [400, 500, 700],
        styles: ['normal'],
        global: true,
      },
      {
        name: 'Zen Maru Gothic',
        subsets: ['japanese', 'latin'],
        weights: [500, 700],
        styles: ['normal'],
        global: true,
      },
      {
        name: 'Noto Serif',
        subsets: ['latin', 'cyrillic'],
        weights: [600],
        styles: ['normal'],
        global: true,
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
    // /ui-kit — витрина для разработки: в сборку (nuxt build) не попадает,
    // кроме случая NUXT_UI_KIT=1 — например, для тестового стенда
    (_, nuxt) => {
      if (nuxt.options.dev || process.env.NUXT_UI_KIT === '1')
        return
      nuxt.hook('pages:extend', (pages) => {
        const index = pages.findIndex(page => page.path === '/ui-kit')
        if (index !== -1)
          pages.splice(index, 1)
      })
    },
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
