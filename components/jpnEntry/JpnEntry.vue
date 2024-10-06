<script setup lang="ts">
interface Props {
  jpnEntry: V2EntryJp
}

defineProps<Props>()
</script>

<template>
  <article>
    <!-- <div id="xxx" /> -->
    <!-- https://nuxt.com/docs/api/nuxt-config#router -->
    <!-- https://router.vuejs.org/api/interfaces/RouterOptions.html#scrollBehavior -->

    <Words :jpn-entry="jpnEntry" class="mb-2 border-b border-ns-gray-200 pb-2 dark:border-ns-gray-700" />
    <Meanings :meanings="jpnEntry.meanings" class="px-2" />
  </article>
</template>
