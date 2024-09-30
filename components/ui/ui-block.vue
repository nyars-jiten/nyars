<script setup lang="ts">
import { tv, type VariantProps } from 'tailwind-variants'

withDefaults(defineProps<Props>(), {
  size: 'medium',
  hover: false,
  active: false,
})

const styles = tv({
  base: 'rounded-md p-4 shadow-md outline outline-1 outline-neutral-800 transition-colors',
  variants: {
    size: {
      small: 'p-2',
      medium: 'p-4',
      large: 'p-8',
    },
    hover: {
      true: 'hover:bg-neutral-800 hover:outline-neutral-700',
    },
    active: {
      true: 'bg-neutral-800 outline-neutral-700',
    },
  },
})

interface Props {
  size?: VariantProps<typeof styles>['size']
  hover?: VariantProps<typeof styles>['hover']
  active?: VariantProps<typeof styles>['active']
}
</script>

<template>
  <section :class="styles({ size, hover, active })">
    <slot />
  </section>
</template>
