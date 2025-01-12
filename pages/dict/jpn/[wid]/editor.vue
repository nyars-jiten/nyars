<script setup lang="ts">
const api = useJpnArticles()

const routeWid = useRoute('dict-jpn-wid').params.wid

const srcData = await useAsyncData(() => api.source(`${routeWid}`))

const disabled = computed(() => {
  return srcData.status.value !== 'success'
})

definePageMeta({
  layout: false,
  pageTransition: false,
})
</script>

<template>
  <JpnEditor v-if="srcData.data.value" :entry="srcData.data.value" :disabled="disabled" :wid="routeWid" />
</template>
