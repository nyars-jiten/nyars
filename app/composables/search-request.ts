export function useRouteArticle() {
  const route = useRoute()

  const value = computed({
    set: (value: string) => {
      route.query.wid = value
    },
    get: () => {
      if (typeof route.query.wid !== 'string') {
        route.query.wid = ''
      }

      return route.query.wid
    },
  })

  return value
}
