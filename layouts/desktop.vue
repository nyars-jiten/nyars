<script lang="ts" setup>
</script>

<template>
  <div class="flex min-h-dvh flex-col space-y-8 p-4">
    <div class="flex items-center justify-between gap-x-4">
      <div class="">
        <img src="/favicon-dark-96x96.png" alt="logo" class="h-12 w-fit">
      </div>

      <Search class="w-1/2 max-xl:w-3/5 max-lg:w-3/4" />

      <div>
        <NuxtLink to="/login">
          login
        </NuxtLink>
      </div>
    </div>

    <div class="grid grow grid-cols-[auto_1fr] items-start gap-8 max-xl:gap-4">
      <LayoutMenu class="sticky inset-y-4" />

      <slot />
    </div>
  </div>
</template>
