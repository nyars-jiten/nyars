<script setup lang="ts">
// Частотность статьи: пять точек и ранг (45, 3k). Меньше ранг — чаще слово.
const props = defineProps<{
  info: FrequencyInfo
}>()

const title = computed(() => `Ранг по частотности № ${props.info.rank.toLocaleString('ru-RU')} — ${props.info.label}`)
</script>

<template>
  <span
    class="inline-flex h-[22px] cursor-help items-center gap-1.5 rounded-tag pr-2 pl-[7px] text-xs font-semibold whitespace-nowrap text-ink tabular-nums shadow-[inset_0_0_0_1px_var(--line)]"
    :title="title"
  >
    <span class="inline-flex gap-0.5" aria-hidden="true">
      <i v-for="i in 5" :key="i" class="block size-[5px] rounded-full" :class="i <= info.level ? 'bg-strong' : 'bg-line'" />
    </span>
    {{ info.short }}
    <span class="sr-only">, {{ title }}</span>
  </span>
</template>
