<script lang="ts" setup>
import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

withDefaults(defineProps<Props>(), {
  type: 'button',
  disabled: false,
  outline: true,
})

const slots = defineSlots<{
  default: () => VNode[]
}>()

const button = tv({
  base: 'inline-flex items-center gap-2 rounded-md px-2 py-1.5 leading-none transition-colors',
  variants: {
    color: {
      discord: 'text-discord',
      lime: 'text-lime-300',
      amber: 'text-amber-300',
      delete: 'text-rose-400',
      edit: 'text-sky-400',
      sky: 'text-sky-300',
    },

    iconOnly: {
      true: 'justify-center',
    },

    outline: {
      true: 'shadow-md outline-1 outline-zinc-800',
      false: '',
    },

    active: {
      true: 'bg-zinc-900 text-zinc-800 outline-zinc-800',
    },

    disabled: {
      true: 'cursor-not-allowed text-zinc-700',
      false: 'hover:bg-zinc-800 hover:text-zinc-400 hover:outline-transparent',
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
  disabled?: V['disabled']
  outline?: V['outline']
}
</script>

<template>
  <button :type="type" :class="button({ color, active, disabled, outline, iconOnly: !!slots.default })" :title="title" :disabled="disabled">
    <Icon v-if="icon" :name="icon" size="1.5rem" />
    <slot />
  </button>
</template>
