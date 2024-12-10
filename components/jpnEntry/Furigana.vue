<script setup lang="ts">
import type { Furigana, V2Tag } from '~/types/models/articles/jpn'

interface Props {
  furigana: Furigana
  preview?: boolean
}

const props = defineProps<Props>()

// TODO: заменить true на проверку N-тегов, что они есть
const sidebar = computed(() => props.furigana.tags.length > 0 || true)

const tags = {
  'ik': '🗿'
} as Record<V2Tag['engShort'], string>;

function tagOf(value: keyof typeof tags) {
  const result = tags[value.toLocaleLowerCase()];
  if (!result) {
    return value
  }

  return result
}

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

    <span class="inline-flex items-baseline gap-2 py-1" v-show="sidebar">
      <small
        v-for="(tag, tagIndex) of furigana.tags"
        :key="tagIndex"
        class="inline align-text-top text-sm text-fuchsia-700"
      >
        {{ tagOf(tag.engShort) }}
      </small>

      <small class="bg-orange-400 w-fit h-fit text-xs leading-none p-0.5 rounded-sm text-neutral-900 font-bold uppercase">
        n5
      </small>
    </span>
  </span>
</template>
