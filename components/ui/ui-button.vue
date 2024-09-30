<script lang="ts" setup>
import { tv } from 'tailwind-variants'

withDefaults(defineProps<Props>(), {
  type: 'button',
  icon: undefined,
})

const button = tv({
  base: 'inline-flex items-center gap-2 rounded-md px-2 py-1.5 leading-none shadow-md outline-dashed outline-1 outline-zinc-800 transition-colors hover:bg-zinc-800 hover:text-zinc-400 hover:outline-transparent',
})

interface Props {
  type?: 'button' | 'submit'
  icon?: string
}
</script>

<template>
  <button :type="type" :class="button()">
    <Icon v-if="icon" :name="icon" size="1.5rem" />
    <slot />
  </button>
</template>
