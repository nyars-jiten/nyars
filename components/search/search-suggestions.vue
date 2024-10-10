<script lang="ts" setup>
const props = defineProps<Props>()
const { request, push } = useSearchRequest()
const { getSuggestions } = useApi(searchRepository)

interface Props {
  data: string
}

const { data, refresh } = await useLazyAsyncData(
  'suggestions',
  () => getSuggestions(props.data),
  {
    default: (): string[] => [],
  },
)

watchDebounced(request, () => {
  // if (request.length < 3) {
  //   return Promise.resolve()
  // }

  return refresh()
}, { debounce: 500 })
</script>

<template>
  <section v-if="data && data.length" class="absolute left-0 top-full z-10 w-full pt-4 leading-none text-zinc-300">
    <div class="rounded-md bg-zinc-800/50 p-2 shadow-md outline outline-1 outline-zinc-700 backdrop-blur-md">
      <button v-for="val, index of data" :key="index" type="button" class="inline-flex w-full items-center gap-2 rounded-md px-4 py-1.5 text-start transition-colors hover:bg-zinc-900" @click="push(val)">
        <div class="grow truncate">
          {{ val }}
        </div>

        <div class="rounded-md px-2 py-1 font-mono shadow-md outline-dashed outline-1 outline-zinc-700 transition-colors">
          {{ 1 + index }}
        </div>
      </button>
    </div>
  </section>
</template>
