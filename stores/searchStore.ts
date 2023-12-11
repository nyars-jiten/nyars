export const useSearchStore = defineStore('searchStore', () => {
  const mode = ref<'words'|'kanji'>('words')

  const searchQuery = ref('')

  return { mode, searchQuery }
})
