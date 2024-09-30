export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    // host: '0.0.0.0',
    port: 8080,
  },
  compatibilityDate: '2024-09-22',
  app: {
    rootId: 'nyars',
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  runtimeConfig: {
    public: {
      apiUrl: '',
      baseUrl: '',
      imageUrl: '',
      discordUrl: '',
    },
  },
  imports: {
    dirs: [
      'types/**',
      'utils/**',
    ],
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    'nuxt-svgo',
    'nuxt-lodash',
    '@vueuse/nuxt',
    'nuxt-typed-router',
    '@nuxt/icon',
  ],
  eslint: {
    config: {
      standalone: false,
    },
  },
  i18n: {
    vueI18n: './locale/i18n.config.ts',
    langDir: 'locale',
    defaultLocale: 'rus',
    locales: [{
      code: 'rus',
      file: 'rus.json',
    }],
    strategy: 'no_prefix',
    lazy: true,
    detectBrowserLanguage: {
      useCookie: false,
    },
  },
  googleFonts: {
    families: {
      'Exo+2': {
        wght: [400, 500, 600, 700, 800, 900],
      },
      'Noto+Sans+JP': true,
    },
    display: 'swap',
  },
  svgo: {
    componentPrefix: 'icon',
  },
  lodash: {
    prefix: 'useLodash',
  },
  typescript: {
    strict: true,
    typeCheck: true,
    shim: false,
  },
})
// https://nuxt.com/docs/api/configuration/nuxt-config
