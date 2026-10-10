<script setup lang="ts" generic="T extends string | number">
// Сегменты — выбор одного из нескольких: период, вид сравнения, тема.
const props = defineProps<{
  options: readonly (T | UiOption<T>)[]
  /** подпись группы для скринридеров */
  label: string
}>()

const model = defineModel<T>()

const items = computed(() => props.options.map(option =>
  typeof option === 'object' ? option : { value: option, label: String(option) },
))
</script>

<template>
  <div
    role="group"
    :aria-label="label"
    class="inline-flex max-w-full overflow-x-auto rounded-[9px] bg-bg p-[3px] shadow-[inset_0_0_0_1px_var(--line)]"
  >
    <button
      v-for="item in items"
      :key="item.value"
      type="button"
      :aria-pressed="model === item.value"
      class="
        h-8 cursor-pointer rounded-ctl px-3.5 text-[13.5px] font-semibold whitespace-nowrap text-ink transition-colors
        aria-[pressed=false]:hover:text-strong
        aria-pressed:bg-acc aria-pressed:text-onacc
        focus-visible:outline-2 focus-visible:outline-strong
      "
      @click="model = item.value"
    >
      {{ item.label }}
    </button>
  </div>
</template>
