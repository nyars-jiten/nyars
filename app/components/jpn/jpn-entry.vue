<script setup lang="ts">
interface Props {
  jpnEntry: EntryJp
  showLemmas: boolean
}

defineProps<Props>()
</script>

<template>
  <div class="hz-entry-body space-y-5">
    <Words :jpn-entry="jpnEntry" class="hz-entry-words" />
    <Meanings :meanings="jpnEntry.meanings" :show-lemmas="showLemmas" class="hz-entry-meanings" />
  </div>
</template>

<style scoped>
.hz-entry-words :deep(header),
.hz-entry-words :deep(.text-2xl) {
  font-size: clamp(1.75rem, 2.5vw + 1rem, 2.75rem);
  line-height: 1.2;
  font-family: 'Zen Old Mincho', 'Yu Mincho', serif;
}

.hz-entry-words :deep(.text-lg) {
  font-size: 1.125rem;
  font-family: 'Zen Maru Gothic', sans-serif;
}

.hz-entry-words :deep(rt) {
  font-size: 0.55em;
  font-family: 'Zen Maru Gothic', sans-serif;
}

.hz-entry-meanings {
  font-size: 1.05rem;
  line-height: 1.6;
}
</style>
