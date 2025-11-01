<script setup lang="ts">
defineProps<{
  text?: string
}>()
</script>

<template>
  <UiBadge color="info" icon="ic:outline-info" :text="text" />
</template>
