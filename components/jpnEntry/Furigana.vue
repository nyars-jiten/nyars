<script setup lang="ts">
import type { Furigana } from '~/types/models/articles/jpn'

interface Props {
  furigana: Furigana
  preview?: boolean
}

defineProps<Props>()
</script>

<template>
  <span class="flex">
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
    <span class="space-x-2">
      <small
        v-for="(tag, tagIndex) of furigana.tags"
        :key="tagIndex"
        class="inline align-text-top text-sm italic text-fuchsia-700"
      >
        {{ tag.engShort }}
      </small>
    </span>
  </span>
</template>
