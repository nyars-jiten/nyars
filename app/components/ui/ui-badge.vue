<script setup lang="ts">
import { tv } from 'tailwind-variants'

type BadgeColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'dict'
type BadgeSize = 'sm' | 'md' | 'lg'

defineProps<{
  icon?: string
  color?: BadgeColor
  size?: BadgeSize
  text?: string
  variant?: BadgeColor // alias for color
}>()

const badgeClasses = tv({
  base: 'inline-flex items-center rounded-md font-medium ring-1 ring-inset gap-2 uppercase whitespace-nowrap shrink-0 text-ellipsis overflow-hidden shadow',
  variants: {
    color: {
      primary: 'text-blue-300 bg-blue-300/30 ring-blue-300/30',
      secondary: 'text-gray-300 bg-gray-300/30 ring-gray-300/30',
      success: 'text-green-300 bg-green-300/30 ring-green-300/30',
      warning: 'text-amber-300 bg-amber-300/30 ring-amber-300/30',
      danger: 'text-red-300 bg-red-300/30 ring-red-300/30',
      info: 'text-sky-300 bg-sky-300/30 ring-sky-300/30',
      dict: 'text-indigo-300 bg-indigo-300/30 ring-indigo-300/30',
    },
    size: {
      sm: 'px-1.5 py-0.5 text-xs',
      md: 'px-2 py-1 text-xs',
      lg: 'px-2.5 py-1.5 text-sm',
    },
  },
  defaultVariants: {
    color: 'secondary',
    size: 'md',
  },
})
</script>

<template>
  <span :class="badgeClasses({ color: variant || color, size })">
    <Icon v-if="icon" :name="icon" size="1.2rem" />
    {{ text }}
    <slot />
  </span>
</template>
