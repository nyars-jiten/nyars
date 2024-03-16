<script setup lang="ts">
  definePageMeta({
    name: 'Statistics',
    path: '/statistics'
  })

  useHead({
    title: 'Статистика'
  })
</script>

<template>
  <div>
    <UsersTable />
  </div>
</template>
