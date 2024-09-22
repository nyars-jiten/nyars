<script setup lang="ts">
  const userStore = useUserStore()

  await useAsyncData('initUser', userStore.initUser)
</script>

<template>
  <div class="min-h-screen select-none bg-ns-gray-100 text-ns-gray-700 dark:bg-ns-gray-900 dark:text-ns-gray-300">
    <Header />
    <div class="px-2">
      <section class="container mx-auto my-10 flex max-w-4xl flex-col gap-10 md:leading-relaxed">
        <SearchInput />
        <slot></slot>
      </section>
    </div>
  </div>
</template>
