<template>
<div class="example-entry-view">
  <SearchExampleItem :entry="entry" :linkable="false" />
  <div class="example-line example-source">Источник: {{entry.source}}</div>
</div>
</template>

<script>
import SearchExampleItem from "@/components/search/SearchExampleItem.vue";

export default {
  components: { SearchExampleItem },
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

.example-entry-view, .example-line {
  margin-bottom: 10px;
}
</style>
