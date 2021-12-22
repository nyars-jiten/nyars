<template>
<div class="example-entry-view">
  <div class="example-text" v-text='entry.text' />
  <div class="example-line" v-text='entry.translationEng' />
  <div class="example-line" v-text='entry.translationRu' />
  <div class="example-line example-source">Источник: {{entry.source}}</div>
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
.example-entry-view {
  color: var(--v-jap-entry-view-words-header-color-base);
}

.example-source {
  color: var(--v-text-decoration-color-base);
}

.example-text {
  font-size: 20px;
  border-bottom: 1px solid var(--v-jap-entry-view-lang-sep-color-base);
  margin-bottom: 10px;
}

.example-entry-view, .example-line {
  margin-bottom: 10px;
}
</style>
