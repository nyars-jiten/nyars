<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { type DeepReadonly } from 'vue'
import { useSearch } from '@/stores/search'
import { type ReadOnlyRequest } from '@/stores/search/types'
import { MessagesNames } from '@/locale/messages-names'

type Props = { tags: DeepReadonly<string[]> }

const props = defineProps<Props>()

const { searchResults } = useSearch()
const { t } = useI18n()

const tags = props.tags.map(function (full) {
  const [title, ...rest] = full.split('-')
  const value = rest.join('-')

  return { title, value, full }
})

async function search({ request }: ReadOnlyRequest) {
  return await searchResults({ request: `#${request}` })
}
</script>

<template>
  <div v-show="tags.length > 0" class="flex flex-wrap items-start gap-2">
    <button
      v-for="tag of tags"
      type="button"
      class="flex overflow-hidden whitespace-nowrap rounded-md border text-xs leading-6 hover:opacity-75"
      :class="[`border-tag-${tag.title}-500`]"
      @click="search({ request: tag.full })"
    >
      <span class="px-2 font-medium uppercase" :class="[`text-tag-${tag.title}-500`]">
        {{ t(`${MessagesNames.ArticleTagName}.${tag.title}.short`) }}
      </span>

      <span
        v-show="tag.value"
        class="border-l px-2 uppercase"
        :class="`border-tag-${tag.title}-500 text-tag-${tag.title}-500`"
      >
        {{ tag.value }}
      </span>
    </button>
  </div>
</template>
