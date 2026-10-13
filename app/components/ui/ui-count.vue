<script setup lang="ts">
const props = withDefaults(defineProps<{
  value: number | string
  /** в капсуле — для кнопок и меню */
  pill?: boolean
}>(), {
  pill: false,
})

const formatter = new Intl.NumberFormat('ru-RU')
const text = computed(() => typeof props.value === 'number' ? formatter.format(props.value) : props.value)
</script>

<template>
  <span
    class="tabular-nums"
    :class="pill
      ? 'inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-soft px-1.5 text-xs font-extrabold text-strong'
      : 'text-[12.5px] font-semibold text-muted'"
  >{{ text }}</span>
</template>
