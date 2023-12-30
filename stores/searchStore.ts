export const useSearchStore = defineStore('searchStore', () => {
  const mode = ref<'words'|'kanji'>('words')

  const searchQuery = ref('')

  const currentSuggestion = ref(-1)

  const setCurrentSuggestion = async (action: 'up'|'down'|'reset') => {
    if (action === 'reset') {
      currentSuggestion.value = -1
      return
    }

    const suggestionsLength = (await getSuggestions.value).length

    if (suggestionsLength === 0) {
      return
    }

    if (action === 'up' && currentSuggestion.value - 1 < 0) {
      currentSuggestion.value = suggestionsLength - 1
      return
    }
    if (action === 'down' && currentSuggestion.value + 1 === suggestionsLength) {
      currentSuggestion.value = 0
      return
    }

    if (action === 'up') {
      currentSuggestion.value--
      return
    }
    currentSuggestion.value++
  }

  const suggestionsCache = ref<Map<string, string[]>>(new Map().set('', []))

  const getSuggestions = computed(async () => {
    const cachedValue = suggestionsCache.value.get(searchQuery.value)
    if (cachedValue) {
      return cachedValue
    }
    await setSuggestions(searchQuery.value)
    return suggestionsCache.value.get(searchQuery.value) as string[]
  })

  const setSuggestions = async (searchQuery: string) => {
    if (suggestionsCache.value.size > 1_000) {
      suggestionsCache.value.clear()
      suggestionsCache.value.set('', [])
    }
    const api = useApi()
    const response = await api.searchRepository.getSuggestions(searchQuery)
    suggestionsCache.value.set(searchQuery, response)
  }

  return { mode, searchQuery, currentSuggestion, setCurrentSuggestion, suggestionsCache, getSuggestions, setSuggestions }
})
