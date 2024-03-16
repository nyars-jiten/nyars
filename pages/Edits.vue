<script setup lang="ts">
  const api = useApi()
  const { data: edits } = await useLazyAsyncData(
    'edits',
    () => api.editRepository.getEdits(),
    {
      default: (): Edit[] => []
    }
  )
  definePageMeta({
    name: 'Edits',
    path: '/edits'
  })

  useHead({
    title: 'Правки'
  })
</script>

<template>
  <section class="flex flex-col gap-2 border border-ns-gray-100 bg-white p-8 shadow-md dark:border-ns-gray-700 dark:bg-ns-gray-800 md:rounded-md">
    <Edit
      v-for="edit in edits"
      :key="edit.id"
      :edit="edit"
    />
  </section>
</template>
