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
        {{ convertR(title) }}
      </div>
      <span class="separator" v-if="index + 1 < Object.keys(edit.title).length"
        >・</span
      >
    </div>
  </div>
</template>

<script>
import sc from "@/core/scriptConverter.js";
export default {
  methods: {
    convertR(raw) {
      return sc.scriptConvert(raw);
    },
    convertSc(raw) {
      const converted = raw.map(function (reading) {
        return sc.scriptConvert(reading);
      });
      return converted.join("・");
    },
  },
  props: {
    edit: Object,
  },
};
</script>

<style lang="scss">
</style>
