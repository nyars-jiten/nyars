<script setup lang="ts">
// Раздел витрины UI kit: заголовок, имя компонента, пояснение
defineProps<{
  id: string
  title: string
  code?: string
  note?: string
}>()
</script>

<template>
  <section :id="id" :aria-labelledby="`h-${id}`" class="scroll-mt-20 border-t border-line pt-[34px] pb-[30px]">
    <div class="mb-1.5 flex flex-wrap items-baseline gap-x-3.5">
      <h2 :id="`h-${id}`" class="m-0 text-[22px] font-extrabold tracking-[-.01em]">
        {{ title }}
      </h2>
      <code v-if="code" class="font-mono text-xs text-muted">{{ code }}</code>
    </div>

    <p v-if="note" class="m-0 mb-2.5 text-sm text-muted">
      {{ note }}
    </p>

    <slot />
  </section>
</template>
