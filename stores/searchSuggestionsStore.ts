export const useSuggestionsStore = defineStore('suggestions', () => {
  const { request } = useSearchRequest()

  const { getSuggestions } = useSearchRepo()

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
