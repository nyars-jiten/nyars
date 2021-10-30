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
                <!-- <router-link :to="'/ocr/'+book.id"> -->
                    <span class="book-name" @click="openRandomPage(book.id)">
                      [{{book.prefix}}] {{book.title}} - {{book.completedPages}}/{{book.totalPages}} ({{getPercent(book)}}%)
                    </span>
                <!-- </router-link> -->
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="12">
          <v-card class="mx-auto mt-2" tile>
            <v-card-title>Поиск по статьям</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="12" md="6">
                  <v-text-field
                    rows="1"
                    class="search-input"
                    label="Search"
                    append-icon="mdi-magnify"
                    v-model="ocrSearchRequest"
                    @click:append="ocrSearch"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <div class="search-result">
                    <div class="search-result-element" v-for="result in ocrSearchResult" :key="result.id">
                      <!-- {{result}} -->
                      <span class="dict-title">[{{result.ocrBook.prefix}}] {{result.ocrBook.title}}</span>
                      <router-link :to="'/ocr/'+result.ocrBook.id+'/page/'+result.id">
                        <v-img :src="getImageLink(result.ocrBook.prefix, result.file)" contain max-width="60%"></v-img>
                      </router-link>
                    </div>
                  </div>
                </v-col>
              </v-row>

                  <!-- {{ocrSearchResult}} -->
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { sendGetRequest } from '@/core/apiRequests.js';

export default {
  methods: {
    ...mapActions(["getBooksList"]),
    getPercent(book) {
      if (book.totalPages === 0) return 0;
      return (book.completedPages/book.totalPages * 100).toFixed(2);
    },
    async openRandomPage(bookId) {
      const resp = await sendGetRequest('ocr/books/' + bookId + '/page/1' + '/rand');
      this.$router.push({ path: '/ocr/'+resp.data.ocrBook.id+'/page/'+resp.data.id }).catch(()=>{});
      // await this.getPage({ bookid: bookId, pageid: this.currentPageid });
    },
    async ocrSearch() {
      if (this.ocrSearchRequest.length < 1) return;
      const resp = await sendGetRequest('ocr/search?r=' + this.ocrSearchRequest);
      this.ocrSearchResult = resp.data;
    },
    getImageLink(prefix, file) {
      // console.log(prefix, file);
      // return 'https://nyars.org/upload/ocr/entries/%D0%A1%D0%A0%D0%A5/8287_164.png';
      return process.env.VUE_APP_BASE + 'upload/ocr/entries/' + prefix + '/' + file;
    },
  },
  computed: {
    ...mapGetters(["booksList", "userHasRights"]),
  },
  async mounted() {
    if (!this.userHasRights(3)) this.$router.push({ path: '/' }).catch(() => {});
    this.getBooksList();
  },
  data: () => ({
    ocrSearchRequest: "",
    ocrSearchResult: []
  }),
};
</script>

<style lang="scss">
.book-name {
  color: grey;
  font-size: 120%;
  cursor: pointer;
}
</style>
