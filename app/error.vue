<script lang="ts" setup>
defineProps<{
  error: Error
}>()
</script>

<template>
  <NuxtLayout>
    <div>
      {{ error }}
    </div>
    <NotFound />
  </NuxtLayout>
</template>
