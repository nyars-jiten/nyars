import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [],
  darkMode: 'class',
  theme: {
    extend: {
      transitionProperty: {
        // https://github.com/tailwindlabs/tailwindcss/pull/10604
        DEFAULT: [defaultTheme.transitionProperty.DEFAULT, 'outline-color'].join(', '),
        colors: [defaultTheme.transitionProperty.colors, 'outline-color'].join(', '),
      },
      fontFamily: {
        sans: [
          '"Exo 2"',
          '"Noto Sans JP"',
          ...defaultTheme.fontFamily.sans,
        ],
      },
    },
  },
} satisfies Config
