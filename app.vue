<script setup lang="ts">
  const { data } = await useAsyncData('hints', () => {
    const strings = ['bruh', 'nihongo', 'nux']

    const randomIndex = Math.floor(Math.random() * strings.length)

    const randomString = strings[randomIndex]

    return Api.searchRepository.getSuggestions(randomString)
  })
</script>

<template>
  <div class="min-h-screen bg-black">
    <p class="text-white">
      {{ data }}
    </p>
  </div>
</template>
