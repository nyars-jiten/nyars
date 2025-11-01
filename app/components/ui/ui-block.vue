<script setup lang="ts">
import type { VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

withDefaults(defineProps<Props>(), {
  hover: false,
  active: false,
})

defineSlots<{
  default: () => VNode[]
  footer: () => VNode[]
}>()

const styles = tv({
  base: 'group/block rounded-md outline m-px outline-neutral-800 transition-colors',
  variants: {
    hover: {
      true: 'hover:bg-neutral-800 hover:outline-neutral-700',
    },
    active: {
      true: 'bg-neutral-800 outline-neutral-700',
    },
  },
})

interface Props {
  hover?: VariantProps<typeof styles>['hover']
  active?: VariantProps<typeof styles>['active']
}
</script>

<template>
  <section :class="styles({ hover, active })">
    <slot />
  </section>
</template>
