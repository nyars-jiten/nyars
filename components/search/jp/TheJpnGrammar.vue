<script setup lang="ts">
// import { storeToRefs } from '@pinia/nuxt'
import { useJapSearch } from '@/stores/search/jpn'

const { results } = storeToRefs(useJapSearch())
const { searchResults } = useJapSearch()
</script>

<template>
  <section
    v-show="results.info.parsedGrammar.length"
    class="rounded border border-gray-100 bg-white px-10 py-5 shadow-md dark:border-gray-700 dark:bg-gray-800"
  >
    <div class="flex flex-wrap gap-2 underline underline-offset-4">
      <button
        v-for="{ word } of results.info.parsedGrammar"
        class="select-text hover:opacity-75"
        type="button"
        @click="searchResults({ request: word })"
      >
        {{ word }}
      </button>
    </div>
  </section>
</template>
