<script setup lang="ts">
interface Props {
  values: number[]
  name: string
}

defineProps<Props>()
</script>

<template>
  <span class="truncate text-xs" :title="name">
    {{ name }}
  </span>

  <span>
    <span v-for="v, index of values" :key="index">
      <span v-if="v > 0" class="text-amber-300">
        {{ v }}
      </span>

      <span v-else>
        -
      </span>

      <span v-if="index < values.length - 1" class="text-neutral-300 text-xs">/</span>
    </span>
  </span>
</template>
