<template>
    <div class="random-page">
      <v-container fluid>
      <v-row>
        <v-col cols="12" md="12" sm="12" xs="12">
          <v-card elevation="2" outlined tile>
            <v-card-title>
              Случайная статья
            </v-card-title>
            <v-card-text>
              <v-checkbox
                v-model="selected"
                label="Без русского перевода"
                value="!rus"
                ></v-checkbox>
                <v-checkbox
                v-model="selected"
                label="Без английского перевода"
                value="!eng"
               ></v-checkbox>
                <v-checkbox
                v-model="selected"
                label="Неотредактированная"
                value="!rev"
               ></v-checkbox>
               <template>
                <v-container fluid>
                  <v-select
                    v-model="corpusSelected"
                    :items="activeCorpuses"
                    label="—"
                    item-text="descr"
                    item-value="val"
                    multiple
                  >
              <template v-slot:prepend-item>
                  <v-list-item
                    ripple
                    @click="toggle"
                  >
                    <v-list-item-action>
                      <v-icon>
                        {{ icon }}
                      </v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>
                        Выбрать все
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider class="mt-2"></v-divider>
                </template>
              </v-select>
            </v-container>
          </template>
               <div class="pl-4 pb-2">
                    <v-btn color="primary" dark outlined @click.stop="search">Обновить</v-btn>
                </div>
               <v-list-item class="res-item" v-for="entry in currentRandomSearchResult" :key="entry.id">
                <div class="sch-item" style="width: 100%">
                  <SearchResultItem :entry="entry" />
                </div>
              </v-list-item>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    </div>
</template>

<script>
import corpusList from '@/data/corpus.json';
import SearchResultItem from '@/components/SearchResultItem.vue';
import { mapGetters, mapActions } from "vuex";

export default {
    data() {
      return {
            selected: ["!rev"],
            corpusSelected: ["main"],
            corpus: corpusList.corpusList
        }
    },
    methods: {
        ...mapActions(["startRandomSearch","fetchTags"]),
        search() {
            this.startRandomSearch({ selected: this.selected, corpus: this.corpusSelected });
        },
        toggle () {
          this.$nextTick(() => {
            if (this.selectAllElements) {
              this.corpusSelected = []
            } else {
              this.corpusSelected = this.activeCorpuses.map(x => x.val)
            }
          })
        },
    },
    computed: {
        ...mapGetters(["currentRandomSearchResult"]),
        activeCorpuses() {
          return Object.keys(this.corpus).map((key) => new Object({ descr: this.corpus[key].description, val: key }));
        },
        selectAllElements() {
          return this.corpusSelected.length === this.activeCorpuses.length;
        },
        selectSomeElements() {
          return this.corpusSelected.length > 0 && !this.selectAllElements;
        },
        icon () {
          if (this.selectAllElements) return 'mdi-close-box'
          if (this.selectSomeElements) return 'mdi-minus-box'
          return 'mdi-checkbox-blank-outline'
        },
    },
    watch: {
      selected() {
        this.search();
      },
      corpusSelected() {
        // console.log(this.corpusSelected)
        this.search();
      }
    },
    async mounted() {
        this.search();
        this.fetchTags();
    },
    components: { SearchResultItem }
}
</script>
