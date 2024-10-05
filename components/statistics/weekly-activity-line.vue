<script setup lang="ts">
interface Props {
  values: number[]
  name: string
}

defineProps<Props>()
</script>

<template>
  <small class="truncate" :title="name">
    {{ name }}
  </small>

  <span>
    <span v-for="v, index of values" :key="index">
      <span v-if="v > 0" class="text-amber-300">
        {{ v }}
      </span>

      <small v-else>
        -
      </small>

      <small v-if="index < values.length - 1" class="text-neutral-300">/</small>
    </span>
  </span>
</template>
