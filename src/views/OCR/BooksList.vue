<template>
  <div class="search-result">
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="12" md="12">
          <v-card class="mx-auto" tile>
            <v-card-title>Оцифровка словарей</v-card-title>
            <v-card-text>

              <!-- <p>Ничего не найдено</p> -->
              <!-- {{booksList}} -->
              <div class="book-title ma-2" v-for="book in booksList" :key="book.id">
                <router-link :to="'/ocr/'+book.id">
                    <span class="book-name">
                      {{book.title}} - {{book.completedPages}}/{{book.totalPages}} ({{getPercent(book)}}%)
                    </span>
                </router-link>
              </div>
            </v-card-text>

          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["getBooksList"]),
    getPercent(book) {
      // if (book.totalPages === 0) return 100;
      return book.completedPages/book.totalPages * 100;
    }
  },
  computed: {
    ...mapGetters(["booksList"]),
  },
  async mounted() {
    this.getBooksList();
  },
};
</script>

<style lang="scss">
.book-name {
  color: grey;
  font-size: 120%;
}
</style>
