export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    port: 8080
  },
  app: {
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
