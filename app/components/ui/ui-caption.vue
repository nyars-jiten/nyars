<script setup lang="ts">
// Подпись раздела: «ФИЛЬТРЫ», «ПРОВЕРЯЮЩИЙ»
withDefaults(defineProps<{
  as?: string
}>(), {
  as: 'p',
})
</script>

<template>
  <component :is="as" class="m-0 mb-2.5 text-[11.5px] font-extrabold tracking-[.09em] text-muted uppercase">
    <slot />
  </component>
</template>
