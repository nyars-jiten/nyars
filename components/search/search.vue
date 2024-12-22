<script lang="ts" setup>
import { tv } from 'tailwind-variants'

const { request, push } = useSearchRequest()
</script>

<template>
  <div class="grid grid-cols-[auto_1fr_auto] items-center gap-4">
    <UiButton type="button" icon="ic:baseline-text-fields" />

    <section class="group relative inline-flex w-full flex-row gap-2 rounded-md bg-zinc-800 p-2 leading-none text-zinc-500 shadow-md outline outline-1 outline-zinc-700 transition-colors focus-within:outline-none hover:bg-zinc-700 hover:text-zinc-300 hover:outline-transparent">
      <input v-model="request" type="text" class="w-full bg-transparent text-center focus:outline-none" spellcheck="false" autocomplete="off" @keydown.enter.prevent="push()">
      <!-- <Icon name="ic:baseline-search" size="1.5rem" /> -->

      <SearchSuggestions :data="request" class="invisible group-focus-within:visible" />
    </section>

    <div class="grid grid-cols-2 gap-2">
      <UiButton type="button" icon="ic:baseline-draw" />

      <UiButton type="button">
        部
      </UiButton>
    </div>
  </div>
</template>
