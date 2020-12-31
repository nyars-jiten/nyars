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
                v-if="!editMode && !currentEntry.isReviewed"
              >
                <DictionaryIcon
                  color="warning"
                  icon="mdi-alert-outline"
                  tooltip="Неотредактированная статья"
                />
              </div>
              <div
                class="icon-wrapper"
                v-if="!editMode && userRoleId >= 2"
                @click="changeStatus"
              >
                <DictionaryIcon
                  color="grey"
                  icon="mdi-check-circle-outline"
                  tooltip="Отметить статью как [не]отредактированную"
                />
              </div>
            </v-card-title>
            <v-card-text>
              <template>
                <v-row>
                  <div class="view-content" v-if="!editMode">
                    <JapEntryView v-bind:entry="currentEntry" />
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
                      v-bind:entry="currentEntry"
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
                  <div class="edit-action pl-2">
                    <v-btn
                      color="primary"
                      dark
                      outlined
                      @click.stop="changeToTextMode"
                      >Текстовый редактор</v-btn
                    >
                  </div>
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
        <v-col cols="12" md="12" sm="12" xs="12">
          <GalleryComponent :editMode="editMode" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import corpusList from "@/data/corpus.json";
import JapEntryView from "@/components/dictionary/JapEntryView.vue";
import GalleryComponent from "@/components/dictionary/GalleryComponent.vue";
import JapEntryEdit from "@/components/dictionary/JapEntryEdit.vue";
import JapEntryTextEditor from "@/components/dictionary/JapEntryTextEditor.vue";
import DictionaryIcon from "@/components/dictionary/DictionaryIcon.vue";
import DuplicatesChecker from "@/components/dictionary/editor/DuplicatesChecker.vue";
import EditComment from "@/components/dictionary/editor/EditComment.vue";
import { sendPostRequest, sendDeleteRequest } from "@/core/apiRequests.js";
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
    ...mapGetters(["currentEntry", "currentImages", "currentEditComment", "userRoleId"]),
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
    async changeStatus() {
      const resp = await sendPostRequest(
        "dictionary/jap/entry/change-status/" + this.currentWid,
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
      const resp = await sendDeleteRequest(
        "dictionary/jap/entries/" + this.currentWid
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
    EditComment
  },
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
