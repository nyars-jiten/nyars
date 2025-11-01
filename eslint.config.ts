import { env } from 'node:process'
import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(await antfu({
  rules: {
    'no-console': env.NODE_ENV === 'production' ? 'error' : 'off',
    'unicorn/filename-case': ['error', { case: 'kebabCase' }],
  },
}))
