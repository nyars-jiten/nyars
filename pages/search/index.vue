<script setup lang="ts">
const request = useSearchRequest()
const api = useJpnArticles()

const { data, execute } = useAsyncData(`search-${request.value}`, () => api.search(request.value, 0, 0), {
  default: () => ({ result: [] }),
  lazy: true,
  dedupe: 'defer',
})

// TODO: debounce
watch(request, () => execute)

definePageMeta({
  layout: 'desktop',
})

const wid = useSearchRequest2()
const article = computed(() => data.value?.result.find(x => x.wid === wid.value))

watch(wid, () => window.scrollTo(0, 0))
</script>

<template>
  <div class="grid grow items-start gap-8 md:grid-cols-[1fr_2fr]">
    <section class="space-y-4">
      <template v-for="result of data?.result" :key="result.wid">
        <SearchResult :article="result" />
      </template>
    </section>

    <!-- <UiBlock> -->
    <div class="py-4">
      <JpnEntry v-if="article" :jpn-entry="article" />
    </div>
    <!-- </UiBlock> -->
  </div>
</template>
