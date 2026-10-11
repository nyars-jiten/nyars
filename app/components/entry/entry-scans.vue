<script setup lang="ts">
// Сканы бумажных словарей, на которых найдена статья: изображение строки и распознанный текст.
const props = defineProps<{
  pages: OCRPageWithBook[]
  pending?: boolean
}>()

const { ocrImageUrl } = useOcrUtils()
const { userAccess } = storeToRefs(useUserStore())

const items = computed(() => props.pages.map(page => ({
  page,
  image: page.file ? ocrImageUrl(page.prefix, page.file).href : '',
  text: [page.word, page.meaningRu, page.meaningEn].filter(Boolean).join(' '),
})))
</script>

<template>
  <div>
    <div v-if="pending" class="h-32 w-56 animate-pulse rounded-ctl bg-surf" aria-hidden="true" />

    <p v-else-if="!items.length" class="m-0 py-2 text-[14.5px] text-muted">
      Скан не найден.
    </p>

    <div v-else class="flex flex-col gap-6">
      <figure v-for="{ page, image, text } in items" :key="page.id" class="m-0 flex flex-wrap gap-[18px]">
        <a v-if="image" :href="image" target="_blank" rel="noopener" class="block max-w-full shrink-0 basis-[280px]">
          <img :src="image" :alt="`Скан: ${page.title}`" loading="lazy" class="block max-h-[360px] w-full rounded-ctl bg-surf object-contain object-top-left">
        </a>
        <figcaption class="min-w-0 flex-[1_1_280px] text-[15px]">
          <UiTag tone="neutral" outline size="xs" class="text-muted">
            {{ page.prefix ? `[${page.prefix}] ` : '' }}{{ page.title }}
          </UiTag>
          <p v-if="text" lang="ja" class="m-0 mt-2">
            {{ text }}
          </p>
          <p v-if="page.rawLine" lang="ja" class="m-0 mt-1 font-jp text-sm text-muted">
            {{ page.rawLine }}
          </p>
          <p v-if="userAccess.hasAccessOcr" class="m-0 mt-2.5 text-[13.5px]">
            <NuxtLink :to="{ name: 'ocr-id', params: { id: page.id } }" class="text-strong no-underline hover:underline hover:underline-offset-[3px]">
              Исправить распознавание
            </NuxtLink>
          </p>
        </figcaption>
      </figure>
    </div>
  </div>
</template>
