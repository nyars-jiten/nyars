<script setup lang="ts">
const route = useRoute()
const wid = useRoute('dict-jpn-wid').params.wid
const request = computed(() => String(route.query.q ?? ''))

const { search } = useJpnArticles()

const { data } = useAsyncData('search-request', () => search(request.value, 0, 0), {
  default: () => ({ result: [] }),
  dedupe: 'defer',
  watch: [request],
})

if (!wid && data?.value.result) {
  const first = data.value.result[0]
  if (first) {
    navigateTo({ name: 'dict-jpn-wid', params: { wid: first.wid }, query: { q: request.value } })
  }
}

definePageMeta({
  layout: false,
})
</script>

<template>
  <div>
    <!-- Эта страница показывается, пока в поиске не выбрал ни один результат -->
  </div>
</template>
