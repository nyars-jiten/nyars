<script setup lang="ts">
// Найденные страницы сканов бумажных словарей (раздел «Сканы» в поиске)
defineProps<{
  pages: readonly OCRPageWithBook[]
}>()
</script>

<template>
  <ul class="m-0 list-none p-0">
    <li v-for="page in pages" :key="page.id" class="border-t border-line py-4 first:border-t-0">
      <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <NuxtLink :to="{ name: 'ocr-id', params: { id: page.id } }" lang="ja" class="hw text-2xl text-strong no-underline hover:underline">
          {{ page.word || page.title }}
        </NuxtLink>
        <span v-if="page.reading" lang="ja" class="font-jm text-muted">{{ page.reading }}</span>
        <UiTag size="xs" tone="neutral" outline>
          {{ page.prefix }}
        </UiTag>
      </div>
      <p v-if="page.meaningRu" class="m-0 mt-1.5">
        {{ page.meaningRu }}
      </p>
      <p v-else-if="page.rawLine" class="m-0 mt-1.5 font-jp text-sm text-muted">
        {{ page.rawLine }}
      </p>
    </li>
  </ul>
</template>
