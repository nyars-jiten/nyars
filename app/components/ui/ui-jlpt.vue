<script setup lang="ts">
import { tv } from 'tailwind-variants'

// Уровень JLPT. Вид (variant) в будущем станет пользовательской настройкой, см. docs/settings.md.
const props = withDefaults(defineProps<{
  /** N5…N1; допускается и просто цифра */
  level: string
  variant?: JlptStyle
  /** sup — индекс у слова · tag — отдельная метка с подписью «JLPT» */
  size?: 'sup' | 'tag'
}>(), {
  variant: 'palette',
  size: 'sup',
})

const digit = computed(() => /[1-5]/.exec(props.level)?.[0] ?? '')

const jlpt = tv({
  base: 'inline-block rounded-sm font-ui leading-none font-bold whitespace-nowrap no-underline',
  variants: {
    size: {
      sup: 'px-[3px] py-0.5 text-[10px]',
      tag: 'rounded-tag px-1.5 py-[3px] text-[11px]',
    },
    variant: {
      palette: '',
      // единственное исключение из «только токены»: прежняя яркая раскраска
      bright: 'text-neutral-900',
      accent: 'bg-soft text-strong',
      outline: 'text-muted shadow-[inset_0_0_0_1px_var(--line)]',
    },
    level: {
      1: '',
      2: '',
      3: '',
      4: '',
      5: '',
    },
  },
  compoundVariants: [
    { variant: 'palette', level: 5, class: 'bg-(--jlpt-5-bg) text-(--jlpt-5-fg)' },
    { variant: 'palette', level: 4, class: 'bg-(--jlpt-4-bg) text-(--jlpt-4-fg)' },
    { variant: 'palette', level: 3, class: 'bg-(--jlpt-3-bg) text-(--jlpt-3-fg)' },
    { variant: 'palette', level: 2, class: 'bg-(--jlpt-2-bg) text-(--jlpt-2-fg)' },
    { variant: 'palette', level: 1, class: 'bg-(--jlpt-1-bg) text-(--jlpt-1-fg)' },
    { variant: 'bright', level: 5, class: 'bg-green-400' },
    { variant: 'bright', level: 4, class: 'bg-lime-400' },
    { variant: 'bright', level: 3, class: 'bg-amber-400' },
    { variant: 'bright', level: 2, class: 'bg-orange-400' },
    { variant: 'bright', level: 1, class: 'bg-red-400' },
  ],
})
</script>

<template>
  <abbr v-if="digit" lang="en" :title="`JLPT N${digit}`" :class="jlpt({ size, variant, level: Number(digit) as 1 | 2 | 3 | 4 | 5 })">
    <template v-if="size === 'tag'">JLPT </template>N{{ digit }}
  </abbr>
</template>
