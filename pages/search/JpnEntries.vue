<script setup lang="ts">
  const route = useRoute()

  const requestQuery = computed(() => {
    return route.query.r as string
  })

  const searchStore = useSearchStore()
  const { mode, searchQuery } = storeToRefs(searchStore)

  mode.value = 'words'
  searchQuery.value = requestQuery.value

  const { getJpnEntries } = useApi(searchRepository)

  const { pending, data: jpnEntriesSearchResult } = await useLazyAsyncData(
    'jpnEntriesSearchResult',
    () => getJpnEntries(requestQuery.value),
    {
      watch: [requestQuery]
    }
  )
</script>

<template>
  <div>
    <section v-if="!pending" class="flex flex-col gap-5">
      <LazyGrammarParser
        v-if="jpnEntriesSearchResult?.info.parsedGrammar.length"
        :parsed-words="jpnEntriesSearchResult?.info.parsedGrammar"
      />
      <JpnEntry
        v-for="jpnEntry of jpnEntriesSearchResult?.result"
        :key="jpnEntry.wid"
        :jpn-entry="jpnEntry"
      />
    </section>
  </div>
</template>
