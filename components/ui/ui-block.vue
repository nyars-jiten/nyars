<script setup lang="ts">
import { tv, type VariantProps } from 'tailwind-variants'

withDefaults(defineProps<Props>(), {
  size: 'medium',
  hover: false,
  active: false,
})

defineSlots<{
  default: () => VNode[]
  footer: () => VNode[]
}>()

const size_ = tv({
  variants: {
    size: {
      small: 'p-2',
      medium: 'p-4',
      large: 'p-6',
    },
  },
})

const styles = tv({
  base: 'group/block rounded-md outline outline-1 outline-neutral-800 transition-colors',
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
  size?: VariantProps<typeof size_>['size']
  hover?: VariantProps<typeof styles>['hover']
  active?: VariantProps<typeof styles>['active']
}
</script>

<template>
  <section :class="styles({ hover, active })">
    <div :class="size_({ size })">
      <slot />
    </div>

    <footer v-if="$slots.footer" class="flex flex-wrap items-center border-t border-neutral-800 p-2 leading-none transition-colors" :class="{ 'group-hover/block:border-neutral-700': hover }">
      <slot name="footer" />
    </footer>
  </section>
</template>
