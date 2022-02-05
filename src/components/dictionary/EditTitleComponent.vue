<template>
  <div class="wrap-title">
    <div
      class="title-wrap"
      v-for="(readings, title, index) in edit.title"
      :key="title"
    >
      <v-tooltip top v-if="readings.length > 0">
        <template v-slot:activator="{ on, attrs }">
          <span class="title" color="primary" dark v-bind="attrs" v-on="on">{{
            title
          }}</span>
        </template>

        <span>{{ convertSc(readings) }}</span>
      </v-tooltip>
      <div class="title" v-else>
        {{ convertTitle ? convertR(title) : title }}
      </div>
      <span class="separator" v-if="index + 1 < Object.keys(edit.title).length"
        >・</span
      >
    </div>
  </div>
</template>

<script>
import { transcriptionConvert } from "@/core/scriptConverter.js";

import { mapGetters } from "vuex";

export default {
  methods: {
    convertR(raw) {
      return transcriptionConvert(raw, 'hiragana', this.siteTranscriptions);
    },
    convertSc(raw) {
      return this.convertR(raw.join("・"));
    },
  },
  computed: {
    ...mapGetters(['siteTranscriptions']),
  },
  props: {
    edit: Object,
    convertTitle: Boolean,
  },
};
</script>

<style lang="scss">
</style>
