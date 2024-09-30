<script setup lang="ts">
interface Props {
  jpnEntry: V2EntryJp
}

defineProps<Props>()

// const getStyles = () => {
//   if (props.jpnEntry.status.isUnconfirmed) {
//     return 'border-l-2 border-l-red-700 dark:border-l-red-700'
//   }
//   if (props.jpnEntry.status.isReviewed === false) {
//     return 'border-l-2 border-l-orange-500 dark:border-l-orange-500'
//   }
//   return ''
// }
</script>

<template>
  <article>
    <Words :jpn-entry="jpnEntry" class="mb-2 border-b border-ns-gray-200 pb-2 dark:border-ns-gray-700" />
    <Meanings :meanings="jpnEntry.meanings" class="px-2" />
  </article>
</template>
