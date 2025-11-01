export function useRouteArticle() {
  const route = useRoute()

  const value = computed(() => {
    const { wid } = route.params

    if (typeof wid !== 'string') {
      return ''
    }

    return wid.split('-')[0] ?? wid
  })

  return value
}
