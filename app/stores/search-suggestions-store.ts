import { useStorage } from '@vueuse/core'

export const useSuggestionsStore = defineStore('suggestions', () => {
  const { searchQuery } = storeToRefs(useSearchStore())

  const { getSuggestions } = useSearch()

  const history = useStorage('searchHistory', [] as string[])
  const listType = ref(0)

  const addToHistory = (value: string) => {
    history.value = [value, ...history.value]
    if (history.value.length > 10) {
      history.value = history.value.slice(0, 10)
    }
  }

  const suggestionsCache = ref(history.value)

  const refresh = async () => {
    const { data: response } = await getSuggestions(searchQuery.value)
    if (response.value) {
      suggestionsCache.value = response.value
    }
  }

  const suggestions = computed<string[]>(() => {
    if (searchQuery.value.length < 1) {
      listType.value = 0
      return history.value
    }
    listType.value = 1
    return suggestionsCache.value
  })

  watchDebounced(searchQuery, () => {
    return refresh()
  }, { debounce: 250 })

  return { suggestions, refresh, addToHistory, listType }
})
