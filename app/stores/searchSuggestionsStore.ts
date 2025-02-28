export const useSuggestionsStore = defineStore('suggestions', () => {
  const { searchQuery } = storeToRefs(useSearchStore())

  const { getSuggestions } = useSearchRepo()

  const state = useLazyAsyncData(
    'suggestions',
    () => getSuggestions(searchQuery.value),
    {
      default: (): string[] => [],
    },
  )

  watchDebounced(searchQuery, () => {
    return state.refresh()
  }, { debounce: 500 })

  return state
})
