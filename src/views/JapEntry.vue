<template>
  <div class="jap-entry">
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="12" sm="12" xs="12">
          <v-card class="" elevation="2" outlined tile>
            <v-card-title>
              <div class="title-card">Японско-русская статья</div>
              <div
                class="icon-wrapper"
                v-if="!editMode && !currentEntry.isReviewed && currentCorpus"
              >
                <DictionaryIcon
                  color="light-blue lighten-1"
                  :icon="currentCorpus.icon"
                  :tooltip="currentCorpus.description"
                />
              </div>
              <div
                class="icon-wrapper"
                @click="changeStatus(1)"
                v-if="!editMode && (!currentEntry.isReviewed || userHasRights(2))"
              >
                <DictionaryIcon
                  :color="currentEntry.isReviewed ? 'grey' : 'warning'"
                  icon="mdi-alert-outline"
                  tooltip="Неотредактированная статья"
                />
              </div>
              <div
                class="icon-wrapper"
                @click="changeStatus(2)"
                v-if="!editMode && (currentEntry.isUnconfirmed || userHasRights(2))"
              >
                <DictionaryIcon
                  :color="currentEntry.isUnconfirmed ? 'red' : 'grey'"
                  icon="mdi-magnify-scan"
                  tooltip="Статья не подтверждается источниками"
                />
              </div>
            </v-card-title>
            <v-card-text>
              <template>
                <v-row>
                  <div class="view-content" v-if="!editMode">
                    <JapEntryView :entry="currentEntry" />
                    <v-spacer></v-spacer>
                    <div class="pl-4 pb-2" v-if="userRoleId >= 1">
                      <v-btn
                        color="primary"
                        dark
                        outlined
                        @click.stop="editMode = true"
                        >Редактировать</v-btn
                      >
                    </div>
                  </div>
                  <div class="edit-content" v-else>
                    <JapEntryEdit
                      :entry="currentEntry"
                      v-if="!textMode"
                    />
                    <JapEntryTextEditor v-else />
                    <EditComment />
                    <DuplicatesChecker />
                  </div>
                </v-row>
              </template>
            </v-card-text>
            <v-card-actions>
              <div class="edit-actions" v-if="editMode">
                <div class="visual-mode" v-if="!textMode">
                  <div class="edit-action pr-2 pl-4">
                    <v-btn color="primary" dark outlined @click.stop="saveEdit"
                      >Сохранить</v-btn
                    >
                  </div>
                  <!-- <div class="edit-action pl-2">
                    <v-btn
                      color="primary"
                      dark
                      outlined
                      @click.stop="changeToTextMode"
                      >Текстовый редактор</v-btn
                    >
                  </div> -->
                  <div class="edit-action pl-2">
                    <v-btn
                      color="primary"
                      dark
                      outlined
                      @click.stop="cancelEdit"
                      >Отмена</v-btn
                    >
                  </div>
                  <div class="edit-action pl-2">
                    <v-btn color="red" dark outlined @click.stop="removeEdit"
                      >Удалить</v-btn
                    >
                  </div>
                </div>
                <div class="text-mode-actions" v-else>
                  <div class="edit-action pl-2">
                    <v-btn
                      color="primary"
                      dark
                      outlined
                      @click.stop="changeToVisualMode"
                      >Вернуться в визуальный редактор</v-btn
                    >
                  </div>
                </div>
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
        <GalleryComponent :editMode="editMode" />
        <ReferencesList v-if="currentEntry.references" :references="currentEntry.references" />
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import sc from "@/core/scriptConverter.js";
import corpusList from "@/data/corpus.json";
import JapEntryView from "@/components/dictionary/JapEntryView.vue";
import GalleryComponent from "@/components/dictionary/GalleryComponent.vue";
import ReferencesList from "@/components/dictionary/ReferencesList.vue";
import JapEntryEdit from "@/components/dictionary/JapEntryEdit.vue";
import JapEntryTextEditor from "@/components/dictionary/JapEntryTextEditor.vue";
import DictionaryIcon from "@/components/dictionary/DictionaryIcon.vue";
import DuplicatesChecker from "@/components/dictionary/editor/DuplicatesChecker.vue";
import EditComment from "@/components/dictionary/editor/EditComment.vue";
import { sendPostRequest } from "@/core/apiRequests.js";
export default {
  data() {
    return {
      editMode: false,
      textMode: false,
      emptyEntry: {
        entry: {
          words: [{ writings: [], readings: [] }],
          meanings: [{ pos: ["unc"], langMeanings: [] }],
        },
      },
      emptyImage: [],
      corpus: corpusList.corpusList,
    };
  },
  computed: {
    ...mapGetters(["currentEntry", "currentImages", "currentEditComment", "userRoleId", "userHasRights"]),
    currentWid() {
      return this.$route.params.wid;
    },
    currentCorpus() {
      const theme = this.currentEntry.theme;
      if (theme == "" || !this.corpus[theme]) {
        return false;
      }

      return this.corpus[theme];
      // this.corpus
    },
    currentTitle() {
      if (!this.currentEntry.entry) return '';
      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }

      var titles = [];
      var readings = [];
      this.currentEntry.entry.words.forEach(function(item) {
        titles = titles.concat(item.writings.map(function(w) {
          return w.value;
        }));
        readings = readings.concat(item.readings.map(function(w) {
          return sc.scriptConvert(w.value);
        }));
      });
      // let uniqueTitles = [...new Set(titles), ...new Set(readings)]
      return titles.concat(readings).filter(onlyUnique).join('・');
    },
  },
  methods: {
    ...mapActions([
      "getCurrentEntry",
      "fetchTags",
      "getCurrentSounds",
      "getCurrentImages",
      "newAlert",
      "deserializeEntry",
    ]),
    changeToVisualMode() {
      this.deserializeEntry();
      this.textMode = false;
    },
    async changeStatus(type) {
      if (!this.userHasRights(2)) return;
      const resp = await sendPostRequest(
        "dictionary/jap/entry/change-status/" + this.currentWid + `?type=${type}`,
        {}
      );
      if (resp.status == 200 && resp.data.id !== 0) {
        this.newAlert({ msg: "Статус статьи изменён", type: "success" });
        this.updatePage();
        this.editMode = false;
      }
    },
    changeToTextMode() {
      this.textMode = true;
    },
    async removeEdit() {
      const newEntry = { comment: this.currentEditComment };
      const resp = await sendPostRequest(
        "dictionary/jap/entries/delete/" + this.currentWid,
        newEntry
      );
      if (resp.status == 200 && resp.data.id !== 0) {
        this.newAlert({ msg: "Статья предложена к удалению", type: "success" });
      }
    },
    async saveEdit() {
      const newEntry = { japEntry: this.currentEntry.entry, images: this.currentImages, comment: this.currentEditComment };
      if (this.currentWid) {
        const resp = await sendPostRequest(
          "dictionary/jap/entries/" + this.currentWid,
          newEntry
        );
        if (resp.status == 200 && resp.data.id !== 0) {
          this.newAlert({ msg: "Правка отправлена", type: "success" });
          this.updatePage();
          this.editMode = false;
        } else {
          this.newAlert({ msg: "Нечего сохранять", type: "error" });
        }
      } else {
        const resp = await sendPostRequest("dictionary/jap/entries", newEntry);
        if (resp.status == 200) {
          this.newAlert({ msg: "Правка отправлена", type: "success" });
          this.$store.commit("updateCurrentEntry", this.emptyEntry);
          this.$store.commit("updateCurrentImages", this.emptyImage);
          this.$router.push({ path: "/" }).catch(() => {});
        }
      }
    },
    cancelEdit() {
      if (this.currentWid) {
        this.getCurrentEntry(this.currentWid);
      } else {
        this.$router.push({ path: "/" }).catch(() => {});
      }
      this.editMode = false;
    },
    updatePage() {
      if (!this.currentWid) {
        this.$store.commit("updateCurrentEntry", this.emptyEntry);
        this.$store.commit("updateCurrentImages", this.emptyImage);
        this.editMode = true;
      } else {
        this.getCurrentEntry(this.currentWid);
        this.getCurrentSounds(this.currentWid);
        this.getCurrentImages(this.currentWid);
        this.editMode = false;
      }
    },
  },
  watch: {
    currentWid() {
      this.updatePage();
    },
  },
  async mounted() {
    this.updatePage();
    this.fetchTags();
  },
  components: {
    JapEntryView,
    JapEntryEdit,
    JapEntryTextEditor,
    DictionaryIcon,
    DuplicatesChecker,
    GalleryComponent,
    EditComment,
    ReferencesList
  },
  metaInfo() {
    return {
      title: this.currentTitle + ' — НЯРС',
      meta: [{
          property: 'og:title',
          content: `${this.currentTitle}`,
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
.title-card {
  padding-right: 5px;
}

.icon-wrapper {
  padding-bottom: 5px;
}

.edit-actions,
.edit-action {
  display: inline;
}
.view-content,
.edit-content {
  width: 100%;
  padding-left: 20px;
}
</style>
