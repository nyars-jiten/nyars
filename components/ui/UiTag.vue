<script setup lang="ts">
import { tv, type VariantProps } from 'tailwind-variants'

defineProps<Props>()

const styles = tv({
  base: 'inline rounded-xs p-0.5 px-1 uppercase leading-none',
  variants: {
    kind: {
      meaning: 'bg-lime-900 text-xs',
      sense: 'bg-green-900 text-xs',
      freq: 'bg-cyan-900 text-xs',
    },
  },
})

interface Props {
  kind: VariantProps<typeof styles>['kind']
}
</script>

<template>
  <section :class="styles({ kind })">
    <slot />
  </section>
</template>
