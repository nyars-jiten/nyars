<script setup lang="ts">
  interface Props {
    user: User
  }

  defineProps<Props>()
</script>

<template>
  <span class="flex items-center gap-2 leading-none">
    <img
      class="h-6 rounded-full shadow"
      :src="useAvatar(user.avatar).href"
      :alt="user.username"
    >
    <span class="whitespace-nowrap">
      {{ user.username }}
    </span>
  </span>
</template>
