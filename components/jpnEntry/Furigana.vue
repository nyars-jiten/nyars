<script setup lang="ts">
import type { Furigana, V2Tag } from '~/types/models/articles/jpn'

interface Props {
  furigana: Furigana
  preview?: boolean
}

const props = defineProps<Props>()

// TODO: заменить true на проверку N-тегов, что они есть
const sidebar = computed(() => props.furigana.tags.length > 0 || true)

const tagsMap = {
  'jlpt-n5': { name: 'n5', class: 'bg-green-400' },
  'jlpt-n4': { name: 'n4', class: 'bg-lime-400' },
  'jlpt-n3': { name: 'n3', class: 'bg-amber-400' },
  'jlpt-n2': { name: 'n2', class: 'bg-orange-400' },
  'jlpt-n1': { name: 'n1', class: 'bg-red-400' },
} as Record<V2Tag['engShort'], { name: string, class: string }>
</script>

<template>
  <span class="flex gap-1">
    <span class="flex flex-col items-center">
      <span>
        <span v-for="(pair, i) of furigana.pairs" :key="i" :class="{ 'bg-teal-800': furigana.isMarked }">
          <span>
            <span v-if="pair.kana.length === 0">{{ pair.word }}</span>
            <ruby v-else>{{ pair.word }}<rt class="select-none text-sm">{{ pair.kana }}</rt></ruby>
          </span>
        </span>
      </span>

      <span v-if="!preview" class="block text-sm text-gray-500">{{ furigana.transcription.rus }}</span>
      <span v-if="!preview && furigana.freq !== 0 && furigana.freq !== 100" class="block text-xs text-gray-500">{{ furigana.freq }}%</span>
    </span>

    <span v-show="sidebar" class="inline-flex items-baseline gap-2 py-1">

      <!-- Tags that doesn't exist in map -->
      <small
        v-for="(tag, tagIndex) of furigana.tags.filter(tag => !tagsMap[tag.engShort])"
        :key="tagIndex"
        class="inline align-text-top text-sm text-fuchsia-700"
      >
        {{ tag.engShort }}
      </small>

      <small
        v-for="(tag, tagIndex) of furigana.tags.filter(tag => tagsMap[tag.engShort])"
        :key="tagIndex"
        class="size-fit rounded-sm p-0.5 text-xs font-bold uppercase leading-none text-neutral-900"
        :class="tagsMap[tag.engShort].class"
      >
        {{ tagsMap[tag.engShort].name }}
      </small>
    </span>
  </span>
</template>
