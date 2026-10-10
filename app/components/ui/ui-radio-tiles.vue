<script setup lang="ts" generic="T extends string | number">
// Плитки-радиокнопки 2×2 — выбор одного варианта с образцом, например тип совпадения.
const props = defineProps<{
  options: readonly UiOption<T>[]
  /** подпись группы (для скринридеров) */
  legend: string
  name?: string
}>()

const model = defineModel<T>()

const autoName = useId()
const groupName = computed(() => props.name ?? autoName)
</script>

<template>
  <fieldset class="m-0 min-w-0 border-0 p-0">
    <legend class="sr-only">
      {{ legend }}
    </legend>

    <div class="grid grid-cols-2 gap-1.5">
      <label
        v-for="option in options"
        :key="option.value"
        class="
          group relative flex min-h-[52px] cursor-pointer flex-col items-center justify-center gap-px
          rounded-ctl border border-line px-2 py-1.5 text-center transition-colors
          hover:border-strong
          has-checked:border-strong has-checked:bg-soft has-checked:text-strong
          has-checked:shadow-[inset_0_0_0_1px_var(--strong)]
          has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-strong
        "
      >
        <input v-model="model" type="radio" :name="groupName" :value="option.value" class="sr-only">

        <span class="text-[13.5px] font-semibold group-has-checked:font-bold">{{ option.label }}</span>

        <span
          v-if="option.hint"
          lang="ja"
          class="font-jp text-sm leading-tight tracking-[.04em] text-muted group-has-checked:text-strong"
        >{{ option.hint }}</span>
      </label>
    </div>
  </fieldset>
</template>
