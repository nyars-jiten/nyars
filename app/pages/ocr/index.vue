<script lang="ts" setup>
const { t } = useI18n()

const { getBooks, getNextPage } = useOcrRepo()
const books = ref([] as OCRBook[]) as Ref<OCRBook[]>

async function updateBooks() {
  books.value = await getBooks()
}

async function navigatePage(bookId: number) {
  try {
    const nextId = await getNextPage('', bookId, 0, 0)
    if (nextId) {
      await navigateTo({ name: 'ocr-id', params: { id: nextId.id ?? '' } })
    }
  }
  catch (e) {
    console.error(e)
  }
}

const { $reset: userReset } = useUserStore()
const { user } = storeToRefs(useUserStore())

onBeforeMount(() => {
  userReset() // update user state
  if (!user.value) {
    navigateTo('/users/login')
  }
})

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
      <div class="space-y-3">
        <div
          v-for="book in books"
          :key="book.id"
          class="flex items-start gap-3 p-2 border rounded-md border-neutral-800 cursor-pointer"
          @click="navigatePage(book.id)"
        >
          <span class="inline-flex items-center justify-center px-3 py-1 text-sm font-semibold rounded-md bg-emerald-700 text-white shadow-sm">
            {{ book.prefix }}
          </span>

          <div class="flex-1 min-w-0">
            <h3 class="text-base font-medium text-gray-900 dark:text-gray-100 truncate">
              {{ book.title }}
            </h3>
          </div>

          <div class="flex items-center gap-2 text-sm">
            <span class="text-gray-600">
              <span class="font-semibold text-emerald-400">{{ book.completedPages }}</span>
              <span class="mx-1">/</span>
              <span class="font-semibold text-indigo-300">{{ book.totalPages }}</span>
            </span>

            <div class="flex items-center gap-2">
              <div class="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  class="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all"
                  :style="{ width: `${(book.completedPages / book.totalPages * 100)}%` }"
                />
              </div>
              <span class="font-semibold text-emerald-400 min-w-[3.5rem] text-right">
                {{ (book.completedPages / book.totalPages * 100).toFixed(1) }}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>
