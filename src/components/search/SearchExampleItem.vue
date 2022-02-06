<template>
  <div class="example-item">
    <router-link
      class="titles-link"
      :to="{ name: 'dict-entry', params: { id: entry.wid, type: 'example' } }"
      v-if="linkable"
    >
      <div class="example-text" v-html="exBbCodes(entry.text)" />
    </router-link>
    <div class="example-text" v-html="exBbCodes(entry.text)" v-else />
    <div class="example-eng">{{ entry.translationEng }}</div>
    <div class="example-ru">{{ entry.translationRu }}</div>
  </div>
</template>

<script>
import { examplesBbCodesProcess }  from "@/core/bbCodes.js";

export default {
  methods: {
    exBbCodes(text){
      return examplesBbCodesProcess(text);
    },
  },
  props: {
    entry: Object,
    linkable: Boolean
  }
}
</script>

<style lang="scss">

.example-text {
  font-size: 20px;
  border-bottom: 1px solid var(--v-jap-entry-view-lang-sep-color-base);
  margin-bottom: 10px;
}

</style>
