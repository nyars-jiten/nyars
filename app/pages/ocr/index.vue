<script lang="ts" setup>
const { t } = useI18n()

const { getBooks } = useOcrData()
const { data: books } = getBooks()

// const { $reset: userReset } = useUserStore()
// const { user } = storeToRefs(useUserStore())

// onBeforeMount(() => {
//   userReset() // update user state
//   if (!user.value) {
//     navigateTo('/users/login')
//   }
// })
</script>

<template>
  <section class="space-y-16">
    <section class="space-y-4">
      <h1 class="text-center leading-16">
        {{ t('pages.ocr.title') }}
      </h1>

      <div class="grid grid-cols-[auto_1fr_auto_auto_auto_auto_auto] gap-4 items-center px-4">
        <template v-for="book, index in books" :key="book.id">
          <div class="text-end">
            <UiBadge :text="book.prefix" color="dict" />
          </div>

          <NuxtLink :to="{ name: 'ocr-id', query: { bookId: book.id }, params: { id: book.id } }" class="truncate hover:text-zinc-400 transition-colors">
            {{ book.title }}
          </NuxtLink>

          <span class="text-end text-lime-300">{{ useFormatNumber(book.completedPages) }}</span>
          <span class="text-end text-neutral-800 font-black">/</span>
          <span class="text-start">{{ useFormatNumber(book.totalPages) }}</span>

          <div class="w-24 h-2 bg-neutral-800 rounded-full overflow-hidden">
            <div
              class="h-full bg-indigo-300"
              :style="{ width: `${(book.completedPages / book.totalPages * 100)}%` }"
            />
          </div>

          <div class="text-end">
            {{ useFormatNumber((book.completedPages / book.totalPages * 100)) }}%
          </div>

          <hr v-if="index < (books?.length || 0) " class="border-neutral-800 col-span-full -mx-4">
        </template>
      </div>
    </section>
  </section>
</template>
