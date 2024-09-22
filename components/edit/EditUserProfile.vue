<script setup lang="ts">
  interface Props {
    user: User
  }

  defineProps<Props>()
</script>

<template>
  <span class="flex items-center gap-1.5">
    <img
      class="h-6 rounded-full object-center"
      :src="useAvatar(user.avatar).href"
      :alt="user.username"
    >
    <span class="inline-block max-w-36 truncate">
      {{ user.username }}
    </span>
  </span>
</template>
