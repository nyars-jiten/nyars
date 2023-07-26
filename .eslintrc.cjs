/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

/** @type {import('eslint/lib/shared/types').ConfigData} */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2023: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',

    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',

    'plugin:tailwindcss/recommended'
  ],
  plugins: ['tailwindcss'],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'linebreak-style': ['error', 'unix'],

    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  }
}
