<template>
  <div class="search-result">
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="12" md="12" v-if="this.userHasRights(3)">
          <v-card class="mx-auto" tile v-if="page.ocrBook != null">
            <v-card-title>
                <!-- <router-link :to="'/ocr/'+page.ocrBook.id">← {{ page.ocrBook.title }}</router-link> -->
                {{ page.ocrBook.title }}
            </v-card-title>
            <v-card-text>

              <!-- <p>Ничего не найдено</p> -->
              <!-- {{page}} -->
              <div class="page-title">
                Title: {{page.word}}<br>
                Status: <span :class="statusClass">{{getStatus(page.status)}}</span><br>
                User: {{getUser(page.user)}}<br>
                Page: <a v-for="pageImg in page.images" :key="pageImg.id" target="_blank" :href="pageImg.url">[{{pageImg.id}}]</a>
              </div>
              <div class="text-wrapper ma-2">
                <v-textarea
                  outlined
                  label="rawLine"
                  rows="1"
                  auto-grow
                  :value="page.rawLine"
                ></v-textarea>
                <v-row>
                  <v-col cols="12" sm="4" md="3">
                    <v-textarea rows="1" v-model="page.word" @input="startSearch" @click="setFocusedField('word')" id="word" label="word"></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="8" md="3">
                    <v-textarea rows="1" v-model="page.reading" append-icon="mdi-refresh-auto" @click:append="predictReading" @click="setFocusedField('reading')" id="reading" label="reading"></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-textarea rows="1" v-model="page.meaningEng" @click="setFocusedField('Eng')" id="Eng" auto-grow label="Eng"></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-textarea rows="1" v-model="page.meaningRu" @click="setFocusedField('Ru')" id="Ru" auto-grow label="Ru"></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="4" md="3">
                    <v-autocomplete
                      :menu-props="{ maxHeight: '400' }"
                      label="Тематика"
                      multiple
                      small-chips
                      deletable-chips
                      item-text="rus"
                      item-value="engShort"
                      :items="tagList"
                      v-model="page.selectedTags"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <BBCodePanel
                    :textAreaId="focusedField"
                    @changed="(...args) => updateWithNewValue(args[0])"
                  />
                </v-row>
                <v-row>
                  <div class="unexpected-chars">
                    Unexpected symbols: <span class="unexpected" v-if="unexpectedChars.length > 3">{{unexpectedChars}}</span>
                  </div>
                </v-row>
              </div>
              <div class="page-control">
                <v-btn
                    outlined
                    class="ma-2"
                    color="warning"
                    @click="processPage('skip')"
                >Skip</v-btn>
                <v-btn
                    outlined
                    class="ma-2"
                    color="green"
                    @click="processPage('complete')"
                >Готово</v-btn>
                    <!-- :disabled="page.status != 0" -->
                <v-btn
                    outlined
                    :disabled="page.status != 0"
                    class="ma-2"
                    color="light-blue"
                    @click="processPage('auto')"
                >Авто</v-btn>
                <v-icon v-if="processing">
                  mdi-spin mdi-loading
                </v-icon>
              </div>

              <img :src="getImageLink(page.ocrBook.prefix, page.file)" style="max-width: 60%;" />
              <div class="switch-page">
                <v-btn
                    outlined
                    class="ma-2"
                    @click="getOtherPage('prev')"
                >← Предыдущая</v-btn>
                <v-btn
                    outlined
                    class="ma-2"
                    @click="getOtherPage('rand')"
                >← Случайная →</v-btn>
                <v-btn
                    outlined
                    class="ma-2"
                    @click="getOtherPage('next')"
                >Следующая →</v-btn>
                </div>
                <v-list-item
                  class="res-item"
                  v-for="entry in currentSearchResult.result"
                  :key="entry.id"
                >
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
import { mapGetters, mapActions } from "vuex";
import { sendGetRequest, sendPostRequest } from '@/core/apiRequests.js';
import SearchResultItem from "@/components/SearchResultItem.vue";
import BBCodePanel from "@/components/dictionary/editor/BBCodePanel.vue";

export default {
  methods: {
    ...mapActions(["getPage", "startOCRSearch", 'fetchTags']),
    updateWithNewValue(newValue) {
      switch (this.focusedField) {
        case 'word':
          this.page.word = newValue;
          break;

        case 'reading':
          this.page.reading = newValue;
          break;

        case 'Eng':
          this.page.meaningEng = newValue;
          break;

        case 'Ru':
          this.page.meaningRu = newValue;
          break;

        default:
          break;
      }
    },
    setFocusedField(field) {
      this.focusedField = field
    },
    async getOtherPage(type) {
        const resp = await sendGetRequest('ocr/books/' + this.currentBookid + '/page/' + this.currentPageid + '/' + type);
        this.$router.push({ path: '/ocr/'+resp.data.ocrBook.id+'/page/'+resp.data.id }).catch(()=>{});
        await this.getPage({ bookid: this.currentBookid, pageid: this.currentPageid });
    },
    async predictReading() {
      if (!this.page.word || this.page.word.length < 1) return;
      const resp = await sendGetRequest('ocr/predict-reading?word=' + this.page.word);
      this.page.reading = resp.data.result;
    },
    startSearch() {
      if (!this.page.word || this.page.word.length < 1) return;
      this.startOCRSearch({request: this.page.word});
    },
    getUser(user) {
      if (user) {
        return user.username;
      }
      return 'не назначено';
    },
    getImageLink(prefix, file) {
      return process.env.VUE_APP_BASE + 'upload/ocr/entries/' + prefix + '/' + file;
    },
    getStatus(status) {
      switch (status) {
        case 1:
          return 'в работе';

        case 2:
          return 'завершена';

        case 3:
          return 'skip';

        default:
          return 'новая';
      }
    },
    async processPage(action) {
        this.processing = true;
        this.page.status = 1;
        await sendPostRequest('ocr/page/process/' + action, this.page);

        this.getPage({ bookid: this.currentBookid, pageid: this.currentPageid });
        this.processing = false;
    }
  },
  computed: {
    ...mapGetters(["page", "userHasRights", "currentSearchResult", 'getSubjectTags']),
    currentBookid() {
      return this.$route.params.bookid;
    },
    tagList() {
      return this.getSubjectTags('Fld');
    },
    currentPageid() {
      return this.$route.params.pageid;
    },
    unexpectedChars() {
      const wordC = this.page.word.replace(/[ぁ-ゔゞァ-・ヽヾ゛゜ー一-龯]/g, '');
      const readingC = this.page.reading.replace(/[ぁ-ゔァ-ンー\sa-zA-Z:'!]/g, '');
      const meaningEngC = this.page.meaningEng.replace(/[a-zA-Z\s,;.\\\-\\[\\\]()]/g, '');
      const meaningRuC = this.page.meaningRu.replace(/[а-яА-ЯёЁ\s,;.\\\-\\[\\\]()]/g, '');
      return `${wordC}|${readingC}|${meaningEngC}|${meaningRuC}`;
    },
    statusClass() {
      return {
        // 'status-new': this.page.status == 0,
        'status-working': this.page.status == 1,
        'status-complete': this.page.status == 2,
        'status-skip': this.page.status == 3,
      }
    },
  },
  async mounted() {
    // if (!this.userHasRights(3)) this.$router.push({ path: '/' }).catch(() => {});
    this.fetchTags();
    this.getPage({ bookid: this.currentBookid, pageid: this.currentPageid });
  },
  data: () => ({
    renderPdf: true,
    focusedField: "Ru",
    processing: false
  }),
  components: { SearchResultItem, BBCodePanel },
};
</script>

<style lang="scss">
.unexpected {
  background-color: rgba(252, 48, 3, .3);
}
.status-complete {
  color: green
}

.status-skip, .status-working {
  color: orange
}
</style>
