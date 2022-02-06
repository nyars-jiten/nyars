<template>
  <div class="name-item" v-if="entry">
      <div class="words-header">
        <router-link
          class="titles-link"
          :to="{ name: 'dict-entry', params: { id: entry.wid, type: 'name' } }"
          v-if="linkable"
        >
          <div class="name-word">
            <div class="name-writing"> {{ entry.writing }} </div>
            <div class="name-reading"> {{ convertedReading }}</div>
          </div>
        </router-link>
        <div class="name-word" v-else>
          <div class="name-writing"> {{ entry.writing }} </div>
          <div class="name-reading"> {{ convertedReading }}</div>
        </div>
      </div>
      <div class="name-meaning-block ml-4">
        <div class="name-tags">
          <div class="name-tag mx-2" v-for="tag in entry.tags" :key="tag.id">
            {{tag.rus}}
          </div>
        </div>
        <div class="name-sense-ru" v-text='convertedEng' />
        <div class="name-sense-ru" v-text='convertedRus' />
      </div>
      <v-divider inset></v-divider>
  </div>
</template>

<script>
import { transcriptionConvert } from "@/core/scriptConverter.js";
import { mapGetters } from "vuex";

export default {
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
  computed: {
    ...mapGetters(['siteTranscriptions']),
    convertedRus() {
      return this.convertR(this.entry.rusText, 'kiriji');
    },
    convertedEng() {
      return this.convertR(this.entry.engText, 'hepburn');
    },
    convertedReading() {
      if (!this.entry.reading) return '';
      return transcriptionConvert(this.entry.reading, 'hiragana', this.siteTranscriptions);
    },
  },
  props: {
    entry: Object,
    linkable: Boolean
  }
}
</script>

<style lang="scss">

.name-tags {
  font-style: italic;
  color: var(--v-search-result-parser-secondary-base);
}

.name-word {
  margin-top: 3px;
  margin-bottom: 3px;
  display: flex;
  align-items: center;
  font-size: 0;
}

.name-writing,
.name-reading {
  font-size: 20px;
  display: inline-block;
  .reading {
    font-size: 85%;
  }
}

.name-writing {
  &::after {
    color: var(--v-text-decoration-color-base);
    content: "】";
  }

  &::before {
    color: var(--v-text-decoration-color-base);
    content: "【";
  }
}

</style>
