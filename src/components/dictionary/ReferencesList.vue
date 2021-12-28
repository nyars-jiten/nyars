<template>
  <v-col cols="12" md="12" sm="12" xs="12" v-if="groupedRefs.length > 0">
    <div class="references-list">
      <v-card>
        <v-card-title>
          Ссылки
        </v-card-title>
        <div class="refs-body pb-3">
          <ul>
            <div class="ref-list-item" v-for="(refs, typeId) in groupedRefs" :key="typeId">
              <li v-if="refs">
                {{typeTitles[typeId]}}:
                <span class="ref-word" v-for="ref in refs" :key="ref.id">
                  <router-link
                    class="titles-link"
                    :to="{ name: 'dict-entry', params: { id: ref.source.wid, type: 'jp' } }"
                  >
                    {{getHeader(ref.source.entry)}}
                  </router-link>
                </span>
              </li>
            </div>
          </ul>
        </div>
      </v-card>
    </div>
  </v-col>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import { transcriptionConvert } from "@/core/scriptConverter.js";

export default {
  data: () => ({
    groupedRefs: [],
    typeTitles: ['Синонимы','Частичные синонимы','Антонимы','Сравни','Сокращения']
  }),
  computed: {
    ...mapGetters(['siteTranscriptions'])
  },
  methods: {
    getRefsByType(type) {
      return this.references.filter(ref => ref.type === type);
    },
    getHeader(entry) {
      // console.log(entry.words.map(x => x.writings));
      let res = entry.words.map(x => x.writings).flat().map(x => x.value);
      if (res.length == 0) res = entry.words.map(x => x.readings).flat().map(x => transcriptionConvert(x.value, 'hiragana', this.siteTranscriptions));
      return res.join('・');
    },
  },
  mounted() {
    for (var i = 0; i <= 4; i++) {
      let typedRefs = this.getRefsByType(i);
      if (typedRefs.length > 0) {
        Vue.set(this.groupedRefs, i, typedRefs);
      }
    }
  },
  props: {
    references: Array
  },
}
</script>

<style lang="scss">
.ref-word {
  color: var(--v-anchor-base);

  &:not(:last-child) {
    &::after {
      color: var(--v-text-decoration-color-base);
      //   white-space: pre;
      content: ",";
    }
  }
}
</style>
