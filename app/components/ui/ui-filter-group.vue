<script setup lang="ts">
// Группа в панели фильтров: линия сверху, подпись и содержимое
defineProps<{
  title: string
}>()
</script>

<template>
  <section class="border-t border-line py-4">
    <UiCaption>{{ title }}</UiCaption>
    <slot />
  </section>
</template>
