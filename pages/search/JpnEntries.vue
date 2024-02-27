<script setup lang="ts">
  const route = useRoute()

  const requestQuery = computed(() => {
    return route.query.r as string
  })

  const searchStore = useSearchStore()
  const { mode, searchQuery } = storeToRefs(searchStore)

  mode.value = 'words'
  searchQuery.value = requestQuery.value

  const api = useApi()

  const { pending, data: jpnEntriesSearchResult } = await useLazyAsyncData(
    'jpnEntriesSearchResult',
    () => api.searchRepository.getJpnEntries(requestQuery.value),
    {
      watch: [requestQuery]
    }
  )
</script>

<template>
  <section v-if="!pending" class="flex flex-col gap-5">
    <LazyGrammarParser
      v-if="jpnEntriesSearchResult?.info.parsedGrammar.length"
      :parsed-words="jpnEntriesSearchResult?.info.parsedGrammar"
    />
    <TransitionGroup
      enter-active-class="duration-300 ease-out"
      enter-from-class="transform opacity-0 translate-x-3"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="duration-150 ease-in"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="transform opacity-0 translate-x-3"
      mode="out-in"
    >
      <JpnEntryPreview
        v-for="jpnEntry of jpnEntriesSearchResult?.result"
        :key="jpnEntry.wid"
        :jpn-entry="jpnEntry"
      />
    </TransitionGroup>
  </section>
</template>
