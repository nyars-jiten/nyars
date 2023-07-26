import vue from '@vitejs/plugin-vue'
import wasm from 'vite-plugin-wasm'
import router from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'

import locale from '@intlify/unplugin-vue-i18n/vite'
import components from 'unplugin-vue-components/vite'
import auto from 'unplugin-auto-import/vite'
import icons from 'unplugin-icons/vite'
import resolver from 'unplugin-icons/resolver'

import {
  VueUseComponentsResolver,
  HeadlessUiResolver,
  VueUseDirectiveResolver
} from 'unplugin-vue-components/resolvers'

import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url))
    }
  },
  build: {
    target: 'esnext'
  },
  server: {
    port: 8080,
    strictPort: true
  },
  plugins: [
    router({
      routesFolder: 'src/pages',
      dts: './src/typings/auto-router.d.ts'
    }),
    vue({
      script: {
        defineModel: true,
        propsDestructure: true
      }
    }),
    wasm(),
    icons({ autoInstall: true }),
    components({
      dts: './src/typings/auto-components.d.ts',
      resolvers: [
        VueUseComponentsResolver(),
        HeadlessUiResolver(),
        VueUseDirectiveResolver(),
        resolver({ prefix: '' })
      ]
    }),
    auto({
      imports: [
        'vue',
        {
          vue: ['defineModel']
        },
        VueRouterAutoImports,
        {
          'vue-router/auto': ['useLink']
        },
        'pinia',
        'vue-i18n',
        '@vueuse/core',
        '@vueuse/head'
      ],
      dts: './src/typings/auto-imports.d.ts'
    }),
    locale({
      compositionOnly: true,
      fullInstall: true
    })
  ]
})
