<script setup lang="ts">
  interface Props {
    jpnEntry: JpnEntry
  }

  defineProps<Props>()
</script>

<template>
  <article :class="`select-text rounded border border-ns-gray-100 bg-white p-8 shadow-md dark:border-ns-gray-700 dark:bg-ns-gray-800 ${jpnEntry.isReviewed ? '': 'border-l-2 border-l-orange-500 dark:border-l-orange-500'}`">
    <Words :jpn-entry="jpnEntry" class="mb-2 border-b border-ns-gray-200 pb-2 dark:border-ns-gray-700" />
    <Meanings :meanings="jpnEntry.entry.meanings" class="px-2" />
  </article>
</template>
