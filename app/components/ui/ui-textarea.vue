<script setup lang="ts">
withDefaults(defineProps<{
  placeholder?: string
  rows?: number
  disabled?: boolean
}>(), {
  rows: 3,
  disabled: false,
})

const model = defineModel<string>({ default: '' })

// value + input вместо v-model: так значение обновляется и во время ввода через IME
function update(event: Event) {
  model.value = (event.target as HTMLTextAreaElement).value
}

const inputRef = useTemplateRef('inputRef')
defineExpose({ inputRef })
</script>

<template>
  <textarea
    ref="inputRef"
    :value="model"
    :rows="rows"
    :placeholder="placeholder"
    :disabled="disabled"
    class="
      box-border min-h-[76px] w-full min-w-0 resize-y rounded-ctl border border-line bg-field px-3 py-2.5
      text-[14.5px] text-ink transition-colors placeholder:text-muted/80
      hover:border-muted/60 focus:border-strong focus:outline-none
      disabled:cursor-not-allowed disabled:resize-none disabled:opacity-60
    "
    @input="update"
  />
</template>
