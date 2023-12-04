import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Exo 2"',
          '"Noto Sans JP"',
          ...defaultTheme.fontFamily.sans
        ]
      }
    }
  },
  plugins: []
}
