<template>
  <div class="search-result">
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="12" md="12">
          <v-card class="mx-auto" tile>
            <v-card-title v-if="page.ocrBook != null">
                <router-link :to="'/ocr/'+page.ocrBook.id">← {{ page.ocrBook.title }}</router-link>
            </v-card-title>
            <v-card-text>

              <!-- <p>Ничего не найдено</p> -->
              <!-- {{page}} -->
              <div class="page-title">
                Title: {{page.title}}<br>
                Status: {{getStatus(page.status)}}<br>
                User: {{getUser(page.user)}}
              </div>
              <div class="page-control">
                <v-btn
                    outlined
                    class="ma-2"
                    color="primary"
                    v-if="page.status == 0"
                    @click="processPage('process')"
                >Взять страницу</v-btn>
                <v-btn
                    outlined
                    class="ma-2"
                    color="red"
                    v-if="page.status == 1"
                    @click="processPage('cancel')"
                >Отменить</v-btn>
                <v-btn
                    outlined
                    class="ma-2"
                    color="green"
                    v-if="page.status == 1"
                    @click="processPage('complete')"
                >Завершить</v-btn>
              </div>
              <div class="switch-page">
                <v-btn
                    outlined
                    class="ma-2"
                    @click="getPrevPage"
                >← Предыдущая страница</v-btn>
                <v-btn
                    outlined
                    class="ma-2"
                    @click="getNextPage"
                >Следующая страница →</v-btn>
                </div>
              <embed :src="pdfLink" width="100%" height="1000px" v-if="renderPdf" />

            </v-card-text>

          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { sendGetRequest, sendPostRequest } from '@/core/apiRequests.js';

export default {
  methods: {
    ...mapActions(["getPage"]),
    async getNextPage() {
        const resp = await sendGetRequest('ocr/books/' + this.currentBookid + '/page/' + this.currentPageid + '/next');
        this.$router.push({ path: '/ocr/'+resp.data.ocrBook.id+'/page/'+resp.data.id }).catch(()=>{});
        this.getPage({ bookid: this.currentBookid, pageid: this.currentPageid });
        this.forceRerenderPdf();
    },
    async getPrevPage() {
        const resp = await sendGetRequest('ocr/books/' + this.currentBookid + '/page/' + this.currentPageid + '/prev');
        this.$router.push({ path: '/ocr/'+resp.data.ocrBook.id+'/page/'+resp.data.id }).catch(()=>{});
        this.getPage({ bookid: this.currentBookid, pageid: this.currentPageid });
        this.forceRerenderPdf();
    },
    forceRerenderPdf() {
        this.renderPdf = false;
        this.$nextTick(() => {
          this.renderPdf = true;
        });
    },
    getUser(user) {
      if (user) {
        return user.username;
      }
      return 'не назначено';
    },
    getStatus(status) {
      switch (status) {
        case 1:
          return 'в работе';

        case 2:
          return 'завершена';

        default:
          return 'новая';
      }
    },
    async processPage(action) {
        await sendPostRequest('ocr/books/' + this.currentBookid + '/process/' + this.currentPageid + '/' + action);
        this.getPage({ bookid: this.currentBookid, pageid: this.currentPageid });
    }
  },
  computed: {
    ...mapGetters(["page", "userHasRights"]),
    currentBookid() {
      return this.$route.params.bookid;
    },
    currentPageid() {
      return this.$route.params.pageid;
    },
    pdfLink() {
        return process.env.VUE_APP_API + 'ocr/books/' + this.currentBookid + '/file/' + this.currentPageid + '.pdf';
    }
  },
  async mounted() {
    if (!this.userHasRights(3)) this.$router.push({ path: '/' }).catch(() => {});
    this.getPage({ bookid: this.currentBookid, pageid: this.currentPageid });
  },
  data: () => ({
    renderPdf: true
  }),
};
</script>
