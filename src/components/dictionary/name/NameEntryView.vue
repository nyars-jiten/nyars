<template>
<div class="names-entry-view">
  <div class="names-text" v-text='entry.writing' />
  <div class="names-line" v-text='entry.reading' />
  <div class="names-line names-type">Тип: {{entry.type}}</div>
</div>
</template>

<script>
export default {
  props: {
    entry: Object
  }
}
</script>

<style>
.names-entry-view {
  color: var(--v-jap-entry-view-words-header-color-base);
}

.names-type {
  color: var(--v-text-decoration-color-base);
}

.names-text {
  font-size: 20px;
  border-bottom: 1px solid var(--v-jap-entry-view-lang-sep-color-base);
  margin-bottom: 10px;
}

.names-entry-view, .names-line {
  margin-bottom: 10px;
}
</style>
