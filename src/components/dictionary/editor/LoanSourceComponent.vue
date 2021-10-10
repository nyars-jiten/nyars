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
    <p>
      Код языка указывается в соответствии со стандартом <a href="https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D0%B4%D1%8B_%D1%8F%D0%B7%D1%8B%D0%BA%D0%BE%D0%B2#%D0%9A%D0%BE%D0%B4%D1%8B_%D1%8F%D0%B7%D1%8B%D0%BA%D0%BE%D0%B2_%D0%BF%D0%BE_ISO_639_%D0%B8_%D0%93%D0%9E%D0%A1%D0%A2_7.75-97" target="_blank">ISO 639-3</a>
    </p>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      source: this.sourceRaw,
      // langs: ['англ.','голл.','исп.','итал.','нем.','португ.','санскр.','рус.','фр.'],
      langs: ['eng','nld','spa','ita','deu','por','san','rus','fra']
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
