<script lang="ts" setup>
import { faker } from '@faker-js/faker'

const request = useRouteSearchRequest()

const { data, refresh } = await useLazyAsyncData(`search-suggestions-${request.value}`, () =>
  Promise.resolve(
    Array.from({ length: faker.number.int({ max: 7 }) }).map(() => ({
      uuid: faker.string.uuid(),
      value: faker.lorem.sentence(),
    })),
  ), {
  server: false,
  default: () => [],
})

watchDebounced(request, (request) => {
  if (request.length < 3) {
    return Promise.resolve()
  }

  return refresh()
}, { debounce: 350 })
</script>

<template>
  <section v-if="data.length" class="absolute left-0 top-full z-10 w-full pt-4 leading-none text-zinc-300">
    <div class="rounded-md bg-zinc-800/50 p-2 shadow-md outline outline-1 outline-zinc-700 backdrop-blur-md">
      <button v-for="{ uuid, value }, index of data" :key="uuid" type="button" class="inline-flex w-full items-center gap-2 rounded-md px-4 py-1.5 text-start transition-colors hover:bg-zinc-900" @click="request = value">
        <div class="grow truncate">
          {{ value }}
        </div>

        <div class="rounded-md px-2 py-1 font-mono shadow-md outline-dashed outline-1 outline-zinc-700 transition-colors">
          {{ 1 + index }}
        </div>
      </button>
    </div>
  </section>
</template>
