import { exit } from 'node:process'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  devServer: {
    host: '127.0.0.1',
    port: 8080,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  compatibilityDate: '2024-09-22',
  app: {
    rootId: 'nyars',
    pageTransition: { name: 'page', mode: 'out-in' },
  },
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
    '@nuxtjs/i18n',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    'nuxt-svgo',
    'nuxt-typed-router',
    '@nuxt/icon',
    '@vee-validate/nuxt',
    '@vueuse/nuxt',
  ],
  icon: {
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
    strategy: 'no_prefix',
  },
  googleFonts: {
    families: {
      'Exo+2': {
        wght: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        italic: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      },
      'Noto+Sans+JP': {
        wght: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        italic: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      },
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
