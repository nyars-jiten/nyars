<script setup lang="ts">
import { ref } from 'vue'

const state = ref(false)

function toggle() {
  state.value = !state.value
}
</script>

<template>
  <slot :state="state" :toggle="toggle" />
</template>
