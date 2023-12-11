<template>
  <div class="min-h-screen select-none bg-gray-100 text-gray-700 dark:bg-ns-gray-900 dark:text-ns-gray-300">
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
.nuxt-icon svg {
  margin-bottom: 0;
}
</style>

<!--
  Nuxt-icon module has default CSS (see github) and I just have no idea why all of this don't work:
  1) <nuxt-icon class="[&_svg]:m-0" /> or [&>svg]:m-0 or [&_*]:m-0
  2) in assets/css/tailwind.css
  @layer base {
    .nuxt-icon svg {
      @apply m-0;
    }
  }
  only style tag in app.vue is working
-->
