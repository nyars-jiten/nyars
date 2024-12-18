<script setup lang="ts">
const newEntry = {
  spelling: '',
  reading: '',
  body: '=((n))\n- новое значение',
} as EditorTxtEntryJp

definePageMeta({
  layout: false,
})
</script>

<template>
  <JpnEditor :is-new="true" :entry="newEntry" />
</template>
