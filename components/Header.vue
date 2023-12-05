<script setup lang="ts">
</script>

<template>
  <header class="sticky top-0 z-50 bg-white shadow-md dark:bg-ns-gray-800">
    <div class="container mx-auto flex max-w-4xl flex-row flex-wrap items-center justify-between py-5">
      <div class="flex">
        <div class="mr-8 border-r border-ns-gray-100 py-1 pr-8 dark:border-ns-gray-600">
          <NuxtLink
            to="/"
            class="flex h-10 w-10 items-center rounded-full bg-ns-logo-light bg-cover font-medium"
          />
        </div>
        <nav class="flex flex-wrap items-center justify-center gap-7 text-base dark:text-ns-gray-300 [&>*]:duration-150 [&>*]:ease-in-out">
          <NuxtLink to="/" class="hover:text-ns-500">
            {{ $t('components.header.home') }}
          </NuxtLink>

          <NuxtLink to="/edits" class="hover:text-ns-500">
            {{ $t('components.header.edits') }}
          </NuxtLink>

          <NuxtLink
            to="https://github.com/nyars-jiten/nyars/issues"
            class="hover:text-ns-500"
            target="_blank"
          >
            {{ $t('components.header.bugTracker') }}
          </NuxtLink>

          <NuxtLink to="/" class="hover:text-ns-500">
            {{ $t('components.header.download') }}
          </NuxtLink>
        </nav>
      </div>

      <div class="flex flex-wrap items-center justify-center gap-5 text-base"></div>
    </div>
  </header>
</template>
