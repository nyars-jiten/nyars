export const useRouteSearchRequest = createSharedComposable(() => useRouteQuery('q', '' as string))
export const useRouteArticle = createSharedComposable(() => useRouteQuery('wid', null as null | string))
