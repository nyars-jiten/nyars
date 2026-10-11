<script setup lang="ts">
import { tv } from 'tailwind-variants'

withDefaults(defineProps<{
  tone?: 'accent' | 'danger' | 'neutral'
  /** контур вместо заливки */
  outline?: boolean
  /** xs 22 · sm 24 · md 26 */
  size?: 'xs' | 'sm' | 'md'
  icon?: string
}>(), {
  tone: 'accent',
  outline: false,
  size: 'sm',
})

const tag = tv({
  base: 'inline-flex items-center gap-[5px] rounded-tag px-[9px] text-[12.5px] leading-none whitespace-nowrap',
  variants: {
    tone: {
      accent: 'text-strong',
      danger: 'text-danger',
      neutral: 'text-ink',
    },
    outline: {
      true: 'bg-transparent shadow-[inset_0_0_0_1px_currentColor]',
    },
    size: {
      xs: 'h-[22px] px-2 text-xs font-semibold',
      sm: 'h-6 font-semibold',
      md: 'h-[26px] font-bold',
    },
  },
  compoundVariants: [
    { outline: false, tone: 'accent', class: 'bg-soft' },
    { outline: false, tone: 'danger', class: 'bg-danger-soft' },
    { outline: false, tone: 'neutral', class: 'bg-line/60' },
    { outline: true, tone: 'neutral', class: 'shadow-[inset_0_0_0_1px_var(--line)]' },
  ],
})
</script>

<template>
  <span :class="tag({ tone, outline, size })">
    <Icon v-if="icon" :name="icon" size="13px" class="shrink-0" />
    <slot />
  </span>
</template>
