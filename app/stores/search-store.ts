export const useSearchStore = defineStore('searchStore', () => {
  const mode = ref<'words' | 'kanji'>('words')

  const searchQuery = ref('')

  const currentSuggestion = ref(-1)

  const suggestionsCache = ref<Map<string, string[]>>(new Map().set('', []))

  const watchParam = ref(searchQuery.value + Date.now())

  function push(value?: string) {
    searchQuery.value = value ?? searchQuery.value
    watchParam.value = searchQuery.value + Date.now()
    return navigateTo({ name: 'dict-jpn', query: { q: searchQuery.value } })
  }

  const setSuggestions = async (searchQuery: string) => {
    if (suggestionsCache.value.size > 1_000) {
      suggestionsCache.value.clear()
      suggestionsCache.value.set('', [])
    }
    const { getSuggestions } = useSearch()
    const { data: response } = await getSuggestions(searchQuery)
    if (response.value) {
      suggestionsCache.value.set(searchQuery, response.value)
    }
  }

  const getSuggestions = computed(async () => {
    const cachedValue = suggestionsCache.value.get(searchQuery.value)
    if (cachedValue) {
      return cachedValue
    }
    await setSuggestions(searchQuery.value)
    return suggestionsCache.value.get(searchQuery.value) as string[]
  })

  const setCurrentSuggestion = async (action: 'up' | 'down' | 'reset') => {
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

  return { mode, push, watchParam, searchQuery, currentSuggestion, setCurrentSuggestion, suggestionsCache, getSuggestions, setSuggestions }
})
