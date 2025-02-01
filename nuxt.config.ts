import { exit } from 'node:process'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  devServer: {
    host: '127.0.0.1',
    port: 8080,
  },
  css: ['~/assets/css/tailwind.css'],
  compatibilityDate: '2024-09-22',
  app: {
    rootId: 'nyars',
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  srcDir: 'app/',
  hooks: {
    /** @see https://github.com/nuxt/cli/issues/169 */
    close: () => {
      exit()
    },
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
      '../types/**/*',
      './stores/**/*',
      './utils/**/*',
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
    '@nuxtjs/i18n',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    'nuxt-svgo',
    'nuxt-typed-router',
    '@nuxt/icon',
    '@vee-validate/nuxt',
    '@vueuse/nuxt',
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
  veeValidate: {
    autoImports: true,
  },
  i18n: {
    vueI18n: './locale/i18n.config.ts',
    langDir: './locale/lang',
    strategy: 'no_prefix',
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
  typescript: {
    strict: true,
    typeCheck: true,
    shim: false,
  },
})
// https://nuxt.com/docs/api/configuration/nuxt-config
