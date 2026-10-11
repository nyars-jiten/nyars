<script setup lang="ts">
// Сканы бумажных словарей, на которых найдена статья. Карточка: код и название словаря,
// вырезка статьи со скана, исправленный текст (или сырое распознавание с пометой «не исправлено»),
// кнопка «OCR» показывает исходное распознавание, карандаш ведёт к исправлению.
const props = defineProps<{
  pages: OCRPageWithBook[]
  pending?: boolean
}>()

const { ocrImageUrl } = useOcrUtils()
const { userAccess } = storeToRefs(useUserStore())

const items = computed(() => props.pages.map((page) => {
  const fixed = page.status === PageStatus.Completed
  const text = [page.word, page.reading, page.meaningRu || page.meaningEn].filter(Boolean).join(' ')
  return {
    page,
    image: page.file ? ocrImageUrl(page.prefix, page.file).href : '',
    fixed: fixed && Boolean(text),
    main: fixed && text ? text : page.rawLine || text,
    raw: page.rawLine,
  }
}))

const ocrOpen = ref<Record<string, boolean>>({})
// вырезки, которые не загрузились, — не показываем, чтобы не торчал alt-текст
const broken = ref<Record<string, boolean>>({})

const mini = 'inline-flex h-7 min-w-7 cursor-pointer items-center justify-center gap-[5px] rounded-ctl border border-line bg-transparent text-xs font-bold tracking-[.04em] text-muted no-underline transition-colors hover:border-strong hover:text-strong aria-pressed:border-strong aria-pressed:bg-soft aria-pressed:text-strong focus-visible:outline-2 focus-visible:outline-strong'
</script>

<template>
  <div>
    <div v-if="pending" class="h-40 animate-pulse rounded-panel bg-soft" aria-hidden="true" />

    <p v-else-if="!items.length" class="m-0 text-muted">
      Сканов для этой статьи нет: слово не найдено в оцифрованных словарях.
    </p>

    <div v-else class="flex flex-col gap-3">
      <article
        v-for="item in items"
        :key="item.page.id"
        class="flex flex-col gap-3 rounded-panel px-4 py-3.5 shadow-[inset_0_0_0_1px_var(--line)]"
        :aria-label="`Скан: ${item.page.title}`"
      >
        <p class="m-0 flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5 text-[13.5px]">
          <span v-if="item.page.prefix" class="font-mono text-xs font-bold text-muted">{{ item.page.prefix }}</span>
          <span class="font-semibold">{{ item.page.title }}</span>
        </p>

        <a v-if="item.image && !broken[item.page.id]" :href="item.image" target="_blank" rel="noopener" class="block max-w-full self-start">
          <img
            :src="item.image"
            :alt="`Вырезка статьи со скана: ${item.page.title}`"
            loading="lazy"
            class="block max-h-[220px] max-w-full rounded-[2px] bg-[#FDFCF8] object-contain object-left-top"
            @error="broken = { ...broken, [item.page.id]: true }"
          >
        </a>

        <div class="flex items-start gap-3">
          <p
            lang="ja"
            class="m-0 min-w-0 flex-1 [overflow-wrap:anywhere]"
            :class="item.fixed ? 'text-[15px] leading-[1.55]' : 'font-mono text-[13.5px] leading-[1.55] text-muted'"
          >
            {{ item.main }}
          </p>
          <div class="flex shrink-0 items-center gap-1.5">
            <UiTag v-if="!item.fixed" tone="neutral" outline size="xs" class="text-muted">
              не исправлено
            </UiTag>
            <button
              v-if="item.fixed && item.raw"
              type="button"
              :class="mini"
              class="px-[9px]"
              :aria-pressed="!!ocrOpen[item.page.id]"
              title="Исходное распознавание"
              @click="ocrOpen = { ...ocrOpen, [item.page.id]: !ocrOpen[item.page.id] }"
            >
              OCR
            </button>
            <NuxtLink
              v-if="userAccess.hasAccessOcr"
              :to="{ name: 'ocr-id', params: { id: item.page.id } }"
              :class="mini"
              class="w-[30px]"
              aria-label="Исправить распознавание"
              title="Исправить распознавание"
            >
              <Icon name="tabler:pencil" size="15px" />
            </NuxtLink>
          </div>
        </div>

        <p
          v-if="item.fixed && item.raw && ocrOpen[item.page.id]"
          lang="ja"
          class="m-0 rounded-ctl bg-line/35 px-3 py-2 font-mono text-[13px] [overflow-wrap:anywhere] text-muted"
        >
          <span lang="ru" class="mb-0.5 block font-ui text-[11px] font-extrabold tracking-[.08em] uppercase">Исходное распознавание</span>
          {{ item.raw }}
        </p>
      </article>
    </div>
  </div>
</template>
