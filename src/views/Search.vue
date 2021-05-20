<template>
  <div class="search-result">
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="12" md="12">
          <v-card class="mx-auto" tile>
            <!-- {{ request }} -->
            <v-card-title>Результат поиска</v-card-title>
            <!-- {{ currentSearchResult.info.parsedGrammar }} -->
            <div class="parser-info" v-if="currentParsedGrammar.length > 0">
              <div class="parser-info-lemma"
                v-for="(gram, lemmaId) in currentParsedGrammar"
                :key="lemmaId"
              >
                <div
                  v-if="!gram.notFound"
                  @click="subSearch(lemmaId)"
                  class="found-lemma clickable"
                  :class="{selected: currentLemma == lemmaId}"
                >
                  <span>{{gram.word}}</span>
                </div>
                <div v-else class="not-found-lemma">
                  <span>{{gram.word}}</span>
                </div>
                <!-- {{gram.word}} | {{gram.ruby}} -->
              </div>
            </div>
            <!-- <v-list-item link class="res-item" v-for="entry in currentSearchResult.result" :key="entry.id" :to="`/jp/${entry.wid}`"> -->
            <v-card-text
              class="no-results"
              v-if="
                !currentSearchResult.result ||
                currentSearchResult.result.length == 0
              "
            >
              <div v-if="currentLoadingState">
                <v-icon>mdi-spin mdi-loading</v-icon>
              </div>
              <div v-else>
                <p>Ничего не найдено</p>
              </div>
            </v-card-text>
            <v-list-item
              class="res-item"
              v-for="entry in currentSearchResult.result"
              :key="entry.id"
            >
              <div class="sch-item" style="width: 100%">
                <SearchResultItem :entry="entry" />
              </div>
            </v-list-item>

            <!-- <v-card-actions>
            </v-card-actions> -->
              <div class="text-center" v-if="currentSearchResult.info && currentSearchResult.info.count > 20">
                  <v-container>
                    <v-row justify="center">
                      <v-pagination
                        v-model="page"
                        total-visible="11"
                        :length="Math.ceil(currentSearchResult.info.count / 20)"
                      ></v-pagination>
                    </v-row>
                  </v-container>
                </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SearchResultItem from "@/components/SearchResultItem.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  // computed: {
  //     request() {
  //         return this.$route.params.search;
  //     }
  // }
  data: () => ({
    searchPageOffset: 0,
    currentLemma: 0//this.currentSearchResult.info.selectedLemma
  }),
  methods: {
    ...mapActions(["startSearch", "fetchTags"]),
    search() {
      // this.page++;
      window.scrollTo(0, 0);
      this.startSearch({
        request: this.request,
        page: this.page,
      });
    },
    subSearch(lemmaId) {
      const word = this.currentParsedGrammar[lemmaId].lemma;
      this.currentLemma = lemmaId;
      this.startSearch({
        request: word,
        page: 1,
        subSearch: true
      });
    },
  },
  watch: {
    page() {
      this.search();
    },
  },
  computed: {
    ...mapGetters(["currentSearchResult", "currentLoadingState", "currentParsedGrammar"]),
  },
  props: {
    request: String,
    page: Number,
  },
  async mounted() {
    this.startSearch({ request: this.request, page: this.page });
    this.fetchTags();
  },
  components: { SearchResultItem },
  metaInfo() {
    return {
      title: this.request + ' — поиск в НЯРСе',
      meta: [{
          property: 'og:title',
          content: `«${this.request}» — поиск`,
          vmid: 'og:title'
        },
        {
          property: 'og:description',
          content: `Японско-русский словарь | НЯРС`,
          vmid: 'og:description'
        }
      ]
    }
  }
};
</script>

<style lang="scss">
.parser-info-lemma {
  display: inline;
  margin: 3px;
  color: var(--v-search-result-parser-secondary-base);
}

.found-lemma, .not-found-lemma {
  display: inline;
}

.clickable {
  border-bottom: 1px solid var(--v-search-result-parser-secondary-base);
  cursor: pointer;
  }

.selected {
  border-width: 2px;
  font-weight: bold;
  color: var(--v-search-result-parser-primary-base);
  border-bottom-color: var(--v-search-result-parser-primary-base);
}

.parser-info {
  margin: 0px 20px 30px 20px;
  font-size: 150%;
}
</style>
