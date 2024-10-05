<script setup lang="ts">
import { tv } from 'tailwind-variants'

const styles = tv({
  base: 'flex items-center justify-start gap-4 rounded-md px-2 py-1.5 leading-none transition-colors hover:bg-zinc-800 hover:text-zinc-400 max-xl:p-2  max-xl:[&>span:nth-child(2)]:hidden',
})
</script>

<template>
  <ul class="group space-y-4">
    <li class="space-y-2">
      <NuxtLink :to="{ name: 'Home' }" :class="styles()">
        <Icon size="1.5rem" name="ic:baseline-home" />
        <span>{{ $t('components.header.navigation[0].pages.home') }}</span>
      </NuxtLink>

      <NuxtLink :to="{ name: 'Edits' }" :class="styles()">
        <Icon size="1.5rem" name="ic:baseline-plus-minus-alt" />
        <span>{{ $t('components.header.navigation[0].pages.edits') }}</span>
      </NuxtLink>

      <NuxtLink :to="{ name: 'Statistics' }" :class="styles()">
        <Icon size="1.5rem" name="ic:baseline-auto-graph" />
        <span>{{ $t('components.header.navigation[0].pages.statistics') }}</span>
      </NuxtLink>

      <NuxtLink to="/" :class="styles()">
        <Icon size="1.5rem" name="ic:baseline-menu-book" />
        <span>{{ $t('components.header.navigation[0].pages.documentation') }}</span>
      </NuxtLink>
    </li>

    <li>
      <hr class="border-neutral-800">
    </li>

    <li class="space-y-1">
      <NuxtLink
        to="https://github.com/nyars-jiten/nyars/issues"
        :class="styles()"
        target="_blank"
        external
      >
        <Icon size="1.5rem" name="ic:baseline-bug-report" />
        <span>{{ $t('components.header.navigation[0].pages.github') }}</span>
      </NuxtLink>

      <NuxtLink to="/" :class="styles()">
        <Icon size="1.5rem" name="ic:baseline-cloud-download" />
        <span>{{ $t('components.header.navigation[0].pages.download') }}</span>
      </NuxtLink>
    </li>

    <li>
      <hr class="border-neutral-800">
    </li>

    <li class="space-y-1">
      <NuxtLink to="/jpn/editor" :class="styles()" class="text-lime-300 transition-colors xl:text-indigo-300">
        <Icon size="1.5rem" name="ic:baseline-plus" />

        <span class="text-xs font-semibold uppercase">
          {{ $t('components.header.navigation[1].pages.jpnEditor') }}
        </span>
      </NuxtLink>

      <NuxtLink to="/" :class="styles()" class="text-amber-300 transition-colors xl:text-indigo-300">
        <Icon size="1.5rem" name="ic:baseline-plus" />

        <span class="text-xs font-semibold uppercase">
          {{ $t('components.header.navigation[1].pages.exampleEditor') }}
        </span>
      </NuxtLink>

      <NuxtLink to="/" :class="styles()" class="text-rose-300 transition-colors xl:text-indigo-300">
        <Icon size="1.5rem" name="ic:baseline-plus" />

        <span class="text-xs font-semibold uppercase">
          {{ $t('components.header.navigation[1].pages.kanjiEditor') }}
        </span>
      </NuxtLink>
    </li>

    <li>
      <hr class="border-neutral-800">
    </li>

    <li class="space-y-1">
      <NuxtLink :to="{ name: 'jpn-wid', params: { wid: 0 } }" :class="styles()">
        <Icon size="1.5rem" name="uil:github" />
        <span>suda</span>
      </NuxtLink>
    </li>

    <!--
    <li v-show="user?.role" class="group relative space-y-1">
      <NuxtLink to="/" class="flex items-center [@media(hover:none)]:pointer-events-none">
        <span class="group-hover:text-ns-500">{{ $t('components.header.navigation[2].title') }}</span>
        <IconChevronDown class="!m-0 text-xl text-ns-gray-400 duration-[0.2s] ease-out group-hover:-rotate-180 group-hover:text-ns-500" />
      </NuxtLink>
      <div class="absolute left-1/2 ml-[-90px] hidden w-[180px] pt-2 group-hover:inline">
        <div class="flex flex-col gap-1 rounded-md border border-ns-gray-200 bg-white p-2 shadow-md dark:border-ns-gray-700 dark:bg-ns-gray-800">
          <NuxtLink to="/" :class="link()">
            <span>{{ $t('components.header.navigation[2].pages.ocr') }}</span>
          </NuxtLink>
          <NuxtLink to="/" :class="link()">
            <span>{{ $t('components.header.navigation[2].pages.tags') }}</span>
          </NuxtLink>
          <NuxtLink to="/" :class="link()">
            <span>{{ $t('components.header.navigation[2].pages.fields') }}</span>
          </NuxtLink>
        </div>
      </div>
    </li> -->
  </ul>
</template>
