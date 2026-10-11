<script setup lang="ts">
// Переключатель вкл/выкл с подписью: «Показывать строки без изменений».
// Для настроек вида, которые применяются сразу; для фильтров — UiCheckbox.
defineProps<{
  disabled?: boolean
}>()

const model = defineModel<boolean>({ default: false })
</script>

<template>
  <button
    type="button"
    role="switch"
    :aria-checked="model"
    :disabled="disabled"
    class="
      group inline-flex min-h-8 cursor-pointer items-center gap-2.5 bg-transparent p-0 text-left text-[13.5px] font-semibold text-ink
      focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-strong
      disabled:cursor-not-allowed disabled:opacity-60
    "
    @click="model = !model"
  >
    <span
      class="
        relative h-[18px] w-8 shrink-0 rounded-full bg-line transition-colors group-aria-checked:bg-strong
        after:absolute after:top-0.5 after:left-0.5 after:size-3.5 after:rounded-full after:bg-surf
        after:shadow-[0_1px_2px_rgb(0_0_0/.2)] after:transition-transform after:content-['']
        group-aria-checked:after:translate-x-3.5
      "
      aria-hidden="true"
    />
    <slot />
  </button>
</template>
