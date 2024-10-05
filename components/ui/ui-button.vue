<script lang="ts" setup>
import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

withDefaults(defineProps<Props>(), {
  type: 'button',
})

const button = tv({
  base: 'inline-flex items-center gap-2 rounded-md px-2 py-1.5 leading-none shadow-md outline-dashed outline-1 outline-zinc-800 transition-colors hover:bg-zinc-800 hover:text-zinc-400 hover:outline-transparent',
  variants: {
    color: {
      discord: 'text-discord',
      lime: 'text-lime-300',
      amber: 'text-amber-300',
    },

    active: {
      true: 'bg-neutral-900 text-neutral-800 outline-neutral-800',
    },
  },
})

type V = VariantProps<typeof button>

interface Props {
  type?: 'button' | 'submit'
  icon?: string
  color?: V['color']
  active?: V['active']
  title?: string
}
</script>

<template>
  <button :type="type" :class="button({ color, active })" :title="title">
    <Icon v-if="icon" :name="icon" size="1.5rem" />
    <slot />
  </button>
</template>
