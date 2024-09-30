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
      // All custom classes start with prefix "ns" (Nyars)
      backgroundImage: {
        'ns-logo-light': `url('/favicon-96x96.png')`,
        'ns-logo-dark': `url('/favicon-dark-96x96.png')`,
      },
      colors: {
        ns: {
          '100': '#e1edee',
          '200': '#c3dadd',
          '300': '#a6c8cd',
          '400': '#88b5bc',
          '500': '#6aa3ab',
          '600': '#558289',
          '700': '#406267',
          '800': '#2a4144',
          '900': '#152122',
          'gray': colors.zinc,
          'tag': {
            common: colors.gray,
            jyouyou: colors.slate,
            insatsu: colors.slate,
            jinmeiyou: colors.slate,
            jlpt: colors.amber,
            kanken: colors.pink,
            grade: colors.teal,
            shou: colors.teal,
            chuu: colors.amber,
            kou: colors.orange,
            kanon: colors.slate,
            souon: colors.slate,
            touon: colors.slate,
            goon: colors.slate,
            kanyoon: colors.slate,
            gai: colors.blue,
          },
          // See types/models/edit/editStatus
          'edit-status': {
            1: '#1d90b3', // New
            2: '#b31d1d', // Declined
            3: '#1db336', // Accepted
            4: '#b3b3b3', // Auto-accepted
            5: '#aa1db3', // Reverted
          },
          // See types/models/edit/editType
          'edit-type': {
            1: '#1db336', // Create
            2: '#1d90b3', // Edit
            3: '#b31d1d', // Delete
            4: '#a520c7', // Transfer
          },
        },
      },
    },
  },
} satisfies Config
