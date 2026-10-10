<script setup lang="ts">
// Пустое состояние: «В словаре нет статьи 蛙鳴» + пояснение + действия
defineProps<{
  title?: string
}>()

defineSlots<{
  title?: () => VNode[]
  default?: () => VNode[]
  actions?: () => VNode[]
}>()
</script>

<template>
  <section class="rounded-panel px-7 pt-7 pb-[26px] shadow-[inset_0_0_0_1px_var(--line)]">
    <p class="m-0 text-xl font-extrabold">
      <slot name="title">
        {{ title }}
      </slot>
    </p>

    <div v-if="$slots.default" class="mt-2 max-w-[620px] text-[14.5px] text-muted">
      <slot />
    </div>

    <div v-if="$slots.actions" class="mt-[18px] flex flex-wrap items-center gap-x-[18px] gap-y-2.5">
      <slot name="actions" />
    </div>
  </section>
</template>
