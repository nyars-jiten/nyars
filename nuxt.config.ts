export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    port: 8080
  },
  app: {
    head: {
      title: 'НЯРС — электронный японско-русский словарь',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'msapplication-TileImage', content: '/ms-icon-144x144.png' }
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-icon-57x57.png' },
        { rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-icon-60x60.png' },
        { rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-icon-72x72.png' },
        { rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-icon-76x76.png' },
        { rel: 'apple-touch-icon', sizes: '114x114', href: '/apple-icon-114x114.png' },
        { rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-icon-120x120.png' },
        { rel: 'apple-touch-icon', sizes: '144x144', href: '/apple-icon-144x144.png' },
        { rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-icon-152x152.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-icon-180x180.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-icon-192x192.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'application/manifest+json', href: '/manifest.json' }
      ],
      noscript: [{ children: 'This app requires javascript to work' }],
      bodyAttrs: {
        class: 'min-h-screen select-none bg-ns-gray-100 text-ns-gray-700 dark:bg-ns-gray-900 dark:text-ns-gray-300'
      }
    },
    rootId: 'nyars',
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  runtimeConfig: {
    public: {
      apiUrl: 'https://beta.nyars.org/api',
      baseUrl: 'https://beta.nyars.org',
      imageUrl: 'https://next.nyars.org/upload/avatars/', // delete in prod
      discordUrl: 'https://discord.gg/u7H5nsPWVB'
    }
  },
  imports: {
    dirs: ['types/**']
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  hooks: {
    'pages:extend'(pages) {
      pages.push({
        name: 'search-JpnEntries',
        path: '/s/jpn',
        file: '~/pages/search/JpnEntries.vue'
      })
      pages.push({
        name: 'search-KanjiEntries',
        path: '/s/kanji',
        file: '~/pages/search/KanjiEntries.vue'
      })
    }
  },
  modules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    'nuxt-headlessui',
    'nuxt-svgo',
    'nuxt-lodash',
    '@vueuse/nuxt',
    '@nuxtjs/html-validator',
    'nuxt-typed-router'
  ],
  i18n: {
    vueI18n: './locale/i18n.config.ts',
    langDir: 'locale',
    defaultLocale: 'rus',
    locales: [{
      code: 'rus',
      file: 'rus.json'
    }],
    strategy: 'no_prefix',
    lazy: true
  },
  googleFonts: {
    families: {
      'Exo+2': {
        wght: [400, 500, 600, 700, 800, 900]
      },
      'Noto+Sans+JP': true
    },
    display: 'swap'
  },
  svgo: {
    componentPrefix: 'icon'
  },
  lodash: {
    prefix: 'useLodash'
  },
  typescript: {
    strict: true,
    typeCheck: true,
    shim: false
  }
})
// https://nuxt.com/docs/api/configuration/nuxt-config
