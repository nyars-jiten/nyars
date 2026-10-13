export const useSearchStore = defineStore('searchStore', () => {
  const mode = ref<'words' | 'kanji'>('words')

  const searchQuery = ref('')

  const watchParam = ref(searchQuery.value + Date.now())

  const { filters } = useSearchFilters()

  // новый запрос сохраняет выбранные фильтры, но сбрасывает токен и словарь
  function push(value?: string) {
    searchQuery.value = value ?? searchQuery.value
    watchParam.value = searchQuery.value + Date.now()
    return navigateTo({
      name: 'dict-jpn',
      query: serializeSearchQuery({ q: searchQuery.value, token: null, dict: 'jp', filters: filters.value }),
    })
  }

  return { mode, push, watchParam, searchQuery }
})
