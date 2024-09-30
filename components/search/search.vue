<script lang="ts" setup>
import { tv } from 'tailwind-variants'

const request = useSearchRequest()
// const mode = useSearchMode()

const button = tv({
  base: 'inline-flex items-center gap-2 rounded-md px-2 py-1.5 leading-none shadow-md outline-dashed outline-1 outline-zinc-800 transition-colors hover:bg-zinc-800 hover:text-zinc-400 hover:outline-transparent',
})

function search() {
  if (request.value.length) {
    return navigateTo({ name: 'search', query: { q: request.value } })
  }
}
</script>

<template>
  <div class="inline-flex w-full items-center gap-4">
    <div class="inline-flex items-center gap-2">
      <button type="button" :class="button()">
        <Icon name="ic:baseline-text-fields" size="1.5rem" />
        <span>mode</span>
      </button>
    </div>

    <section class="group relative inline-flex w-full flex-row gap-2 rounded-md bg-zinc-800 p-2 leading-none text-zinc-500 shadow-md outline outline-1 outline-zinc-700 transition-colors focus-within:bg-zinc-300 focus-within:text-zinc-900 focus-within:outline-none hover:bg-zinc-700 hover:text-zinc-300 hover:outline-transparent">
      <input v-model="request" type="text" class="w-full bg-transparent text-center focus:outline-none" spellcheck="false" autocomplete="off" @keydown.enter.prevent="search">
      <Icon name="ic:baseline-search" size="1.5rem" />

      <SearchSuggestions class="invisible group-focus-within:visible group-hover:visible" />
    </section>

    <div class="inline-flex items-center gap-2">
      <button type="button" :class="button()">
        <Icon name="ic:baseline-draw" size="1.5rem" />
        draw
      </button>
    </div>
  </div>
</template>
