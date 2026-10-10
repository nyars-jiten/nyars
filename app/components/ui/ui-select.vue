<script setup lang="ts" generic="T extends string | number">
const props = defineProps<{
  options: readonly (T | UiOption<T>)[]
  disabled?: boolean
}>()

const model = defineModel<T>()

const items = computed(() => props.options.map(option =>
  typeof option === 'object' ? option : { value: option, label: String(option) },
))
</script>

<template>
  <select
    v-model="model"
    :disabled="disabled"
    class="
      box-border h-[38px] w-full min-w-0 cursor-pointer rounded-ctl border border-line bg-field px-2.5 text-sm text-ink
      transition-colors hover:border-muted/60 focus:border-strong focus:outline-none
      disabled:cursor-not-allowed disabled:opacity-60
    "
  >
    <option v-for="item in items" :key="item.value" :value="item.value">
      {{ item.label }}
    </option>
  </select>
</template>
