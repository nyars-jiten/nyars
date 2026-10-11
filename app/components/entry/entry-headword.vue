<script setup lang="ts">
// Заглавное слово статьи: основная форма крупно (размер зависит от длины),
// ниже — другие написания и чтения через «・». Пометы форм — верхним индексом.
const props = defineProps<{
  forms: HeadwordForm[]
}>()

// JLPT показывается в боковой колонке рядом с частотностью, здесь — только пометы формы
const visibleTags = (form: HeadwordForm) => form.tags.filter(tag => !/^jlpt/i.test(tag.engShort))
const shown = computed(() => props.forms.map(form => ({ ...form, tags: visibleTags(form) })))
const main = computed(() => shown.value[0])
const others = computed(() => shown.value.slice(1))

const length = computed(() => Array.from(main.value?.text ?? '').length)
// на узком экране слово ужимается, чтобы помещаться в строку: не меньше 28px
const size = computed(() => {
  const max = headwordSize(main.value?.text ?? '')
  return `clamp(28px, calc((100vw - 32px) / ${Math.max(length.value, 1)}), ${max}px)`
})
const altSize = computed(() => length.value <= 6 ? '26px' : '20px')

const rt = (pair: FuriganaPair) => pair.kana && pair.kana !== pair.word ? pair.kana : ''
const tagTitle = (tag: Tag) => tag.rus || tag.rusShort
</script>

<template>
  <header v-if="main">
    <h1 lang="ja" class="hw m-0 normal-case" :style="{ fontSize: size }">
      <ruby v-for="(pair, i) in main.pairs" :key="i">{{ pair.word }}<rt>{{ rt(pair) }}</rt></ruby>
      <abbr
        v-for="tag in main.tags"
        :key="tag.id"
        lang="ru"
        :title="tagTitle(tag)"
        class="ml-[3px] inline-block align-super font-ui text-[11px] leading-none font-extrabold whitespace-nowrap text-danger no-underline"
      >{{ tag.rusShort }}</abbr>
    </h1>

    <p
      v-if="others.length"
      lang="ja"
      aria-label="Другие формы"
      class="m-0 mt-2.5 font-jp leading-[1.9] font-bold [overflow-wrap:anywhere] [&_rt]:font-jm [&_rt]:text-[.36em] [&_rt]:font-medium [&_rt]:text-muted"
      :style="{ fontSize: altSize }"
    >
      <span v-for="(form, f) in others" :key="f" class="inline-flex flex-wrap items-baseline">
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
