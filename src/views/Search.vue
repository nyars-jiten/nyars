<template>
  <div class="search-result">
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="12" md="12">
          <v-card class="mx-auto" tile>
            <!-- {{ request }} -->
            <v-card-title>Результат поиска</v-card-title>

            <!-- <v-list-item link class="res-item" v-for="entry in currentSearchResult.result" :key="entry.id" :to="`/jp/${entry.wid}`"> -->
            <v-card-text
              class="no-results"
              v-if="
                !currentSearchResult.result ||
                currentSearchResult.result.length == 0
              "
            >
              <p>Ничего не найдено</p>
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
            <!-- <v-list-item v-else :key="item.text" link>
              <v-list-item v-else :key="item.text" :to="item.link" link>


              <v-list-item v-for="(child, i) in item.children" :key="i" link>
              <v-list-item v-for="(child, i) in item.children" :key="i" :to="child.link" link> -->
            <!-- <v-list-item-content>
                <v-list-item-title>Two-line item</v-list-item-title>
                <v-list-item-subtitle>Secondary text</v-list-item-subtitle>
              </v-list-item-content> -->
            <v-card-actions>
              <v-btn
                v-if="
                  currentSearchResult.result &&
                  currentSearchResult.result.length == 20
                "
                color="primary"
                dark
                outlined
                @click="search()"
                >Следующая страница</v-btn
              >
            </v-card-actions>
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
  }),
  methods: {
    ...mapActions(["startSearch", "fetchTags"]),
    search() {
      this.searchPageOffset++;
      window.scrollTo(0, 0);
      this.startSearch({
        request: this.request,
        page: this.page + this.searchPageOffset,
      });
    },
  },
  computed: {
    ...mapGetters(["currentSearchResult"]),
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
};
</script>
