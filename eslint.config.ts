import { env } from 'node:process'
import antfu from '@antfu/eslint-config'
import tailwind from 'eslint-plugin-tailwindcss'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(antfu({
  rules: {
    // The code problem checked by this ESLint rule is automatically checked by the TypeScript compiler.
    // Thus, it is not recommended to turn on this rule in new TypeScript projects.
    // You only need to enable this rule if you prefer the ESLint error messages over the TypeScript compiler error messages.
    // (c) https://typescript-eslint.io/rules/no-redeclare/
    'ts/no-redeclare': 'off',

    'no-console': env.NODE_ENV === 'production' ? 'error' : 'off',
  },
}, ...tailwind.configs['flat/recommended']))
