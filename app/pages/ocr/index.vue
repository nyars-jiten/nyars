<script lang="ts" setup>
const { t } = useI18n()

const { getBooks } = useOcrRepo()
const books = ref([] as OCRBook[]) as Ref<OCRBook[]>

async function updateBooks() {
  books.value = await getBooks()
}

await updateBooks()
</script>

<template>
  <section class="space-y-16">
    <section class="space-y-4">
      <div class="text-center leading-16">
        <h1>
          {{ t('pages.ocr.title') }}
        </h1>
      </div>
      <div>
        <div v-for="book in books" :key="book.id">
          [{{ book.prefix }}] {{ book.title }} ({{ book.completedPages }} / {{ book.totalPages }}) {{ (book.completedPages / book.totalPages * 100).toFixed(2) }}%
        </div>
      </div>
    </section>
  </section>
</template>
