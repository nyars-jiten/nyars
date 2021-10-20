<template>
  <div class="reference-b">
    <v-row>
      <v-col cols="12" md="4">
        <v-combobox
          label="Язык"
          v-model="source.lang"
          :items="langs"
        ></v-combobox>
      </v-col>
      <v-col cols="12" md="8">
        <v-text-field
          label="Исходное слово"
          v-model="source.word"
          autocomplete="off"
          counter
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      source: this.sourceRaw,
      // langs: ['англ.','голл.','исп.','итал.','нем.','португ.','санскр.','рус.','фр.'],
      langs: ['eng','wasei','deu','spa','por','zho','ita','nld','san','rus','fra']
    };
  },
  props: {
    sourceRaw: Object,
  },
};
</script>

<style lang="scss">
.reference-b {
  padding-top: 10px;
}
</style>
