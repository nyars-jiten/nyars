<template>
  <div class="search-result">
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="12" md="8">
          <v-card class="mx-2 my-4" tile>
            <!-- {{ request }} -->
            <v-card-title>Результат поиска</v-card-title>
            <!-- {{ currentSearchResult.info.parsedGrammar }} -->
            <div class="parser-info" v-if="currentParsedGrammar.parsedGrammar && currentParsedGrammar.parsedGrammar.length > 0">
              <div class="parser-info-lemma"
                v-for="(gram, lemmaId) in currentParsedGrammar.parsedGrammar"
                :key="lemmaId"
              >
                <div
                  v-if="!gram.notFound"
                  @click="changeLemma(lemmaId)"
                  class="found-lemma clickable"
                  :class="{selected: currentParsedGrammar.selectedLemma == lemmaId}"
                >
                  <span>{{gram.word}}</span>
                </div>
                <div v-else class="not-found-lemma">
                  <span>{{gram.word}}</span>
                </div>
                <!-- {{gram.word}} | {{gram.ruby}} -->
              </div>
            </div>
            <div class="disclamer-block" v-if="currentParsedGrammar.parsedGrammar && this.currentParsedGrammar.parsedGrammar.length > 0">
              <div class="parser-disclaimer" v-if="this.currentParsedGrammar.selectedLemma > -1 && currentGrammar.grammar.length > 0">
                {{currentGrammar.word}} ← {{currentGrammar.lemma}} + {{currentGrammar.grammar}}
              </div>
              <span class="parser-disclaimer">
                Парсер запущен в тестовом режиме, могут быть ошибки и неточности. О багах пишите нам в <a href="https://discord.gg/u7H5nsPWVB" target="_blank">дискорд</a>.
              </span>
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
                        @input="changePage"
                        total-visible="11"
                        :length="Math.ceil(currentSearchResult.info.count / 20)"
                      ></v-pagination>
                    </v-row>
                  </v-container>
                </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="mx-2 my-4" tile>
            <v-card-title>Имена</v-card-title>
            <v-list-item
              class="res-item"
              v-for="entry in currentSearchResult.names"
              :key="entry.wid"
            >
              <div class="sch-item mb-4">
                <SearchNameItem :entry="entry" :linkable="true" />
              </div>
            </v-list-item>
          </v-card>
          <v-card class="mx-2 my-4" tile>
            <v-card-title>Примеры</v-card-title>
            <v-list-item
              class="res-item"
              v-for="entry in currentSearchResult.sentences"
              :key="entry.wid"
            >
              <div class="sch-item mb-4" style="width: 100%">
                <SearchExampleItem :entry="entry" :linkable="true" />
              </div>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SearchResultItem from "@/components/SearchResultItem.vue";
import SearchNameItem from "@/components/search/SearchNameItem.vue";
import SearchExampleItem from "@/components/search/SearchExampleItem.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  // computed: {
  //     // request() {
  //     //     return this.$route.params.search;
  //     // }
  // },
  data: () => ({
    searchPageOffset: 0,
    page: 1,
    // page: this.selectedPage,
    // currentLemma: 0//this.currentSearchResult.info.selectedLemma
  }),
  methods: {
    ...mapActions(["startSearch", "fetchTags"]),
    // search() {
    //   // this.page++;
    //   window.scrollTo(0, 0);
    //   this.startSearch({
    //     request: this.request,
    //     page: this.page,
    //   });
    // },
    changeLemma(lemmaId) {
      this.page = 1;
      this.subSearch(lemmaId);
    },
    changePage() {
      window.scrollTo(0, 0);
      const lemmaId = this.currentParsedGrammar.selectedLemma;
      this.subSearch(lemmaId);
    },
    subSearch(lemmaId) {
      const word = lemmaId > -1 ? this.currentParsedGrammar.parsedGrammar[lemmaId].lemma : this.currentParsedGrammar.request;
      this.currentParsedGrammar.selectedLemma = lemmaId;
      // this.$router.replace({ name: "user-view", params: {id:"123"}, query: {q1: "q1"} })
      this.$router
        .replace({ path: "/search", query: { r: this.request, page: this.page } })
        .catch(() => {});
      this.startSearch({
        request: word,
        page: this.page,
        subSearch: true
      });
    },
  },
  // watch: {
  //   page() {
  //     this.search();
  //   },
  // },
  computed: {
    ...mapGetters(["currentSearchResult", "currentLoadingState", "currentParsedGrammar"]),
    currentGrammar() {
      return this.currentParsedGrammar.parsedGrammar[this.currentParsedGrammar.selectedLemma];
    }
  },
  props: ['request', 'selectedPage'],
  beforeUpdate() {
    // console.log(this.selectedPage)
    this.page = parseInt(this.selectedPage)
  },
  async mounted() {
    this.startSearch({ request: this.request, page: this.page });
    this.fetchTags();
  },
  components: { SearchResultItem, SearchExampleItem, SearchNameItem },
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
.sch-item {
  width: 100%
}

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

.parser-disclaimer {
  margin: 5px 20px 0px 20px;
  color: var(--v-search-result-parser-secondary-base);
  font-size: 80%;
}

.parser-info {
  margin: 0px 20px 0px 20px;
  font-size: 150%;
}
</style>
