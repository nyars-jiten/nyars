export const useRouteArticle = createSharedComposable(() => useRouteQuery('wid', null as null | string))

export const useSearchRequest = createGlobalState(() => {
  const route = useRoute()
  const request = ref(String(route.query.q ?? ''))

  function push(value?: string) {
    const q = value ?? request.value
    request.value = q
    return navigateTo({ name: 'search', query: { q } })
  }

  return { request, push }
})
