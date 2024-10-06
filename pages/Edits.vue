<script setup lang="ts">
const { getEdits } = useApi(editRepository)
const { data: edits } = await useLazyAsyncData(
  'edits',
  () => getEdits(),
  {
    default: (): EditResponse[] => [],
  },
)

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
      :expanded="true"
    />
  </UiBlock>
</template>
