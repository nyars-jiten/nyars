export function useRouteArticle() {
  const route = useRoute()
  
  if (typeof route.query.wid !== 'string') {
    route.query.wid = ''
  }

  return route.query.wid
}

export const useSearchRequest = createGlobalState(() => {
  const route = useRoute()
  const request = ref(String(route.query.q ?? ''))

  function push(value?: string) {
    request.value = value ?? request.value
    return navigateTo({ name: 'search', query: { q: request.value } })
  }

  return { request, push }
})
