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
  <section v-if="user" class="flex gap-2">
    <img src="https://placehold.co/600x400" class="object-cover size-48 block rounded-full border border-neutral-800 hover:rotate-12 transition-transform ease-linear">

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
