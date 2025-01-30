<script setup lang="ts">
const newEntry = {
  spelling: '',
  reading: '',
  body: '=((сущ))\n- новое значение',
  comment: '',
  status: {
    isUnreviewed: false,
    isUnconfirmed: false,
    isArchaic: false,
    isDialect: false,
    isProper: false,
    isDeleted: false,
  },
} satisfies EditorTxtEntryJp

definePageMeta({
  layout: false,
})
</script>

<template>
  <JpnEditor :is-new="true" :entry="newEntry" wid="" />
</template>
