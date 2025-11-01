<script setup lang="ts">
const props = defineProps<{ value: number }>()

const freq = computed(() => {
  if (props.value <= 1000)
    return Math.ceil(props.value / 100) * 100 // 567 -> 600
  if (props.value <= 9000)
    return Math.ceil(props.value / 1000) * 1000 // 5678 -> 6000
  if (props.value <= 30000)
    return `${Math.ceil(props.value / 1000)}k` // 24567 -> 25k
  return `${Math.ceil(props.value / 10000) * 10}k` // 35678 -> 40k
})
</script>

<template>
  <div class="inline-flex flex-wrap items-center gap-0.5 ">
    <Icon size="1.3rem" name="ic:outline-equalizer" class="text-sky-300/30" />

    <span class="text-xs uppercase ">
      {{ freq.toString() }}
    </span>
  </div>
</template>
