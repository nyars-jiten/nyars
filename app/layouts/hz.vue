<script lang="ts" setup>
import { version } from '~~/package.json'

const { t } = useI18n()
</script>

<template>
  <div class="hz min-h-dvh bg-bg text-ink">
    <header class="mx-auto flex max-w-[1320px] flex-wrap items-center gap-x-6 gap-y-3.5 px-4 pt-4.5 pb-3.5 sm:px-8">
      <NuxtLink to="/" class="flex items-center gap-2.5 text-ink! no-underline! hover:no-underline!">
        <span class="hz-seal hz-jp size-9.5 text-[22px]">辞</span>
        <span class="text-[21px] font-extrabold tracking-tight">
          nyars
          <small class="align-top text-xs font-medium text-muted">v{{ version }}</small>
        </span>
      </NuxtLink>

      <HzSearchBar />

      <nav aria-label="Разделы" class="flex flex-wrap items-center gap-5 font-semibold">
        <NuxtLink :to="{ name: 'tags' }">
          {{ t('components.searchGroup.general.mode.kanji') }}
        </NuxtLink>
        <NuxtLink :to="{ name: 'edits' }">
          {{ t('components.header.navigation[0].pages.edits') }}
        </NuxtLink>
        <NuxtLink to="/downloads">
          {{ t('components.header.navigation[0].pages.download') }}
        </NuxtLink>
        <ProfileMenu />
      </nav>
    </header>

    <div class="mx-auto max-w-[1320px] px-4 pb-18 sm:px-8">
      <slot />
    </div>
  </div>
</template>
