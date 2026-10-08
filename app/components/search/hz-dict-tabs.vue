<script setup lang="ts">
defineProps<{
  count: number
}>()

const tabs = [
  { id: 'jr', label: 'Японско-русский', enabled: true },
  { id: 'kanji', label: 'Кандзи', enabled: false },
  { id: 'rj', label: 'Русско-японский β', enabled: false },
  { id: 'sat', label: 'Спутники', enabled: false },
  { id: 'scans', label: 'Сканы', enabled: false },
] as const
</script>

<template>
  <nav
    aria-label="Словари"
    class="flex gap-1 overflow-x-auto border-b border-line pb-2.5"
  >
    <button
      v-for="tab in tabs"
      :key="tab.id"
      type="button"
      class="hz-tab"
      :class="{ 'hz-tab-on': tab.id === 'jr' }"
      :disabled="!tab.enabled"
      :title="tab.enabled ? undefined : 'скоро'"
      :aria-current="tab.id === 'jr' ? 'page' : undefined"
    >
      {{ tab.label }}
      <span v-if="tab.id === 'jr'" class="hz-tab-count">{{ count }}</span>
      <span v-else class="hz-tab-count">—</span>
    </button>
  </nav>
</template>
