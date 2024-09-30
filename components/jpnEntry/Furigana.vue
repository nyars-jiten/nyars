<script setup lang="ts">
  interface Props {
    furigana: V2FuriganaPair[]
  }

  defineProps<Props>()
</script>

<template>
  <div>
    <span v-for="(pair,i) of furigana " :key="i">
      <span v-if="pair.kana.length === 0">{{ pair.word }}</span>
      <ruby v-else>{{ pair.word }}<rt class="select-none text-sm">{{ pair.kana }}</rt></ruby>
    </span>
  </div>
</template>
