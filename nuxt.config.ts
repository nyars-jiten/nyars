import colors from 'tailwindcss/colors'

export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    port: 8080
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    },
    rootId: 'nyars'
  },
  // pages: true, TODO: maybe is needed?
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', 'nuxt-headlessui', '@nuxtjs/i18n'],
  tailwindcss: {
    config: {
      darkMode: 'class',
      theme: {
        fontFamily: {
          body: [
            '"Exo 2"',
            '"Noto Sans JP"',
            "'Sukima Gothic Regular'",
            "'BabelStone Han'",
            'Arial',
            'sans-serif'
          ]
        },
        extend: {
          backgroundImage: {
            'logo-light': "url('/favicon-96x96.png')",
            'logo-dark': "url('/favicon-dark-96x96.png')"
          },
          colors: {
            accent: {
              100: '#e1edee',
              200: '#c3dadd',
              300: '#a6c8cd',
              400: '#88b5bc',
              500: '#6aa3ab',
              600: '#558289',
              700: '#406267',
              800: '#2a4144',
              900: '#152122'
            },

            gray: colors.zinc,

            'tag-common': colors.gray,
            'tag-jyouyou': colors.slate,
            'tag-insatsu': colors.slate,
            'tag-jinmeiyou': colors.slate,
            'tag-jlpt': colors.amber,
            'tag-kanken': colors.pink,
            'tag-grade': colors.teal,
            'tag-shou': colors.teal,
            'tag-chuu': colors.amber,
            'tag-kou': colors.orange,
            'tag-kanon': colors.slate,
            'tag-souon': colors.slate,
            'tag-touon': colors.slate,
            'tag-goon': colors.slate,
            'tag-kanyoon': colors.slate,
            'tag-gai': colors.blue,

            'status-variant-1': '#1d90b3', // New
            'status-variant-2': '#b31d1d', // Declined
            'status-variant-3': '#1db336', // Accepted
            'status-variant-4': '#b3b3b3', // Auto-accepted
            'status-variant-5': '#aa1db3', // Reverted

            'type-variant-1': '#1db336', // New
            'type-variant-2': '#1d90b3', // Edit
            'type-variant-3': '#b31d1d', // Delete
            'type-variant-4': '#a520c7', // Transfer
            'type-variant-5': '#aa1db3' // Reverted
          }
        }
      },
      plugins: [],
      safelist: [
        "before:content-['「']",
        "after:content-['」']",

        "before:content-['【']",
        "after:content-['】']",

        { pattern: /border-status-variant-/ },
        { pattern: /text-type-variant-/ },
        { pattern: /text-status-variant-/ },
        { pattern: /text-tag-/ },
        { pattern: /border-tag-/ }
      ]
    }
  },
  i18n: {
    locales: [{ code: 'ru', file: 'ru.json', name: 'Русский' }],
    defaultLocale: 'ru',
    langDir: 'locales',
    lazy: true,
    strategy: 'no_prefix'
  },
  pinia: {
    autoImports: ['defineStore', 'storeToRefs']
  },
  typescript: {
    strict: true
    // typeCheck: true; TODO: Uncomment after fix all errors
  }
})
