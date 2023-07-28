<script setup lang="ts">
import { computed } from 'vue'

import { userTheme } from '@/utils/theme/theme-control'

const variants = {
  dark: 'bg-logo-dark',
  light: 'bg-logo-light'
}

const logo = computed(() => variants[userTheme.value])
</script>

<template>
  <header class="sticky top-0 z-50 bg-white shadow-md dark:bg-gray-800">
    <div
      class="container mx-auto flex max-w-4xl flex-row flex-wrap items-center justify-between py-5"
    >
      <div class="flex">
        <div class="mr-8 border-r border-gray-100 py-1 pr-8 dark:border-gray-600">
          <NuxtLink
            class="flex h-10 w-10 items-center rounded-full bg-cover font-medium"
            :class="logo"
            to="/"
          />
        </div>

        <nav
          class="flex flex-wrap items-center justify-center gap-7 text-sm uppercase leading-none dark:text-gray-300 [&>*]:duration-150 [&>*]:ease-in-out"
        >
          <NuxtLink to="/" class="hover:text-accent-500">
            {{ $t('header.home') }}
          </NuxtLink>

          <NuxtLink to="/edits" class="hover:text-accent-500">
            {{ $t('header.edits') }}
          </NuxtLink>

          <a
            href="https://github.com/nyars-jiten/nyars/issues"
            class="hover:text-accent-500"
            target="_blank"
          >
            {{ $t('header.bug_tracker') }}
          </a>

          <a href="#" class="hover:text-accent-500">
            {{ $t('header.download') }}
          </a>
        </nav>
      </div>

      <div class="flex flex-wrap items-center justify-center gap-5 text-base">
        <ThemeSwitcher ref="themeSwitcher" />
      </div>
    </div>
  </header>
</template>
