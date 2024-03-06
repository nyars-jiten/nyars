<script setup lang="ts">
  interface Props {
    disabled: boolean
  }

  defineProps<Props>()
</script>

<template>
  <button
    type="button"
    :disabled="disabled"
    :class="`flex items-center gap-2 rounded-md px-3 py-1 capitalize
      ${disabled
        ? 'bg-ns-400 dark:bg-ns-700'
        : 'bg-ns-gray-100 dark:bg-ns-gray-700 hover:opacity-75'
    }`"
  >
    <slot></slot>
  </button>
</template>
