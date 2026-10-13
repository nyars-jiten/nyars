<script setup lang="ts">
// Найденные страницы сканов бумажных словарей (раздел «Сканы» в поиске, dict=ocr)
defineProps<{
  pages: readonly OCRPageWithBook[]
  query: string
}>()
</script>

<template>
  <ul v-if="pages.length" class="m-0 list-none p-0">
    <li v-for="page in pages" :key="page.id" class="border-t border-line py-4 first:border-t-0">
      <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <NuxtLink :to="{ name: 'ocr-id', params: { id: page.id } }" lang="ja" class="hw text-2xl text-strong no-underline hover:underline">
          {{ page.word || page.title }}
        </NuxtLink>
        <span v-if="page.reading" lang="ja" class="font-jm text-muted">{{ page.reading }}</span>
        <UiTag size="xs" tone="neutral" outline>
          {{ page.prefix }}
        </UiTag>
        <span v-if="page.title && page.word" class="text-sm text-muted">{{ page.title }}</span>
      </div>
      <p v-if="page.meaningRu" class="m-0 mt-1.5">
        {{ page.meaningRu }}
      </p>
      <p v-else-if="page.meaningEn" class="m-0 mt-1.5">
        {{ page.meaningEn }}
      </p>
      <p v-else-if="page.rawLine" class="m-0 mt-1.5 font-jp text-sm text-muted">
        {{ page.rawLine }}
      </p>
      <Content v-if="page.description?.length" :data="page.description" :break-line="false" class="mt-1.5 text-sm text-muted" />
    </li>
  </ul>
  <p v-else class="m-0 text-muted">
    На сканах ничего не найдено<template v-if="query">
      по запросу «{{ query }}»
    </template>.
  </p>
</template>
