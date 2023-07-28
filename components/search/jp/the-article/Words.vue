<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { DeepReadonly } from 'vue'
import { convert_to_kana as convert } from '@nyars-jiten/jp-transcript'

import { RoutesNames } from '@/router/routes-names'

import { type EntryJp } from '@/api/dictionary/jp/types'

import TheTags from '@/components/Tags.vue'
import { MessagesNames } from '@/locale/messages-names'

type Props = { standalone: boolean; article: DeepReadonly<EntryJp> }

defineProps<Props>()

const { t } = useI18n()
</script>

<template>
  <header class="flex items-start gap-4">
    <Component
      :is="standalone ? 'div' : 'RouterLink'"
      class="flex grow flex-col"
      :class="{ 'hover:text-accent-500': !standalone }"
      :to="{
        name: RoutesNames.DictJpArticle,
        params: { articleId: article.wid }
      }"
    >
      <div v-for="word of article.entry.words" class="font-header text-2xl">
        <ul
          v-show="word.writings.length > 0"
          class="inline before:text-gray-200 before:content-['【'] after:text-gray-200 after:content-['】'] dark:before:text-gray-700 dark:after:text-gray-700"
        >
          <li
            v-for="writing of word.writings"
            class="inline-flex flex-wrap items-baseline before:text-gray-200 after:text-gray-200 after:content-['・'] last:after:content-none dark:after:text-gray-700"
          >
            {{ writing.value }}

            <span
              v-for="tag of writing.tag?.values"
              class="inline align-text-bottom text-sm italic text-fuchsia-700"
            >
              {{ t(`${MessagesNames.ArticleTagName}.kinf.${tag}.short`) }}
            </span>
          </li>
        </ul>

        <ul class="inline">
          <li
            v-for="reading of word.readings"
            class="inline-flex flex-wrap items-baseline after:text-gray-200 after:content-['・'] last:after:content-none dark:after:text-gray-700"
          >
            {{ convert(reading.value) }}

            <span
              v-for="tag of reading.tag?.values"
              class="align-text-top text-sm italic text-fuchsia-700"
            >
              {{ t(`${MessagesNames.ArticleTagName}.rinf.${tag}.short`) }}
            </span>
          </li>
        </ul>
      </div>
    </Component>

    <TheTags :tags="article.entry.tags" />
  </header>
</template>
