<script setup lang="ts">
interface Props {
  text: string
}

defineProps<Props>()
</script>

<template>
  <span>{{ text }}</span>
</template>

<style scoped>
span::after {
  display: inline-block;
  animation: dotty steps(1,end) 1s infinite;
  content: '';
}
@keyframes dotty {
  0%   { content: ''; }
  25%  { content: '.'; }
  50%  { content: '..'; }
  75%  { content: '...'; }
  100% { content: ''; }
}
</style>
