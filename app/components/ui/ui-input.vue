<script setup lang="ts">
withDefaults(defineProps<{
  type?: 'text' | 'search' | 'number' | 'password' | 'email' | 'date' | 'url'
  placeholder?: string
  disabled?: boolean
  autocomplete?: string
}>(), {
  type: 'text',
  disabled: false,
})

const model = defineModel<string>({ default: '' })

// value + input вместо v-model: так значение обновляется и во время ввода через IME
function update(event: Event) {
  model.value = (event.target as HTMLInputElement).value
}

const inputRef = useTemplateRef('inputRef')
defineExpose({ inputRef })
</script>

<template>
  <input
    ref="inputRef"
    :value="model"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :autocomplete="autocomplete"
    class="
      box-border h-[38px] w-full min-w-0 rounded-ctl border border-line bg-field px-2.5 text-sm text-ink
      transition-colors placeholder:text-muted/80
      hover:border-muted/60 focus:border-strong focus:outline-none
      disabled:cursor-not-allowed disabled:opacity-60
    "
    @input="update"
  >
</template>
