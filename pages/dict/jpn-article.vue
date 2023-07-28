<script setup lang="ts">
import { computed, DeepReadonly, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import MinusIcon from 'vue-material-design-icons/Minus.vue'
import PlusIcon from 'vue-material-design-icons/Plus.vue'
import { api } from '@/api'
import { useJapSearch } from '@/stores/search/jpn'

import { type SatelliteList } from '@/api'
import { type EntryJp } from '@/api/dictionary/jp/types'
import { type ImageList } from '@/api/kotoba-rest'
import { type EditList } from '@/api/edits-rest/types/articles'

import ShortEditLine from '@/components/edits/short-edit-line.vue'
import Article from '@/components/search/jp/Article.vue'
import TheKanjis from '@/components/search/jp/the-article/the-kanjis.vue'
import Button from '@/components/generic-button.vue'
import { MessagesNames } from '@/locale/messages-names'

type Props = { standalone: boolean }

defineProps<Props>()

const route = useRoute()

const { t } = useI18n()

const { articleId } = route.params
if (typeof articleId !== 'string') {
  throw new TypeError('Bad component usage')
}

const { results } = useJapSearch()

type Content = {
  article: DeepReadonly<EntryJp>
  images: DeepReadonly<ImageList>
  edits: DeepReadonly<EditList>
  satellites: (DeepReadonly<SatelliteList[number]> & {
    title: Readonly<string>
    status: boolean
  })[]
}

const content = reactive<Content>({
  article: {
    wid: articleId,
    entry: {
      words: [],
      tags: [],
      meanings: [],
      externalEntry: ''
    },
    externalEntry: '',
    isReviewed: false,
    isUnconfirmed: false,
    kanjis: null,
    picturesId: 0
  },
  images: [],
  edits: [],
  satellites: []
})

const cached = results.result.find((e) => e.wid == articleId)
if (cached) {
  content.article = cached
}

async function update({ wid }: { wid: string }) {
  content.article = await api.dictionaryJpEntries({ wid })
}

async function updateImages({ wid }: { wid: string }) {
  content.images = await api.kotoba.entryImages({ wid })
}

async function updateEdits({ wid }: { wid: string }) {
  content.edits = await api.edits.byEntry({ wid })
}

async function updateSatellites({ wid }: { wid: string }) {
  const values = await api.satellites({ wid })
  content.satellites = values.map((e) => ({
    ...e,
    title: e.body.split(/\n/)[0],
    status: false
  }))
}

Promise.allSettled([
  update({ wid: articleId }),
  updateImages({ wid: articleId }),
  updateEdits({ wid: articleId }),
  updateSatellites({ wid: articleId })
])

const statuses = computed((_) => !content.satellites.every((e) => e.status))

function toggleStatus(satellite: { status: boolean }) {
  satellite.status = !satellite.status
}

function toggleAllStatuses() {
  const status = statuses.value
  for (const satellite of content.satellites) {
    satellite.status = status
  }
}
</script>

<template>
  <section class="flex flex-col gap-4">
    <Article :article="content.article" :standalone="standalone" />

    <TheKanjis v-if="content.article.kanjis" :kanjis="content.article.kanjis" />
    <div
      v-if="content.images.length > 0"
      class="flex flex-wrap gap-2 border border-gray-100 bg-white px-10 py-5 shadow-md dark:border-gray-600 md:rounded-md"
    >
      <img
        v-for="(image, ix) of content.images"
        :key="ix"
        :src="image.link"
        :alt="image.title"
        class="h-20 w-auto"
      />
    </div>

    <div
      v-show="content.satellites.length > 0"
      class="border border-gray-100 bg-white p-8 shadow-md dark:border-gray-700 dark:bg-gray-800 md:rounded-md"
    >
      <div class="pb-4">
        <Button @click="toggleAllStatuses">
          <template #default>
            {{ t(statuses ? MessagesNames.ShowMore2 : MessagesNames.ShowLess2) }}
          </template>

          <template #icon="{ size, class: c }">
            <Component :is="statuses ? PlusIcon : MinusIcon" :size="size" :class="c" />
          </template>
        </Button>
      </div>

      <div class="flex flex-col gap-4">
        <div
          v-for="satellite of content.satellites"
          :key="satellite.key"
          class="flex gap-4 rounded-md border border-gray-200 px-4 py-2 dark:border-gray-600"
        >
          <div class="contents" @click="toggleStatus(satellite)">
            <div v-show="!satellite.status" class="grow">
              {{ satellite.title }}
            </div>
            <div v-show="satellite.status" class="grow whitespace-pre-wrap">
              {{ satellite.body }}
            </div>
          </div>

          <div class="italic">
            {{ satellite.satellite.title }}
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="content.edits.length > 0"
      class="border border-gray-100 bg-white p-8 shadow-md dark:border-gray-700 dark:bg-gray-800 md:rounded-md"
    >
      <ShortEditLine
        v-for="value of content.edits"
        :key="value.id"
        :article="value"
        class="border-b border-gray-100 py-2 first:pt-0 last:border-none last:pb-0 dark:border-gray-700"
      />
    </div>
  </section>
</template>
