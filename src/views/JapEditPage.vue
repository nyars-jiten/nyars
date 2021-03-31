<template>
  <div class="edit-page">
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="12" sm="12" xs="12">
          <v-card class="" elevation="2" outlined tile v-if="currentEntry">
            <v-card-title> Правка #{{ this.currentId }} </v-card-title>
            <v-card-text>
              <template>
                <v-row>
                  <div class="edit-content">
                    <JapEntryEdit
                      v-bind:entry="currentEntry"
                      v-if="!textMode"
                    />
                    <JapEntryTextEditor v-else />
                    <EditComment />
                    <!-- <DuplicatesChecker /> -->
                  </div>
                </v-row>
              </template>
            </v-card-text>
            <v-card-actions>
              <div class="visual-mode" v-if="!textMode">
                <div class="edit-action pr-2 pl-4">
                  <v-btn color="primary" dark outlined @click.stop="saveEdit">
                    Сохранить
                  </v-btn>
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
              </div>
              <div class="text-mode-actions" v-else>
                <div class="edit-action pl-2">
                  <v-btn
                    color="primary"
                    dark
                    outlined
                    @click.stop="changeToVisualMode"
                  >
                    Вернуться в визуальный редактор
                  </v-btn>
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
import { mapActions, mapGetters } from "vuex";
import GalleryComponent from "@/components/dictionary/GalleryComponent.vue";
import JapEntryEdit from "@/components/dictionary/JapEntryEdit.vue";
import JapEntryTextEditor from "@/components/dictionary/JapEntryTextEditor.vue";
// import DuplicatesChecker from "@/components/dictionary/editor/DuplicatesChecker.vue";
import EditComment from "@/components/dictionary/editor/EditComment.vue";
import { sendPostRequest } from "@/core/apiRequests.js";
export default {
  data() {
    return {
      editMode: true,
      textMode: false,
    };
  },
  computed: {
    ...mapGetters(["currentEntry", "currentImages", "currentEditComment"]),
    currentId() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapActions([
      "getCurrentEditEntry",
      "newAlert",
      "fetchTags",
      "deserializeEntry",
    ]),
    changeToVisualMode() {
      this.deserializeEntry();
      this.textMode = false;
    },
    changeToTextMode() {
      this.textMode = true;
    },
    async acceptEdit() {
      const resp = await sendPostRequest(`edits/${this.currentId}/approve`, {});
      if (resp.status == 200) {
        this.newAlert({
          msg: `Правка #${this.currentId} принята`,
          type: "success",
        });
      }
    },
    async declineEdit() {
      const resp = await sendPostRequest(`edits/${this.currentId}/decline`, {});
      if (resp.status == 200) {
        this.newAlert({
          msg: `Правка #${this.currentId} отклонена`,
          type: "warning",
        });
      }
    },
    async saveEdit() {
      const newEntry = { japEntry: this.currentEntry.entry, images: this.currentImages, comment: this.currentEditComment  };
      const resp = await sendPostRequest(
        `dictionary/jap/save-editdata/${this.currentId}`,
        newEntry
      );
      if (resp.status == 200) {
        this.newAlert({ msg: "Правка исправлена", type: "success" });
        // this.$store.commit("updateCurrentEntry", this.emptyEntry);
        // this.$router.push({ path: '/' }).catch(()=>{});
      }
    },
    cancelEdit() {
      if (this.currentWid) {
        this.getCurrentEntry(this.currentWid);
      } else {
        this.$router.push({ path: "/" }).catch(() => {});
      }
      // this.editMode = false;
    },
    updatePage() {
      this.getCurrentEditEntry(this.currentId);
      // this.editMode = false;
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
    JapEntryEdit,
    JapEntryTextEditor,
    GalleryComponent,
    // DuplicatesChecker,
    EditComment
  },
};
</script>

<style lang="scss">
.warning-wrapper {
  padding-left: 5px;
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
