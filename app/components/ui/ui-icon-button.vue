<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import { tv } from 'tailwind-variants'

const props = withDefaults(defineProps<{
  /** подпись для скринридеров и всплывающая подсказка */
  label: string
  /** иконка Iconify, например tabler:chevron-right */
  icon?: string
  /** иероглиф вместо иконки: 筆, 部, 篩 */
  glyph?: string
  /** md 40 · sm 28 */
  size?: 'sm' | 'md'
  /** кнопка-переключатель: выставляет aria-pressed и подсвечивает */
  pressed?: boolean
  /** раскрывашка: выставляет aria-expanded и поворачивает иконку на 90° */
  expanded?: boolean
  to?: RouteLocationRaw
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}>(), {
  size: 'md',
  type: 'button',
  pressed: undefined,
  expanded: undefined,
  disabled: false,
})

const button = tv({
  base: [
    'inline-flex shrink-0 items-center justify-center rounded-ctl border-0 bg-transparent cursor-pointer',
    'transition-colors hover:bg-soft hover:text-strong aria-pressed:text-strong',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-strong',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  variants: {
    size: {
      md: 'size-10',
      sm: 'size-7',
    },
    glyph: {
      true: 'font-jp text-muted',
      false: 'text-ink',
    },
  },
  compoundVariants: [
    { glyph: true, size: 'md', class: 'text-[19px]' },
    { glyph: true, size: 'sm', class: 'text-[15px]' },
  ],
})

const NuxtLink = resolveComponent('NuxtLink')
</script>

<template>
  <component
    :is="props.to ? NuxtLink : 'button'"
    :class="button({ size, glyph: !!glyph })"
    :aria-label="label"
    :title="label"
    :aria-pressed="pressed"
    :aria-expanded="expanded"
    v-bind="props.to ? { to: props.to } : { type: props.type, disabled: props.disabled }"
  >
    <slot>
      <span v-if="glyph" aria-hidden="true">{{ glyph }}</span>

      <Icon
        v-else-if="icon"
        :name="icon"
        :size="size === 'md' ? '18px' : '14px'"
        class="transition-transform duration-150"
        :class="{ 'rotate-90': expanded }"
      />
    </slot>
  </component>
</template>
