<template>
  <div class="example-entry-edit">
    <v-textarea
      outlined
      label="Пример"
      rows="1"
      v-model="entry.text"
      auto-grow
    />
    <v-textarea
      outlined
      label="Английский перевод"
      rows="1"
      v-model="entry.translationEng"
      auto-grow
    />
    <v-textarea
      outlined
      label="Русский перевод"
      rows="1"
      v-model="entry.translationRu"
      auto-grow
    />
    <v-textarea
      outlined
      label="Источник"
      rows="1"
      v-model="entry.source"
      auto-grow
    />
  </div>
</template>

<script>
export default {
  props: {
    entry: Object
  }
}
</script>
