<script setup lang="ts">
import type { Furigana } from '~/types/models/articles/jpn'

interface Props {
  furigana: Furigana
}

defineProps<Props>()
</script>

<template>
  <span>
    <span v-for="(pair, i) of furigana.pairs" :key="i" :class="{ 'bg-teal-800': furigana.isMarked }">
      <span>
        <span v-if="pair.kana.length === 0">{{ pair.word }}</span>
        <ruby v-else>{{ pair.word }}<rt class="select-none text-sm">{{ pair.kana }}</rt></ruby>
      </span>
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
