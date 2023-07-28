<script setup lang="ts">
type Props = { disabled: boolean }

defineProps<Props>()
</script>

<template>
  <button
    :disabled="disabled"
    :class="
      disabled
        ? 'bg-accent-400 dark:bg-accent-700'
        : 'bg-gray-100 dark:bg-gray-700 hover:opacity-75'
    "
    class="flex items-center gap-2 rounded-md px-3 py-1 capitalize"
  >
    <slot />
  </button>
</template>
