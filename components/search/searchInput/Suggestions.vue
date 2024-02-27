<script setup lang="ts">
  const searchStore = useSearchStore()

  const { searchQuery, getSuggestions, currentSuggestion } = storeToRefs(searchStore)

  const debouncedQuery = refDebounced(searchQuery, 500)

  const { pending, data: suggestions } = await useLazyAsyncData(
    `${debouncedQuery.value}`,
    () => getSuggestions.value,
    {
      watch: [debouncedQuery]
    }
  )

  const search = async (suggestion: string) => {
    searchQuery.value = suggestion
    await navigateTo({ name: 'search-JpnEntries', query: { r: searchQuery.value } })
  }

  const getStyles = (index: number) => {
    if (currentSuggestion.value === index) {
      return 'block min-w-full border-t border-ns-gray-300 px-4 py-2 text-left bg-white dark:border-ns-gray-600 dark:bg-ns-gray-600'
    }
    return 'block min-w-full border-t border-ns-gray-300 px-4 py-2 text-left hover:bg-white dark:border-ns-gray-600 dark:bg-ns-gray-700 dark:hover:bg-ns-gray-600'
  }
</script>

<template>
  <div
    class="invisible absolute inset-x-0 top-[calc(100%)] z-10 overflow-hidden rounded-b-md bg-ns-gray-100 shadow-xl hover:visible peer-focus:visible dark:bg-ns-gray-700"
  >
    <div v-if="pending">
      <LineLoading />
    </div>
    <div v-else>
      <button
        v-for="(suggestion, index) of suggestions"
        :key="suggestion"
        type="button"
        :class="getStyles(index)"
        @click="search(suggestion)"
      >
        {{ suggestion }}
      </button>
    </div>
  </div>
</template>
