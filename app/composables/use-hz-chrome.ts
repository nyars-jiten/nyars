export function useHzChrome() {
  const filtersOpen = useState('hz-filters-open', () => false)

  function openFilters() {
    filtersOpen.value = true
    if (import.meta.client) {
      nextTick(() => {
        document.getElementById('hz-filters')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }

  return { filtersOpen, openFilters }
}
