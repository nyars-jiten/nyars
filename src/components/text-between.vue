<script setup lang="ts">
type Props = {
  before?: string
  after?: string
}

withDefaults(defineProps<Props>(), {
  after: '」',
  before: '「'
})
</script>

<template>
  <span :class="`before:content-['${before}'] after:content-['${after}']`">
    <slot />
  </span>
</template>
