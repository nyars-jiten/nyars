<script setup lang="ts">
const { palette, palettes } = usePalette()

const options = palettes.map(p => ({ value: p.id, label: p.label }))
</script>

<template>
  <UiSegmented v-model="palette" :options="options" label="Тема" />
</template>
