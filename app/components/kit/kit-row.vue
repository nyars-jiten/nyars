<script setup lang="ts">
// Строка витрины: слева название и API, справа образцы
defineProps<{
  label: string
  code?: string
}>()
</script>

<template>
  <div class="grid grid-cols-[190px_minmax(0,1fr)] items-center gap-x-7 gap-y-2 border-t border-dashed border-line py-3.5 max-[760px]:grid-cols-1">
    <div class="flex flex-col gap-0.5 text-[13.5px] font-bold">
      {{ label }}
      <code v-if="code" class="font-mono text-xs text-muted">{{ code }}</code>
    </div>

    <div class="flex min-w-0 flex-wrap items-center gap-2.5">
      <slot />
    </div>
  </div>
</template>
