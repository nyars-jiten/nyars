export const useSearchStore = defineStore('searchStore', () => {
  const mode = ref<'words' | 'kanji'>('words')

  const searchQuery = ref('')

  const watchParam = ref(searchQuery.value + Date.now())

  function push(value?: string) {
    searchQuery.value = value ?? searchQuery.value
    watchParam.value = searchQuery.value + Date.now()
    return navigateTo({ name: 'dict-jpn', query: { q: searchQuery.value } })
  }

  return { mode, push, watchParam, searchQuery }
})
