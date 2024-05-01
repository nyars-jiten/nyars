import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig> {
  routes: (_routes) => {
    const routes = [
      {
        name: 'search-JpnEntries',
        path: '/s/jpn',
        component: () => import('~/pages/search/JpnEntries.vue').then((r) => r.default || r)
      },
      {
        name: 'search-KanjiEntries',
        path: '/s/kanji',
        component: () => import('~/pages/search/KanjiEntries.vue').then((r) => r.default || r)
      }
    ]
    return _routes.concat(routes)
  }
}
