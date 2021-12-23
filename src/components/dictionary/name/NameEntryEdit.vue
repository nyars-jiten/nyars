<template>
  <div class="names-entry-edit">
    <v-textarea
      outlined
      label="Написание"
      rows="1"
      v-model="entry.writing"
      auto-grow
    />
    <v-textarea
      outlined
      label="Чтение"
      rows="1"
      v-model="entry.reading"
      auto-grow
    />
    <v-textarea
      outlined
      label="Тип"
      rows="1"
      v-model="entry.type"
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
