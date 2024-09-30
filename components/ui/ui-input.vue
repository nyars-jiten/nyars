<script setup lang="ts">
  import { tv } from 'tailwind-variants'

  const styles = tv({
    base: 'w-full rounded-md bg-zinc-800 p-2 text-zinc-500 shadow-md outline outline-1 outline-zinc-700 transition-colors hover:bg-zinc-700 hover:text-zinc-300 hover:outline-transparent focus:bg-zinc-700 focus:text-zinc-300 focus:outline-none',

    variants: {
      'h-full': {
        true: 'h-full'
      }
    }
  })

  interface MultilineProps {
    multiline: true
    rows?: number
    lines?: boolean
  }

  interface SingleLineProps {
    multiline: undefined | false
    type?: 'text' | 'number' | 'password'
  }

  type Props = {
    fullHeight?: boolean
  } & (SingleLineProps | MultilineProps)

  withDefaults(defineProps<Props>(), {
    fullHeight: false,
    rows: undefined,
    type: 'text'
  })

  const model = defineModel<string>({ required: true })

  const slots = defineSlots<{ hint?: () => void }>()

</script>

<template>
  <section class="relative" :class="{'pt-2.5': !!slots.hint}">
    <small class="absolute left-2.5 top-0 rounded-md bg-neutral-300 px-2 text-neutral-900 shadow-md">
      <slot name="hint"></slot>
    </small>

    <template v-if="multiline === false">
      <input :class="styles()" :type="type" v-model="model">
    </template>

    <template v-else>
      <textarea :rows="rows" :class="styles()" class="h-full" type="text" v-model="model"></textarea>
    </template>
  </section>
</template>
