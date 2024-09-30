<script setup lang="ts">
interface Props {
  user: User
}

const props = defineProps<Props>()

const avatar = computed(() => useAvatar(props.user.avatar).href)
</script>

<template>
  <span class="flex items-center gap-1.5">
    <img
      class="h-6 rounded-full object-center"
      :src="avatar"
      :alt="user.username"
    >
    <span class="inline-block max-w-36 truncate">
      {{ user.username }}
    </span>
  </span>
</template>
