<script setup lang="ts">
interface Props {
  furigana: Furigana
  preview?: boolean
}

defineProps<Props>()
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
    </span>

  </span>

  <EntryHeaderTag class="align-text-top" :tags="furigana.tags" />
</template>
