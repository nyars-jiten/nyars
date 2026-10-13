<script setup lang="ts">
// Разбор фразы: слова запроса с чтением и начальной формой. Клик по слову ищет его.
// Токены приходят с бэкенда (tokens): searchable=false — знаки препинания, found=false — в словаре нет.
const props = defineProps<{
  tokens: readonly SearchToken[]
}>()

/** индекс выбранного слова; null — ищется вся фраза */
const selected = defineModel<number | null>({ default: null })

const HAS_KANJI = /[㐀-鿿豈-﫿]/

const items = computed(() => props.tokens.map((token) => {
  const furigana = token.furigana ?? []
  const surface = token.surface || furigana.map(p => p.word).join('')
  const reading = HAS_KANJI.test(surface) ? furigana.map(p => p.kana || p.word).join('') : ''
  return {
    surface,
    reading,
    base: token.base && token.base !== surface ? token.base : '',
    searchable: token.searchable !== false,
    found: token.found !== false,
  }
}))
</script>

<template>
  <section aria-label="Разбор фразы" class="rounded-panel bg-surf px-5 pt-3 pb-3.5 max-sm:px-3">
    <div lang="ja" class="flex flex-wrap items-end gap-y-0.5">
      <button
        v-for="(item, index) in items"
        :key="index"
        type="button"
        :disabled="!item.searchable || !item.found"
        :aria-pressed="selected === index"
        :title="item.searchable ? (item.found ? `Искать «${item.base || item.surface}»` : 'В словаре не найдено') : undefined"
        class="
          group relative inline-flex flex-col items-center gap-px rounded-ctl px-2 pt-1.5 pb-[7px] text-ink transition-colors
          enabled:cursor-pointer enabled:hover:bg-soft disabled:text-muted
          aria-pressed:bg-acc aria-pressed:text-onacc aria-pressed:hover:bg-acc
          focus-visible:outline-2 focus-visible:outline-strong
        "
        :class="item.searchable && !item.found && 'opacity-60'"
        @click="selected = selected === index ? null : index"
      >
        <span class="min-h-4 font-jm text-[11.5px] text-muted group-aria-pressed:text-onacc/85">{{ item.reading }}</span>
        <span class="font-jp text-[23px] leading-[1.15] font-bold">{{ item.surface }}</span>
        <span class="min-h-[15px] text-[11px] text-muted group-aria-pressed:text-onacc/85">
          <template v-if="item.base">← {{ item.base }}</template>
        </span>
      </button>
    </div>
  </section>
</template>
