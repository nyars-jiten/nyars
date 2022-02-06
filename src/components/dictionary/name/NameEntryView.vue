<template>
  <div class="names-entry-view" v-if="entry">
    <SearchNameItem :entry="entry" :linkable="false" />
  </div>
</template>

<script>
import SearchNameItem from "@/components/search/SearchNameItem.vue";

export default {
  components: { SearchNameItem },
  props: {
    entry: Object
  }
}
</script>

<style lang="scss">
.names-entry-view {
  color: var(--v-jap-entry-view-entry-sense-color-base) !important;
}
</style>
