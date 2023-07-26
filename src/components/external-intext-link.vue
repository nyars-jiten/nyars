<script setup lang="ts">
type Props = { href: string }

defineProps<Props>()
</script>

<template>
  <a
    :href="href"
    target="_blank"
    class="select-text underline decoration-dotted underline-offset-4 hover:text-accent-500"
  >
    <slot />
  </a>
</template>
