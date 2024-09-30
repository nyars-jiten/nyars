<script setup lang="ts">
const request = useSearchRequest()
const api = useJpnArticles()

const { data, execute } = useAsyncData(`search-${request.value}`, () => api.search(request.value, 0, 0), {
  lazy: true,
  dedupe: 'defer',
})

// TODO: debounce

watch(request, () => execute)

definePageMeta({
  layout: 'desktop',
})

const wid = ref(null as string | null)
const article = computed(() => data.value?.result.find(x => x.wid === wid.value))
</script>

<template>
  <div class="grid grow grid-cols-[1fr_2fr] gap-8">
    <section class="space-y-4">
      <template v-for="result of data?.result" :key="result.wid">
        <SearchResult :article="result" v-model="wid" />
      </template>
    </section>

    <UiBlock class="">
      <JpnEntry v-if="article" :jpn-entry="article" />
    </UiBlock>
  </div>
</template>
