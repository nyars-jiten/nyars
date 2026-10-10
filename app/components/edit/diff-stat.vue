<script setup lang="ts">
// «+64 −0»: сколько символов добавлено и удалено
defineProps<{
  plus: number
  minus: number
}>()
</script>

<template>
  <span class="tabular-nums">
    <span class="font-bold text-strong">+{{ plus }}</span>
    {{ ' ' }}
    <span class="font-bold text-danger">−{{ minus }}</span>
  </span>
</template>
