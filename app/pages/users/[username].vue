<script setup lang="ts">
const username = useRoute('users-username').params.username

const { clientGetUser } = useUserRepo()
const { data } = await clientGetUser(username)

const avatar = computed(() => useAvatar(data.value?.avatar ?? '').href)
</script>

<template>
  <section v-if="data" class="flex gap-2">
    <img :src="avatar" class="object-cover size-48 block rounded-full border border-neutral-800 hover:rotate-12 transition-transform ease-linear">

    <div>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl ">
          {{ data.username }}
        </h1>

        <i v-if="data.banned" class="text-xs">
          {{ data.banned }}
        </i>
      </div>
    </div>
  </section>
</template>
