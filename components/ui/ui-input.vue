<script setup lang="ts">
import { tv } from 'tailwind-variants'

interface MultilineProps {
  multiline: true
  id?: string
  rows?: number
  lines?: boolean
}

interface SingleLineProps {
  multiline?: false
  type?: 'text' | 'number' | 'password'
}

type Props = {
  autocomplete?: string
  fullHeight?: boolean
} & (SingleLineProps | MultilineProps)

withDefaults(defineProps<Props>(), {
  fullHeight: false,
  rows: undefined,
})

const slots = defineSlots<{ hint?: () => void }>()

const styles = tv({
  base: 'w-full rounded-md bg-zinc-800 p-2 text-zinc-500 shadow-md outline outline-1 outline-zinc-700 transition-colors focus-within:bg-zinc-700 focus-within:text-zinc-300 focus-within:outline-none hover:bg-zinc-700 hover:text-zinc-300 hover:outline-transparent',
})

const model = defineModel<string>({ required: true })

const inputRef = useTemplateRef('inputRef')
defineExpose({ inputRef })
</script>

<template>
  <section class="relative" :class="{ 'pt-2.5': !!slots.hint }">
    <small class="absolute left-2.5 top-0 rounded-md bg-neutral-300 px-2 text-neutral-900 shadow-md">
      <slot name="hint" />
    </small>

    <template v-if="multiline === false">
      <input v-model="model" :autocomplete="autocomplete" :class="styles()" :type="type">
    </template>

    <template v-else>
      <section class="flex h-full p-4" :class="styles()">
        <textarea ref="inputRef" v-model="model" :autocomplete="autocomplete" :rows="rows" class="w-full bg-transparent outline-none" type="text" />
      </section>
    </template>
  </section>
</template>
