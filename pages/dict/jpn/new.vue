<script setup lang="ts">
const newEntry = {
  spelling: '',
  reading: '',
  body: '=((сущ))\n- новое значение',
} as EditorTxtEntryJp

definePageMeta({
  layout: false,
})
</script>

<template>
  <JpnEditor :is-new="true" :entry="newEntry" wid="" />
</template>
