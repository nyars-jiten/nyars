<script setup lang="ts">
// const { getEdits } = useApi(editRepository)
// const { data: edits } = await useLazyAsyncData(
//   'edits',
//   () => getEdits(),
//   {
//     default: (): Edit[] => []
//   }
// )

const edits = [] as Edit[]

definePageMeta({
  name: 'Edits',
  path: '/edits',
  layout: 'desktop',
})

useHead({
  title: 'Правки',
})
</script>

<template>
  <UiBlock :active="true">
    <Edit
      v-for="edit in edits"
      :key="edit.id"
      :edit="edit"
    />
  </UiBlock>
</template>
