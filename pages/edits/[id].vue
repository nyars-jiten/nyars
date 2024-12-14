<script setup lang="ts">
// const { getEdits } = useApi(editRepository)
// const { data: edits } = await useLazyAsyncData(
//   'edits',
//   () => getEdits(),
//   {
//     default: (): EditResponse[] => [],
//   },
// )

definePageMeta({
  name: 'edit-page',
  path: '/edits/:id',
  layout: 'desktop',
})

const editId = useRoute('edit-page').params.id

useHead({
  title: `Правка ${editId}`,
})
</script>

<template>
  <div>
    Edit {{ editId }}
  </div>
</template>
