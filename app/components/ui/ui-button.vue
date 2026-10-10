<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import { tv } from 'tailwind-variants'

const props = withDefaults(defineProps<{
  variant?: 'default' | 'primary' | 'danger' | 'link'
  /** sm 34 · md 40 · lg 44 */
  size?: 'sm' | 'md' | 'lg'
  /** иконка слева (Iconify), например tabler:plus */
  icon?: string
  /** счётчик справа, например число активных фильтров */
  count?: number
  /** если задан — кнопка рендерится ссылкой */
  to?: RouteLocationRaw
  external?: boolean
  target?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}>(), {
  variant: 'default',
  size: 'md',
  type: 'button',
  disabled: false,
})

defineSlots<{
  default?: () => VNode[]
  /** своя иконка вместо icon, например иероглиф */
  icon?: () => VNode[]
}>()

const button = tv({
  base: [
    'inline-flex items-center justify-center gap-2 rounded-ctl border font-semibold whitespace-nowrap',
    'no-underline select-none cursor-pointer transition-[color,background-color,border-color,filter]',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-strong',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  variants: {
    variant: {
      default: 'border-line bg-surf text-ink hover:border-strong',
      primary: 'border-acc bg-acc text-onacc hover:brightness-[.96]',
      danger: 'border-line bg-surf text-danger hover:border-danger',
      link: 'border-transparent bg-transparent text-strong hover:bg-soft',
    },
    size: {
      sm: 'h-[34px] px-3 text-sm',
      md: 'h-10 px-4 text-sm',
      lg: 'h-11 px-[18px] text-[15px] font-bold',
    },
  },
  compoundVariants: [
    { variant: 'link', class: 'px-2' },
  ],
})

const NuxtLink = resolveComponent('NuxtLink')
</script>

<template>
  <component
    :is="props.to ? NuxtLink : 'button'"
    :class="button({ variant, size })"
    v-bind="props.to ? { to: props.to, external: props.external, target: props.target } : { type: props.type, disabled: props.disabled }"
  >
    <slot name="icon">
      <Icon v-if="icon" :name="icon" size="15px" class="shrink-0" />
    </slot>

    <slot />

    <UiCount v-if="count !== undefined" :value="count" pill />
  </component>
</template>
