<script setup lang="ts">
// const { getEdits } = useEditRepo()
// const { data: edits } = getEdits()

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
