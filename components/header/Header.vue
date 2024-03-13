<script setup lang="ts">
  const headerStore = useHeaderStore()
</script>

<template>
  <header :class="`sticky top-0 z-50 ${headerStore.showHamburgerMenu ? 'h-screen overflow-y-auto':''} bg-white px-2 shadow-md dark:bg-ns-gray-800`">
    <div class="mx-auto flex max-w-4xl flex-wrap items-center justify-between py-1">
      <div class="flex items-center gap-1 min-[705px]:gap-6">
        <div
          class="inline cursor-pointer rounded-md p-1.5 hover:bg-ns-gray-100 dark:hover:bg-ns-gray-700 min-[705px]:hidden"
          @click="headerStore.toggleHamburgerMenu"
        >
          <IconHamburgerMenu class="!m-0 text-2xl text-ns-gray-500 dark:text-ns-gray-300" />
        </div>
        <NuxtLink
          to="/"
          class="relative flex items-center gap-1.5 rounded-md p-1.5 after:absolute after:-right-2 after:h-5/6 after:border-r after:border-ns-gray-200 after:content-[''] hover:bg-ns-gray-100 after:dark:border-ns-gray-600 dark:hover:bg-ns-gray-700"
          @click="headerStore.closeHamburgerMenu"
        >
          <div class="size-9 rounded-full bg-ns-logo-light bg-cover dark:bg-ns-logo-dark"></div>
          <span class="text-xl leading-snug text-ns-500 dark:text-white">
            {{ $t('components.header.nyars') }}
          </span>
        </NuxtLink>
        <Navigation @click="headerStore.closeHamburgerMenu" />
      </div>
      <ProfileMenu @click="headerStore.closeHamburgerMenu" />
    </div>
    <HamburgerMenu />
  </header>
</template>
