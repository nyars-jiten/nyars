const colors = require('tailwindcss/colors')

const statusVariant1 = '#1d90b3' // New
const statusVariant2 = '#b31d1d' // Declined
const statusVariant3 = '#1db336' // Accepted
const statusVariant4 = '#b3b3b3' // Auto-accepted
const statusVariant5 = '#aa1db3' // Reverted

/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: ['./**/*.{vue,js,ts}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      // header: [
      //   '"Exo 2"',
      //   '"Noto Sans JP"',
      //   "'Sukima Gothic Regular'",
      //   "'BabelStone Han'",
      //   'Arial',
      //   'sans-serif'
      // ],
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

        'status-variant-1': statusVariant1,
        'status-variant-2': statusVariant2,
        'status-variant-3': statusVariant3,
        'status-variant-4': statusVariant4,
        'status-variant-5': statusVariant5,

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

// '"Kaisei Tokumin"',
