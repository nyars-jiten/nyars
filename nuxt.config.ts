// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    port: 8080
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    },
    rootId: 'nyars'
  },
  modules: ['@nuxtjs/eslint-module'],
  typescript: {
    strict: true,
    typeCheck: true,
    shim: false
  }
})
