<template>
<div class="names-entry-view" v-if="entry">
  <div class="names-text" v-text='entry.writing' />
  <div class="names-line" v-text='convertedReading' />
  <div class="names-line" v-text='convertedEng' />
  <div class="names-line" v-text='convertedRus' />
  <div class="names-line names-type">Тип: {{entry.tags}}</div>
</div>
</template>

<script>
import { transcriptionConvert } from "@/core/scriptConverter.js";
import { mapGetters } from "vuex";

export default {
  computed:  {
    ...mapGetters(['siteTranscriptions']),
    convertedReading() {
      if (!this.entry.reading) return '';
      return transcriptionConvert(this.entry.reading, 'hiragana', this.siteTranscriptions);
    },
    convertedRus() {
      return this.convertR(this.entry.rusText, 'kiriji');
    },
    convertedEng() {
      return this.convertR(this.entry.engText, 'hepburn');
    }
  },
  methods: {
    convertR(raw, type) {
      if (raw && raw.length > 0) return raw;
      if (!this.entry.reading) return '';
      const res = transcriptionConvert(this.entry.reading, type, this.siteTranscriptions);
      return this.titleCase(res);
    },
    titleCase(str) {
      var splitStr = str.toLowerCase().split(' ');
      for (var i = 0; i < splitStr.length; i++) {
          splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
      }
      return splitStr.join(' ');
    }
  },
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
