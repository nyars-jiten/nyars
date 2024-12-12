<script setup lang="ts">
definePageMeta({
  layout: 'desktop',
  name: 'user-profile',
  path: '/users/:username',
})

const username = useRoute('user-profile').params.username

const { clientGetUser } = useApi(userRepository)
const user = await clientGetUser(username)
</script>

<template>
  <div>
    User {{ user }}
  </div>
</template>
