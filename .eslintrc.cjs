module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2023: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest'
    // tsconfigRootDir: __dirname,
    // project: './tsconfig.json'
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'airbnb-base',
    // 'airbnb-typescript/base',
    '@nuxtjs/eslint-config-typescript',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',

    'plugin:tailwindcss/recommended'
  ],
  plugins: ['tailwindcss', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'linebreak-style': ['error', 'unix'],

    // turns off two ESLint core rules that are problematic with prettier
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',

    'no-bitwise': 'off',
    'vue/no-multiple-template-root': 'off',

    // temporary
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'no-return-await': 'off',

    'max-len': [
      'warn',
      {
        code: 120,
        ignoreComments: true,
        ignoreTemplateLiterals: true,
        ignoreStrings: true,
        ignoreUrls: true,
        ignoreRegExpLiterals: true
      }
    ],
    'import/no-extraneous-dependencies': 'off' // TODO: after delete 'import colors' in nuxt config delete this line
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  }
}
