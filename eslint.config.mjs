import withNuxt from './.nuxt/eslint.config.mjs'
import eslint from '@eslint/js'
import globals from 'globals'
import vue from 'eslint-plugin-vue'
import ts from 'typescript-eslint'
import tailwind from 'eslint-plugin-tailwindcss'

export default withNuxt(
  [
    eslint.configs.recommended,
    ...ts.configs.strict,
    ...ts.configs.stylistic,
    ...vue.configs['flat/strongly-recommended'],
    ...tailwind.configs['flat/recommended'],
    {
      languageOptions: {
        globals: {
          ...globals.browser,
          ...globals.node
        },
        parser: vue.parser,
        parserOptions: {
          parser: ts.parser,
          project: './tsconfig.json',
          extraFileExtensions: ['.vue'],
          sourceType: 'module',
          ecmaVersion: 'latest'
        }
      },
      rules: {
        // Global
        '@stylistic/linebreak-style': ['error', 'unix'],
        // Vue.js
        'vue/script-indent': ['error', 2, {
          baseIndent: 1,
          switchCase: 1
        }],
        'vue/html-self-closing': ['error', {
          html: {
            void: 'never',
            normal: 'never',
            component: 'always'
          },
          svg: 'never',
          math: 'never'
        }],
        'vue/multi-word-component-names': 'off',
        'vue/padding-line-between-blocks': ['error', 'always'],
        'vue/block-order': ['error', {
          order: ['script', 'template', 'style']
        }],
        'vue/block-lang': ['error', {
          script: { lang: 'ts' }
        }],
        'vue/component-api-style': ['error', ['script-setup']],
        'vue/no-v-text': 'error',
        'vue/no-restricted-html-elements': [
          'error',
          {
            element: 'a',
            message: 'Use <NuxtLink> that a drop-in replacement for both Vue Router\'s <RouterLink> component and HTML\'s <a> tag'
          }
        ],
        'vue/max-attributes-per-line': ['error', {
          singleline: { max: 999 },
          multiline: { max: 1 }
        }]
      }
    },
    {
      files: ['**/*.vue'],
      rules: {
        '@stylistic/indent': 'off'
      }
    },
    {
      ignores: ['.nuxt/']
    }
  ]
)
  .override('nuxt/stylistic', {
    rules: {
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/no-mixed-operators': 'off',
      '@stylistic/comma-dangle': ['error', 'never'],
      '@stylistic/quote-props': ['error', 'as-needed']
    }
  })
