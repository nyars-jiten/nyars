<script setup lang="ts">
// Неопределённый индикатор загрузки: тонкая полоса с бегущим отрезком
defineProps<{
  /** подпись для скринридеров */
  label?: string
}>()
</script>

<template>
  <div role="progressbar" :aria-label="label ?? 'Загрузка'" aria-busy="true" class="relative h-0.5 w-full overflow-hidden rounded-full bg-soft">
    <div class="ui-progress-run absolute inset-y-0 w-1/3 rounded-full bg-strong" />
  </div>
</template>
