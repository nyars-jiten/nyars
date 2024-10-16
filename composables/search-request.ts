export function useRouteArticle() {
  const route = useRoute()
  return String(route.query.wid ?? '')
}

export function useSearchRequest() {
  const route = useRoute()
  const request = ref(String(route.query.q ?? ''))

  function push(value?: string) {
    request.value = value ?? request.value
    return navigateTo({ name: 'search', query: { q: request.value } })
  }

  return { request, push }
}
