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

// export const useSearchRequest = createGlobalState(() => {
//   const route = useRoute()
//   const request = ref(String(route.query.q ?? ''))
//   const watchParam = ref(request.value + Date.now())

//   function push(value?: string) {
//     request.value = value ?? request.value
//     watchParam.value = request.value + Date.now()
//     return navigateTo({ name: 'dict-jpn', query: { q: request.value } })
//   }

//   return { request, push, watchParam }
// })
