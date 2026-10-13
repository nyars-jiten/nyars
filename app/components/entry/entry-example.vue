<script setup lang="ts">
// Пример употребления: японская фраза и перевод под полосой акцента. Общий для статьи, поиска и главной.
defineProps<{
  sentence: Content[]
  translation: Content[]
}>()
</script>

<template>
  <p class="my-1 mb-1.5 border-l-2 border-acc/40 pl-2.5 text-sm leading-normal">
    <span lang="ja" class="font-jp text-lg"><Content :data="sentence" :break-line="false" /></span>
    <br>
    <span class="text-muted"><Content :data="translation" :break-line="false" /></span>
  </p>
</template>
