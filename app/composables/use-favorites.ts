// Избранные статьи. Пока бэкенд их не хранит — список живёт в localStorage этого браузера
// (см. docs/backend-entry.md). Читается после монтирования, чтобы SSR и клиент совпадали.
export function useFavorites() {
  const list = useLocalStorage<string[]>('nyars-favorites', [], { initOnMounted: true })

  const isFavorite = (wid: string) => list.value.includes(String(wid))

  function toggle(wid: string) {
    const id = String(wid)
    list.value = isFavorite(id) ? list.value.filter(item => item !== id) : [...list.value, id]
  }

  return { list, isFavorite, toggle }
}
