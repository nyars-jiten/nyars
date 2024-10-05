// export const useSearchRequest = createSharedComposable(() => ref(''))
export const useSearchRequest = createSharedComposable(() => useRouteQuery('q', '' as string))
export const useSearchRequest2 = createSharedComposable(() => useRouteQuery('wid', '' as string))
