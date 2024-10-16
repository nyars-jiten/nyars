<script lang="ts" setup>
const props = defineProps<{ value: number }>()

const freq = computed(() => {
  if (props.value === 0) {
    return '—'
  }

  return `${Math.ceil(props.value / 1000)}k` // ТОП {freq}k
})
</script>

<template>
  <span>
    {{ freq }}
  </span>
</template>
