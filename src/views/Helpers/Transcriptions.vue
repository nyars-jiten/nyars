<template>
  <div class="search-result">
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="12" md="12">
          <v-card class="mx-auto" tile>
            <v-card-title>Транскрипции</v-card-title>
            <v-card-text>
              <!-- {{ transcriptions }} -->
              <v-text-field
                v-model="line"
                placeholder="Word"
                autocomplete="off"
                class="ma-4"
                flat
                hide-details
              />
              <div class="test-result ma-4">
                <div
                  class="transcriptionLine "
                  v-for="header in headers"
                  :key="header.value"
                  v-text="header.text + ': ' + convertTrscr(header.value)"
                />
              </div>
              <v-data-table
                dense
                :headers="headers"
                :items="transcriptions"
                item-key="literal"
                class="elevation-1"
                hide-default-footer
                :items-per-page='-1'
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { transcriptionConvert } from "@/core/scriptConverter.js";

export default {
  data: () => ({
    headers: [
      {text: 'Хирагана', value: 'hiragana', type: 0},
      {text: 'Катакана', value: 'katakana', type: 1},
      {text: 'Литерал', value: 'literal', type: -1},
      {text: 'Хэпбёрн', value: 'hepburn', type: 3},
      {text: 'Кунрэй', value: 'kunrei', type: 4},
      {text: 'Киридзи', value: 'kiriji', type: 2},
    ],
    line: '!jetto!kiryu:'
  }),
  methods: {
    convertTrscr(type) {
      if (type === 'literal') return this.line;
      return transcriptionConvert(this.line, type, this.siteTranscriptions);
    }
  },
  computed: {
    ...mapGetters(['siteTranscriptions']),
    transcriptions() {
      const list = Object.values(this.siteTranscriptions);
      return list;
    }
  },
};
</script>

<style lang="scss">
.transcriptionLine {
  font-size: 120%;
}
</style>
