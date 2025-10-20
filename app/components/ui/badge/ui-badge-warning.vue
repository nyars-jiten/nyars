<script setup lang="ts">
defineProps<{
  text?: string
}>()
</script>

<template>
  <UiBadge color="warning" icon="ic:baseline-warning-amber" :text="text" />
</template>
