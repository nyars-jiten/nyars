<script setup lang="ts">
  const headerStore = useHeaderStore()
  const { user } = storeToRefs(useUserStore())
</script>

<template>
  <div v-show="headerStore.showHamburgerMenu" class="flex flex-col gap-1 p-4">
    <div class="mb-2 ml-2 border-b border-ns-gray-300 pb-2 dark:border-ns-gray-600">
      <div class="flex items-center justify-start rounded-md p-1">
        <span class="text-neutral-500">{{ $t('components.header.navigation[0].title') }}</span>
        <IconChevronDown class="!m-0 text-xl text-neutral-500" />
      </div>
    </div>
    <div
      class="ml-2 flex flex-col border-l border-ns-gray-300 p-1 dark:border-ns-gray-600"
      @click="headerStore.closeHamburgerMenu"
    >
      <NuxtLink :to="{name:'Edits'}" class="flex items-center justify-center rounded-md p-2 hover:bg-ns-gray-100 dark:hover:bg-ns-gray-700">
        <span>{{ $t('components.header.navigation[0].pages.edits') }}</span>
      </NuxtLink>
      <NuxtLink to="/" class="flex items-center justify-center rounded-md p-2 hover:bg-ns-gray-100 dark:hover:bg-ns-gray-700">
        <span>{{ $t('components.header.navigation[0].pages.statistics') }}</span>
      </NuxtLink>
      <NuxtLink to="/" class="flex items-center justify-center rounded-md p-2 hover:bg-ns-gray-100 dark:hover:bg-ns-gray-700">
        <span>{{ $t('components.header.navigation[0].pages.documentation') }}</span>
      </NuxtLink>
      <NuxtLink to="/" class="flex items-center justify-center rounded-md p-2 hover:bg-ns-gray-100 dark:hover:bg-ns-gray-700">
        <span>{{ $t('components.header.navigation[0].pages.download') }}</span>
      </NuxtLink>
      <NuxtLink
        to="https://github.com/nyars-jiten/nyars/issues"
        class="flex items-center justify-center rounded-md p-2 hover:bg-ns-gray-100 dark:hover:bg-ns-gray-700"
        target="_blank"
        external
      >
        <span>{{ $t('components.header.navigation[0].pages.github') }}</span>
      </NuxtLink>
    </div>
    <div class="mb-2 ml-2 border-b border-ns-gray-300 pb-2 dark:border-ns-gray-600">
      <div class="flex items-center justify-start rounded-md p-1">
        <span class="text-neutral-500">{{ $t('components.header.navigation[1].title') }}</span>
        <IconChevronDown class="!m-0 text-xl text-neutral-500" />
      </div>
    </div>
    <div
      class="ml-2 flex flex-col border-l border-ns-gray-300 p-1 dark:border-ns-gray-600"
      @click="headerStore.closeHamburgerMenu"
    >
      <NuxtLink to="/" class="flex items-center justify-center rounded-md p-2 hover:bg-ns-gray-100 dark:hover:bg-ns-gray-700">
        <span>{{ $t('components.header.navigation[1].pages.jpnEditor') }}</span>
      </NuxtLink>
      <NuxtLink to="/" class="flex items-center justify-center rounded-md p-2 hover:bg-ns-gray-100 dark:hover:bg-ns-gray-700">
        <span>{{ $t('components.header.navigation[1].pages.exampleEditor') }}</span>
      </NuxtLink>
      <NuxtLink to="/" class="flex items-center justify-center rounded-md p-2 hover:bg-ns-gray-100 dark:hover:bg-ns-gray-700">
        <span>{{ $t('components.header.navigation[1].pages.kanjiEditor') }}</span>
      </NuxtLink>
    </div>
    <div v-if="user?.role === 'Admin'" class="mb-2 ml-2 border-b border-ns-gray-300 pb-2 dark:border-ns-gray-600">
      <div class="flex items-center justify-start rounded-md p-1">
        <span class="text-neutral-500">{{ $t('components.header.navigation[2].title') }}</span>
        <IconChevronDown class="!m-0 text-xl text-neutral-500" />
      </div>
    </div>
    <div
      v-if="user?.role === 'Admin'"
      class="ml-2 flex flex-col border-l border-ns-gray-300 p-1 dark:border-ns-gray-600"
      @click="headerStore.closeHamburgerMenu"
    >
      <NuxtLink to="/" class="flex items-center justify-center rounded-md p-2 hover:bg-ns-gray-100 dark:hover:bg-ns-gray-700">
        <span>{{ $t('components.header.navigation[2].pages.ocr') }}</span>
      </NuxtLink>
      <NuxtLink to="/" class="flex items-center justify-center rounded-md p-2 hover:bg-ns-gray-100 dark:hover:bg-ns-gray-700">
        <span>{{ $t('components.header.navigation[2].pages.tags') }}</span>
      </NuxtLink>
      <NuxtLink to="/" class="flex items-center justify-center rounded-md p-2 hover:bg-ns-gray-100 dark:hover:bg-ns-gray-700">
        <span>{{ $t('components.header.navigation[2].pages.fields') }}</span>
      </NuxtLink>
    </div>
  </div>
</template>
