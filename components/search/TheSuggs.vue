<script setup lang="ts">
// import { storeToRefs } from '@pinia/nuxt'
import { useRoute } from 'vue-router'
import { onBeforeMount, watch } from 'vue'
import { debounce, isEmpty } from 'lodash'

import { useSearch } from '@/stores/search'
import { useJapSearch } from '@/stores/search/jpn'
import { SearchType } from '@/api/types/search/search-type'

type Emits = { (event: 'onSelected'): void }

defineEmits<Emits>()

const { request, mode } = storeToRefs(useSearch())
const { searchSuggestions } = useSearch()

const { resetSuggestions } = useJapSearch()
const { suggestions } = storeToRefs(useJapSearch())

const search = debounce(searchSuggestions, 100)

async function update(request: string) {
  if (isEmpty(request)) {
    resetSuggestions()
    return
  }

  await search({ request })
}

async function onRequestChanged(request: string) {
  if (mode.value != SearchType.Jpn) {
    return
  }
  return await update(request)
}

async function onChanged(mode: SearchType) {
  if (mode != SearchType.Jpn) {
    return
  }

  return await update(request.value)
}

watch(mode, onChanged)
watch(request, onRequestChanged)

onBeforeMount(async () => {
  const { mode } = storeToRefs(useSearch())
  if (mode.value != SearchType.Jpn) {
    return
  }

  const { query } = useRoute()
  const { request } = query

  if (typeof request !== 'string') {
    return
  }

  await searchSuggestions({ request })
})
</script>

<template>
  <div
    v-show="mode == SearchType.Jpn"
    class="invisible absolute inset-x-0 top-[calc(100%)] z-10 overflow-hidden rounded-b-md bg-gray-100 shadow-xl hover:visible peer-focus:visible dark:bg-gray-700"
  >
    <button
      v-for="sugg of suggestions.values"
      type="button"
      class="block min-w-full border-t border-gray-300 px-4 py-2 text-left hover:bg-white dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
      @click="$emit('onSelected')"
    >
      {{ sugg }}
    </button>
  </div>
</template>
