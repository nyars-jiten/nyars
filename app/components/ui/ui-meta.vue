<script setup lang="ts">
// Строка сведений «Японско-русский · +64 −0 · Murasaki · принял kitsune_ru».
// Каждый прямой потомок — отдельный пункт, точки-разделители ставятся сами.
</script>

<template>
  <div
    class="
      flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px] text-muted
      *:not-first:before:mr-2.5 *:not-first:before:content-['·']
    "
  >
    <slot />
  </div>
</template>
