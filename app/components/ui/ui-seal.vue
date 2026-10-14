<script setup lang="ts">
// Печать-иероглиф тона уведомления: 済 готово · 誤 ошибка · 注 внимание · 知 сведения · 待 ожидание.
// Декоративна: смысл несёт текст рядом, поэтому скрыта от скринридеров.
withDefaults(defineProps<{
  tone: UiToastTone
  /** sm 28 · md 36 */
  size?: 'sm' | 'md'
}>(), {
  size: 'md',
})
</script>

<template>
  <span
    :class="[
      toneSoft({ tone }),
      size === 'md' ? 'size-9 text-[19px]' : 'size-7 text-[15px]',
      tone === 'loading' && 'animate-pulse motion-reduce:animate-none',
    ]"
    class="inline-grid shrink-0 -rotate-4 place-items-center rounded-tag font-jp leading-none font-bold shadow-[inset_0_0_0_1.5px_color-mix(in_srgb,currentColor_55%,transparent)]"
    :title="TONE_LABEL[tone]"
    lang="ja"
    aria-hidden="true"
  >{{ TONE_GLYPH[tone] }}</span>
</template>
