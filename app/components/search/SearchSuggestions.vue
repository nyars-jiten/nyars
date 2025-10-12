<script lang="ts" setup>
const { suggestions, listType } = storeToRefs(useSuggestionsStore())
const { addToHistory } = useSuggestionsStore()
const { push } = useSearchStore()

function escapeVal(value: string) {
  return listType.value !== 0 && value.length > 0 && value[0] !== '"' ? `"${value}"` : value
}

function search(val: string) {
  const escaped = escapeVal(val)
  push(escaped)
  addToHistory(escaped)
}
</script>

<template>
  <section v-if="suggestions && suggestions.length" class="absolute left-0 top-full z-10 w-full pt-4 leading-none text-zinc-300">
    <div class="rounded-md bg-zinc-800/50 p-2 shadow-md outline-1 outline-zinc-700 backdrop-blur-md">
      <button
        v-for="val, index of suggestions"
        :key="index"
        type="button"
        class="inline-flex w-full items-center gap-2 rounded-md px-4 py-1.5 text-start transition-colors hover:bg-zinc-900"
        @click="search(val)"
      >
        <div class="grow truncate leading-6">
          {{ val }}
        </div>

        <div class="rounded-md px-2 py-1 font-mono shadow-md outline-dashed outline-1 outline-zinc-700 transition-colors">
          {{ 1 + index }}
        </div>
      </button>
    </div>
  </section>
</template>
