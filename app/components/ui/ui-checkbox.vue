<script setup lang="ts">
// Флажок — для выбора нескольких из длинного списка или вариантов со счётчиками.
// v-model принимает boolean или массив (тогда в него попадает value).
defineProps<{
  value?: unknown
  /** число справа, например количество правок */
  count?: number
  disabled?: boolean
}>()

const model = defineModel<boolean | unknown[]>()
</script>

<template>
  <label
    class="flex min-h-8 cursor-pointer items-center gap-2.5 text-[14.5px] has-disabled:cursor-not-allowed has-disabled:opacity-60"
  >
    <input
      v-model="model"
      type="checkbox"
      :value="value"
      :disabled="disabled"
      class="size-4 shrink-0 cursor-[inherit] accent-strong"
    >

    <span class="min-w-0"><slot /></span>

    <UiCount v-if="count !== undefined" :value="count" class="ml-auto" />
  </label>
</template>
