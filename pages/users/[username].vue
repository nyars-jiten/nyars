<script setup lang="ts">
const username = useRoute('users-username').params.username

const { clientGetUser } = useApi(userRepository)
const user = await clientGetUser(username)

const avatar = computed(() => useAvatar(user?.avatar ?? '').href)
</script>

<template>
  <section v-if="user" class="flex gap-2">
    <img :src="avatar" class="object-cover size-48 block rounded-full border border-neutral-800 hover:rotate-12 transition-transform ease-linear">

    <div>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl ">
          {{ user.username }}
        </h1>

        <i v-if="user.banned" class="text-xs">
          {{ user.banned }}
        </i>
      </div>
    </div>
  </section>
</template>
