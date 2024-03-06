<script setup lang="ts">
  interface Props {
    parsedWords: ParsedWord[]
  }

  defineProps<Props>()

  // const config = useRuntimeConfig()

  const searchStore = useSearchStore()

  const search = (word: string) => {
    searchStore.searchQuery = word
    navigateTo({ name: 'search-JpnEntries', query: { r: word } })
  }
</script>

<template>
  <section class="rounded border border-ns-gray-100 bg-white px-10 py-5 shadow-md dark:border-ns-gray-700 dark:bg-ns-gray-800">
    <div class="mb-1 flex flex-wrap gap-2 underline underline-offset-4">
      <button
        v-for="(parsedWord, index) of parsedWords"
        :key="index"
        type="button"
        class="select-text hover:opacity-75"
        @click="search(parsedWord.word)"
      >
        {{ parsedWord.word }}
      </button>
    </div>
    <!-- <p>
      Парсер запущен в тестовом режиме, могут быть ошибки и неточности.
      О багах пишите нам в
      <NuxtLink :to="config.public.discordUrl" external target="_blank" class="select-text text-indigo-600 underline decoration-dotted underline-offset-4 hover:text-ns-500 dark:text-indigo-300 dark:hover:text-ns-500">
        Discord
      </NuxtLink>
    </p> -->
  </section>
</template>
