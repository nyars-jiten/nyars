<script setup lang="ts">
const props = defineProps<{ value: number }>()

const { t } = useI18n()

const freq = computed(() => {
  if (props.value <= 1000)
    return Math.ceil(props.value / 100) * 100 // 567 -> 600
  if (props.value <= 9000)
    return Math.ceil(props.value / 1000) * 1000 // 5678 -> 6000
  if (props.value <= 30000)
    return `${Math.ceil(props.value / 1000)}k` // 24567 -> 25k
  return `${Math.ceil(props.value / 10000) * 10}k` // 35678 -> 40k
})

const text = computed(() => {
  if (props.value > 0) {
    return t('pages.search.frequency', [freq.value])
  }

  return t('pages.search.frequencyNoData')
})
</script>

<template>
  <UiBadge color="info" icon="ic:outline-equalizer" :text="text" />
</template>
