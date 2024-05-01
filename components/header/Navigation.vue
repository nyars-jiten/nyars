<script setup lang="ts">
  const { user } = storeToRefs(useUserStore())
</script>

<template>
  <ul
    class="hidden flex-wrap items-center justify-center gap-5 text-base dark:text-ns-gray-300 min-[705px]:flex [&>*]:duration-150 [&>*]:ease-in-out"
  >
    <li class="group relative">
      <NuxtLink :to="{name:'Edits'}" class="flex items-center [@media(hover:none)]:pointer-events-none">
        <span class="group-hover:text-ns-500">{{ $t('components.header.navigation[0].title') }}</span>
        <IconChevronDown class="!m-0 text-xl text-ns-gray-400 duration-[0.2s] ease-out group-hover:-rotate-180 group-hover:text-ns-500" />
      </NuxtLink>
      <div class="absolute left-1/2 ml-[-90px] hidden w-[180px] pt-2 group-hover:inline">
        <div class="flex flex-col gap-1 rounded-md border border-ns-gray-200 bg-white p-2 shadow-md dark:border-ns-gray-700 dark:bg-ns-gray-800">
          <NuxtLink :to="{name:'Edits'}" class="flex items-center justify-center rounded-md p-1 hover:bg-ns-gray-100 dark:hover:bg-ns-gray-700">
            <span>{{ $t('components.header.navigation[0].pages.edits') }}</span>
          </NuxtLink>
          <NuxtLink :to="{name: 'Statistics'}" class="flex items-center justify-center rounded-md p-1 hover:bg-ns-gray-100 dark:hover:bg-ns-gray-700">
            <span>{{ $t('components.header.navigation[0].pages.statistics') }}</span>
          </NuxtLink>
          <NuxtLink to="/" class="flex items-center justify-center rounded-md p-1 hover:bg-ns-gray-100 dark:hover:bg-ns-gray-700">
            <span>{{ $t('components.header.navigation[0].pages.documentation') }}</span>
          </NuxtLink>
          <NuxtLink to="/" class="flex items-center justify-center rounded-md p-1 hover:bg-ns-gray-100 dark:hover:bg-ns-gray-700">
            <span>{{ $t('components.header.navigation[0].pages.download') }}</span>
          </NuxtLink>
          <NuxtLink
            to="https://github.com/nyars-jiten/nyars/issues"
            class="flex items-center justify-center rounded-md p-1 hover:bg-ns-gray-100 dark:hover:bg-ns-gray-700"
            target="_blank"
            external
          >
            <span>{{ $t('components.header.navigation[0].pages.github') }}</span>
          </NuxtLink>
        </div>
      </div>
    </li>
    <li class="group relative">
      <NuxtLink to="/" class="flex items-center [@media(hover:none)]:pointer-events-none">
        <span class="group-hover:text-ns-500">{{ $t('components.header.navigation[1].title') }}</span>
        <IconChevronDown class="!m-0 text-xl text-ns-gray-400 duration-[0.2s] ease-out group-hover:-rotate-180 group-hover:text-ns-500" />
      </NuxtLink>
      <div class="absolute left-1/2 ml-[-90px] hidden w-[180px] pt-2 group-hover:inline">
        <div class="flex flex-col gap-1 rounded-md border border-ns-gray-200 bg-white p-2 shadow-md dark:border-ns-gray-700 dark:bg-ns-gray-800">
          <NuxtLink to="/" class="flex items-center justify-center rounded-md p-1 hover:bg-ns-gray-100 dark:hover:bg-ns-gray-700">
            <span>{{ $t('components.header.navigation[1].pages.jpnEditor') }}</span>
          </NuxtLink>
          <NuxtLink to="/" class="flex items-center justify-center rounded-md p-1 hover:bg-ns-gray-100 dark:hover:bg-ns-gray-700">
            <span>{{ $t('components.header.navigation[1].pages.exampleEditor') }}</span>
          </NuxtLink>
          <NuxtLink to="/" class="flex items-center justify-center rounded-md p-1 hover:bg-ns-gray-100 dark:hover:bg-ns-gray-700">
            <span>{{ $t('components.header.navigation[1].pages.kanjiEditor') }}</span>
          </NuxtLink>
        </div>
      </div>
    </li>
    <li v-if="user?.role === 'Admin'" class="group relative">
      <NuxtLink to="/" class="flex items-center [@media(hover:none)]:pointer-events-none">
        <span class="group-hover:text-ns-500">{{ $t('components.header.navigation[2].title') }}</span>
        <IconChevronDown class="!m-0 text-xl text-ns-gray-400 duration-[0.2s] ease-out group-hover:-rotate-180 group-hover:text-ns-500" />
      </NuxtLink>
      <div class="absolute left-1/2 ml-[-90px] hidden w-[180px] pt-2 group-hover:inline">
        <div class="flex flex-col gap-1 rounded-md border border-ns-gray-200 bg-white p-2 shadow-md dark:border-ns-gray-700 dark:bg-ns-gray-800">
          <NuxtLink to="/" class="flex items-center justify-center rounded-md p-1 hover:bg-ns-gray-100 dark:hover:bg-ns-gray-700">
            <span>{{ $t('components.header.navigation[2].pages.ocr') }}</span>
          </NuxtLink>
          <NuxtLink to="/" class="flex items-center justify-center rounded-md p-1 hover:bg-ns-gray-100 dark:hover:bg-ns-gray-700">
            <span>{{ $t('components.header.navigation[2].pages.tags') }}</span>
          </NuxtLink>
          <NuxtLink to="/" class="flex items-center justify-center rounded-md p-1 hover:bg-ns-gray-100 dark:hover:bg-ns-gray-700">
            <span>{{ $t('components.header.navigation[2].pages.fields') }}</span>
          </NuxtLink>
        </div>
      </div>
    </li>
  </ul>
</template>
