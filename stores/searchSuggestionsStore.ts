export const useSuggestionsStore = defineStore('suggestions', () => {
  const { request } = useSearchRequest()

  const { getSuggestions } = useApi(searchRepository)

  const state = useLazyAsyncData(
    'suggestions',
    () => getSuggestions(request.value),
    {
      default: (): string[] => [],
    },
  )

  watchDebounced(request, () => {
    return state.refresh()
  }, { debounce: 500 })

  return state
})
