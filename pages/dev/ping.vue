<script setup lang="ts">
const resTimeOrg = ref('')
const resTimeMoe = ref('')

async function fetchPing(url: string) {
  const tmsStart = new Date()
  await $fetch<string>(url)
  const tmsEnd = new Date()

  return Math.abs(tmsEnd.getTime() - tmsStart.getTime())
}

onMounted(async () => {
  const orgTime = await fetchPing('https://beta.nyars.org/api/ping')
  const moeTime = await fetchPing('http://beta.nyars.moe/api/ping')

  resTimeOrg.value = `${orgTime}ms`
  resTimeMoe.value = `${moeTime}ms`
})
</script>

<template>
  <section
    class="flex select-text flex-col gap-4 rounded-md border border-ns-gray-100 bg-white px-2 py-6 shadow-md dark:border-ns-gray-700 dark:bg-ns-gray-800 sm:px-5 md:px-8"
  >
    <div>nyars.org: {{ resTimeOrg }}</div>
    <div>nyars.moe: {{ resTimeMoe }}</div>
  </section>
</template>
