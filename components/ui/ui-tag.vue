<script setup lang="ts">
import { tv, type VariantProps } from 'tailwind-variants'

defineProps<Props>()


const styles = tv({
  base: 'rounded-sm uppercase leading-none text-xs p-0.5 px-1 inline',
  variants: {
    kind: {
      'meaning': 'bg-lime-900',
      'sense': 'bg-green-900',
      'freq': 'bg-cyan-900'
    }
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
