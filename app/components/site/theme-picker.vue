<script setup lang="ts">
// Список палитр для меню. Образцы цветов рисуются в «своей» палитре через data-theme на элементе.
const { palette, palettes } = usePalette()
</script>

<template>
  <div role="radiogroup" aria-label="Тема оформления" class="flex flex-col gap-0.5">
    <button
      v-for="p in palettes"
      :key="p.id"
      type="button"
      role="radio"
      :aria-checked="palette === p.id"
      class="
        flex h-9 w-full cursor-pointer items-center gap-2.5 rounded-ctl px-2 text-left text-sm font-semibold text-ink
        transition-colors hover:bg-soft aria-checked:text-strong
        focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-strong
      "
      @click="palette = p.id"
    >
      <span
        :data-theme="p.id"
        class="inline-flex h-5 shrink-0 items-center gap-0.5 rounded-tag bg-bg px-1 shadow-[inset_0_0_0_1px_var(--line)]"
        aria-hidden="true"
      >
        <i class="size-2.5 rounded-full bg-ink" />
        <i class="size-2.5 rounded-full bg-acc" />
        <i class="size-2.5 rounded-full bg-strong" />
      </span>

      <span class="grow">{{ p.label }}</span>

      <Icon v-if="palette === p.id" name="tabler:check" size="16px" class="shrink-0" />
    </button>
  </div>
</template>
