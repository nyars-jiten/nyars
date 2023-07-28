<script setup lang="ts">
// import { storeToRefs } from '@pinia/nuxt'
import { onBeforeMount } from 'vue'

import { useSearch } from '@/stores/search'
import { useJapSearch } from '@/stores/search/jpn'
import { SearchType } from '@/api/types/search/search-type'

import TheJapGrammar from '@/components/search/jp/TheJpnGrammar.vue'
import JpArticle from '@/components/search/jp/Article.vue'

const { results } = storeToRefs(useJapSearch())

onBeforeMount(() => {
  const { mode } = storeToRefs(useSearch())
  mode.value = SearchType.Jpn
})
</script>

<template>
  <section class="flex flex-col gap-5">
    <TheJapGrammar />

    <TransitionGroup
      enter-active-class="duration-300 ease-out"
      enter-from-class="transform opacity-0 translate-x-3"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="duration-150 ease-in"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="transform opacity-0 translate-x-3"
      mode="out-in"
    >
      <JpArticle
        v-for="result of results.result"
        :key="result.wid"
        :article="result"
        :standalone="false"
      />
    </TransitionGroup>
  </section>
</template>
