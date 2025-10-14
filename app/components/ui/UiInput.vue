<script setup lang="ts">
import type { VariantProps } from 'tailwind-variants'
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
  disabled?: VariantProps<typeof styles>['disabled']
  placeholder?: string
  selectable?: boolean
} & (SingleLineProps | MultilineProps)

withDefaults(defineProps<Props>(), {
  fullHeight: false,
  rows: undefined,
  disabled: false,
  selectable: false,
})

const slots = defineSlots<{ hint?: () => void, description?: () => void }>()

const styles = tv({
  base: 'w-full rounded-md bg-zinc-800 p-2 text-zinc-500 shadow-md outline-1 outline-zinc-700 transition-colors',
  variants: {
    disabled: {
      true: 'bg-zinc-700 ',
      false: ' focus-within:bg-zinc-700 focus-within:text-zinc-300 focus-within:outline-none hover:bg-zinc-700 hover:text-zinc-300 hover:outline-transparent',
    },
    selectable: {
      true: 'select-text cursor-text text-zinc-300',
    },
  },
  compoundVariants: [
    {
      disabled: true,
      selectable: false,
      class: 'cursor-not-allowed text-zinc-500',
    },
  ],
})

const description = tv({
  base: 'text-gray-500 pl-4 text-sm italic pt-2',
})

const model = defineModel<string>({ required: true })

// NB: we're using value + event instead of v-model to catch an IME input
// also it fixes bug with initial model value
function updateModel(event: Event) {
  model.value = (event.target as HTMLTextAreaElement).value
}

const inputRef = useTemplateRef('inputRef')
defineExpose({ inputRef })
</script>

<template>
  <section class="relative" :class="{ 'pt-2.5': !!slots.hint }">
    <small class="absolute left-2.5 top-0 rounded-md bg-neutral-300 px-2 text-neutral-900 shadow-md">
      <slot name="hint" />
    </small>

    <template v-if="multiline === false">
      <input v-model="model" :autocomplete="autocomplete" :class="styles({ disabled, selectable })" :type="type" :placeholder="placeholder" :disabled="disabled">
    </template>

    <template v-else>
      <section class="flex p-4" :class="styles({ disabled })">
        <textarea ref="inputRef" :value="model" :autocomplete="autocomplete" :rows="rows" class="w-full bg-transparent outline-none" :class="{ 'resize-none': disabled }" :placeholder="placeholder" :disabled="disabled" @input="updateModel" />
      </section>
    </template>

    <div v-if="!!slots.description" :class="description()">
      <slot name="description" />
    </div>
  </section>
</template>
