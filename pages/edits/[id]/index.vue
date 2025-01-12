<script setup lang="ts">
// const { getEdits } = useApi(editRepository)
// const { data: edits } = await useLazyAsyncData(
//   'edits',
//   () => getEdits(),
//   {
//     default: (): EditResponse[] => [],
//   },
// )

const editId = useRoute('edits-id').params.id

useHead({
  title: `Правка ${editId}`,
})
</script>

<template>
  <div>
    Edit {{ editId }}

    <NotImplemented />
  </div>
</template>
