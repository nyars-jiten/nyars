<template>
  <div class="search-result">
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="12" md="12">
          <v-card class="mx-auto" tile>
            <!-- {{ request }} -->
            <v-card-title>Оцифровка словарей</v-card-title>

            <!-- <v-list-item link class="res-item" v-for="entry in currentSearchResult.result" :key="entry.id" :to="`/jp/${entry.wid}`"> -->
            <v-card-text>

              <p>Ничего не найдено</p>
            </v-card-text>

          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import SearchResultItem from "@/components/SearchResultItem.vue";
// import { mapGetters, mapActions } from "vuex";

export default {
  // computed: {
  //     request() {
  //         return this.$route.params.search;
  //     }
  // }
  // data: () => ({
  //   searchPageOffset: 0,
  // }),
  // methods: {
  //   ...mapActions(["startSearch", "fetchTags"]),
  //   search() {
  //     this.searchPageOffset++;
  //     window.scrollTo(0, 0);
  //     this.startSearch({
  //       request: this.request,
  //       page: this.page + this.searchPageOffset,
  //     });
  //   },
  // },
  // computed: {
  //   ...mapGetters(["currentSearchResult"]),
  // },
  // props: {
  //   request: String,
  //   page: Number,
  // },
  // async mounted() {
  //   this.startSearch({ request: this.request, page: this.page });
  //   this.fetchTags();
  // },
  // // components: { SearchResultItem },
};
</script>
