import { useStorage } from '@vueuse/core'

export const useSuggestionsStore = defineStore('suggestions', () => {
  const { searchQuery } = storeToRefs(useSearchStore())

  const { getSuggestions } = useSearch()

  const history = useStorage('searchHistory', [] as string[])
  const listType = ref(0)

  const addToHistory = (value: string) => {
    if (!value) {
      return
    }
    // без повторов: свежий запрос поднимается наверх
    history.value = [value, ...history.value.filter(item => item !== value)].slice(0, 10)
  }

  const removeFromHistory = (value: string) => {
    history.value = history.value.filter(item => item !== value)
  }

  const suggestionsCache = ref<string[]>([])
  let requestId = 0

  const refresh = async () => {
    const query = searchQuery.value
    if (!query)
      return
    const id = ++requestId
    const response = await getSuggestions(query)
    // ответ на более ранний запрос не должен перезаписать свежий
    if (response && id === requestId)
      suggestionsCache.value = response
  }

  const suggestions = computed<string[]>(() => {
    if (searchQuery.value.length < 1) {
      listType.value = 0
      return history.value
    }
    listType.value = 1
    // пока не пришли подсказки для нового текста, остаются прежние — список не мигает
    return suggestionsCache.value
  })

  watchDebounced(searchQuery, () => {
    return refresh()
  }, { debounce: 250 })

  return { suggestions, refresh, addToHistory, removeFromHistory, listType }
})
