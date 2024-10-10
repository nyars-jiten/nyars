<script setup lang="ts">
import { tv, type VariantProps } from 'tailwind-variants'

withDefaults(defineProps<Props>(), {
  size: 'medium',
  hover: false,
  active: false,

  nonreviewed: false,
  unconfirmed: false,
  nonstd: false,
})

const styles = tv({
  base: 'rounded-md border-2 border-transparent p-4 shadow-md outline outline-1 outline-neutral-800 transition-colors',
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
    nonreviewed: {
      true: 'border-l-amber-700',
    },
    unconfirmed: {
      true: 'border-l-red-700',
    },
    nonstd: {
      true: 'border-l-fuchsia-500',
    },
  },
})

interface Props {
  size?: VariantProps<typeof styles>['size']
  hover?: VariantProps<typeof styles>['hover']
  active?: VariantProps<typeof styles>['active']

  // Article props
  nonreviewed?: VariantProps<typeof styles>['nonreviewed']
  unconfirmed?: VariantProps<typeof styles>['unconfirmed']
  nonstd?: VariantProps<typeof styles>['nonstd'] // archaic, dialect, proper
}
</script>

<template>
  <section :class="styles({ size, hover, active, nonreviewed, unconfirmed, nonstd })">
    <slot />
  </section>
</template>
