<template>
  <div class="example-item" v-if="entry">
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
    <v-divider inset></v-divider>
  </div>
</template>

<script>
import { examplesBbCodesProcess }  from "@/core/bbCodes.js";

export default {
  methods: {
    exBbCodes(text){
      if (!text) return '';
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
  margin-bottom: 10px;
}

</style>
