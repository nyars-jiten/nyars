export const useSearchStore = defineStore('searchStore', () => {
  const mode = ref<'words'|'kanji'>('words')

  const searchQuery = ref('')

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

  return { mode, searchQuery, suggestionsCache, getSuggestions, setSuggestions }
})
