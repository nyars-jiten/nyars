<script lang="ts" setup>
import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  disabled: false,
  outline: true,
  loose: false,
  active: false,
})

const slots = defineSlots<{
  default: () => VNode[]
}>()

const _styles = tv({
  base: 'inline-flex items-center gap-2 rounded-md px-2 py-1.5 leading-none transition-all cursor-pointer',
  variants: {
    color: {
      discord: 'text-discord',
      lime: 'text-lime-300',
      amber: 'text-amber-300',
      delete: 'text-rose-400',
      edit: 'text-indigo-300/80',
      cancel: 'text-orange-300/80',
      save: 'text-lime-300/80',
      sky: 'text-sky-300',
    },

    iconOnly: {
      true: 'justify-center',
    },

    outline: {
      true: 'shadow outline-1 outline-zinc-800',
      false: '',
    },

    active: {
      true: 'bg-zinc-900 text-zinc-800 outline-zinc-800',
    },

    disabled: {
      true: 'cursor-not-allowed text-zinc-700',
      false: 'hover:bg-zinc-800 hover:text-zinc-400 hover:outline-transparent',
    },

    loose: {
      true: 'opacity-20 hover:opacity-100',
    },
  },
})

type V = VariantProps<typeof _styles>

interface Props {
  type?: 'button' | 'submit'
  icon?: string
  color?: V['color']
  active?: V['active']
  label?: string
  disabled?: V['disabled']
  outline?: V['outline']
  loose?: V['loose']
}
</script>

<template>
  <button :type="type" :title="label" :disabled="disabled" class="cursor-pointer">
    <ui-block :disabled="disabled" :active="active" class="flex items-center gap-x-2 justify-center px-2 py-1.5 w-full" :hover="true">
      <Icon v-if="icon" :name="icon" size="1.5rem" />
      <!-- <span class="truncate" v-if="content">{{ content }}</span> -->
    </ui-block>
  </button>
</template>
