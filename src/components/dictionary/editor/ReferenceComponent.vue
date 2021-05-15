<template>
  <div class="reference-b">
    <v-row>
      <v-col cols="12" md="3">
        <v-select
          label="Тип"
          v-model="ref.referenceType"
          :items="refTypes"
          item-text="text"
          item-value="id"
        ></v-select>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          label="Слово"
          v-model="ref.value"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          label="ID статьи"
          v-model="ref.target"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import referenceTypes from "@/data/referenceTypes.json";

export default {
  data: function () {
    return {
      ref: this.refRaw,
      refTypes: referenceTypes,
    };
  },
  props: {
    refRaw: Object,
  },
};
</script>
