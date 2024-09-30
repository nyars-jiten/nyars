<script setup lang="ts">
  interface Props {
    values: number[]
  }

  defineProps<Props>()
</script>

<template>
  <small class="truncate">
    <slot name="name"></slot>
  </small>

  <span>
    <span v-for="v, index of values" :key="index">
      <span class="text-amber-300" v-if="v > 0">
        {{ v }}
      </span>

      <small v-else>
        -
      </small>

      <small class="text-neutral-300" v-if="index < values.length - 1">/</small>
    </span>
  </span>
</template>
