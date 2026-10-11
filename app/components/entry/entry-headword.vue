<script setup lang="ts">
// Заглавное слово статьи. Все обычные написания и чтения — в основном заголовке через «・»
// (размер зависит от общей длины), редкие формы (редк., нестанд., устар. написания и чтения) —
// строкой ниже, мельче. Пометы форм — верхним индексом.
const props = defineProps<{
  forms: HeadwordForm[]
}>()

const groups = computed(() => splitHeadwordForms(props.forms))

// длина основной строки в знаках вместе с разделителями
const length = computed(() => {
  const text = groups.value.main.map(form => form.text).join('・')
  return Math.max(Array.from(text).length, 1)
})
// на узком экране заголовок ужимается, но не меньше 28px
const size = computed(() => {
  const text = groups.value.main.map(form => form.text).join('・')
  return `clamp(28px, calc((100vw - 32px) / ${length.value}), ${headwordSize(text)}px)`
})
const rareSize = computed(() => length.value <= 6 ? '26px' : '20px')

const rt = (pair: FuriganaPair) => pair.kana && pair.kana !== pair.word ? pair.kana : ''
const tagTitle = (tag: Tag) => tag.rus || tag.rusShort
</script>

<template>
  <header v-if="groups.main.length">
    <h1 lang="ja" class="hw m-0 normal-case" :style="{ fontSize: size }">
      <template v-for="(form, f) in groups.main" :key="f">
        <span v-if="f > 0" class="font-normal text-line" aria-hidden="true">・</span>
        <span class="whitespace-nowrap">
          <ruby v-for="(pair, i) in form.pairs" :key="i">{{ pair.word }}<rt>{{ rt(pair) }}</rt></ruby>
          <abbr
            v-for="tag in form.tags"
            :key="tag.id"
            lang="ru"
            :title="tagTitle(tag)"
            class="ml-[3px] inline-block align-super font-ui text-[11px] leading-none font-extrabold whitespace-nowrap text-danger no-underline"
          >{{ tag.rusShort }}</abbr>
        </span>
        <wbr>
      </template>
    </h1>

    <p
      v-if="groups.rare.length"
      lang="ja"
      class="m-0 mt-2.5 font-jp leading-[1.9] font-bold [overflow-wrap:anywhere] [&_rt]:font-jm [&_rt]:text-[.36em] [&_rt]:font-medium [&_rt]:text-muted"
      :style="{ fontSize: rareSize }"
    >
      <span class="sr-only" lang="ru">Редкие формы: </span>
      <span v-for="(form, f) in groups.rare" :key="f" class="inline-flex flex-wrap items-baseline">
        <span v-if="f > 0" class="px-1.5 font-normal text-line" aria-hidden="true">・</span>
        <span><ruby v-for="(pair, i) in form.pairs" :key="i">{{ pair.word }}<rt>{{ rt(pair) }}</rt></ruby></span>
        <abbr
          v-for="tag in form.tags"
          :key="tag.id"
          lang="ru"
          :title="tagTitle(tag)"
          class="ml-[3px] inline-block align-super font-ui text-[11px] leading-none font-extrabold whitespace-nowrap text-danger no-underline"
        >{{ tag.rusShort }}</abbr>
      </span>
    </p>
  </header>
</template>
