<script setup lang="ts">
import { type DeepReadonly } from 'vue'
import { type EntryJp } from '@/api/dictionary/jp/types'
import ViewMode from './the-article/ViewMode.vue'

import Words from './the-article/Words.vue'
import Description from './the-article/Description.vue'
import UserBar from './the-article/UserBar.vue'

type Props = { article: DeepReadonly<EntryJp>; standalone: boolean }

defineProps<Props>()

function getStatusStyles(article: DeepReadonly<EntryJp>) {
  if (article && article.isReviewed) {
    return []
  }

  return ['border-l-2', 'border-l-orange-500', 'dark:border-l-orange-500']
}
</script>

<template>
  <article
    class="select-text rounded border border-gray-100 bg-white p-8 shadow-md dark:border-gray-700 dark:bg-gray-800"
    :class="getStatusStyles(article)"
  >
    <ViewMode v-slot="{ state, toggle }">
      <Words
        :article="article"
        :standalone="standalone"
        class="mb-2 border-b border-gray-200 pb-2 dark:border-gray-700"
      />

      <Description :meanings="article.entry.meanings" :details="state || standalone" class="px-8" />

      <UserBar
        v-if="!standalone"
        :article="article"
        :toggle="toggle"
        :details="state"
        class="mt-2 border-t border-gray-200 px-8 py-2 dark:border-gray-700"
      />
    </ViewMode>
  </article>
</template>
