<script setup lang="ts">
interface Props {
  jpnEntry: V2EntryJp
}

defineProps<Props>()
</script>

<template>
  <article>
    <Words :jpn-entry="jpnEntry" class="mb-2 border-b border-ns-gray-200 pb-2 dark:border-ns-gray-700" />
    <Meanings :meanings="jpnEntry.meanings" class="px-2" />
  </article>
</template>
