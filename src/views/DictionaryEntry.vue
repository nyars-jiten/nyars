<template>
  <div class="dictionary-entry" :key='dictType'>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="12">
          <v-card class="" elevation="2" outlined tile>
            <v-card-title>
              <div class="title-card" v-text="cardTitle" />
              <StatusIcons v-if="isDictType('jp') && currentEntry" :currentEntry="currentEntry" :editMode="editMode" />
              <div class="new-entry-buttons" v-if="editMode && isDictType('jp')">
                <v-btn
                  color="teal lighten-1"
                  class="mr-2"
                  dark
                  small
                  outlined
                  @click="changeDict('example')"
                  v-text="isNew ? 'Новый пример' : 'Перенести в примеры'"
                />
                <v-btn
                  color="teal lighten-1"
                  class="mr-2"
                  dark
                  small
                  outlined
                  @click="changeDict('name')"
                  v-text="isNew ? 'Новое имя' : 'Перенести в словарь имён'"
                />
              </div>
            </v-card-title>
            <v-card-text>
              <template>
                <v-row>
                  <div class="view-content" v-if="!editMode">
                    <div class="entry-content">
                      <v-container>
                        <JapEntryView v-if="isDictType('jp')" :entry='currentEntry' />
                        <ExampleEntryView v-if="isDictType('example')" :entry='currentEntry' />
                        <NameEntryView v-if="isDictType('name')" :entry='currentEntry' />
                      </v-container>
                    </div>
                    <v-spacer />
                    <div class="pl-4 pb-2" v-if="userRoleId >= 1">
                      <v-btn color="primary" dark outlined @click.stop="editMode = true">Редактировать</v-btn>
                    </div>
                  </div>
                  <div class="edit-content" v-else>
                    <v-container>
                      <div v-if="isDictType('jp')" class="jpn-entry-content">
                        <JapEntryEdit :entry="currentEntry" />
                        <DuplicatesChecker />
                      </div>
                      <ExampleEntryEdit v-if="isDictType('example')" :entry='currentEntry' />
                      <NameEntryEdit v-if="isDictType('name')" :entry='currentEntry' />
                      <EditComment />
                    </v-container>
                  </div>
                </v-row>
              </template>
            </v-card-text>
            <v-card-actions>
              <div class="edit-actions" v-if="editMode">
                <div class="visual-mode">
                  <div class="edit-action pr-2 pl-4">
                    <v-btn color="primary" dark outlined @click.stop="saveEdit" v-text="isNew ? 'Добавить' : 'Сохранить'" />
                  </div>
                  <div class="edit-action pl-2" v-if="!isNew">
                    <v-btn color="primary" dark outlined @click.stop="cancelEdit">Отмена</v-btn>
                  </div>
                  <div class="edit-action pl-2" v-if="!isNew">
                    <v-btn color="red" dark outlined @click.stop="removeEdit">Удалить</v-btn>
                  </div>
                </div>
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
          <GalleryComponent v-if="isDictType('jp')" :editMode="editMode" />
          <ReferencesList v-if="isDictType('jp') && currentEntry.references" :references="currentEntry.references" />
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { sendPostRequest, sendDeleteRequest } from "@/core/apiRequests.js";
import { transcriptionConvert } from "@/core/scriptConverter.js";
import dictTypesData from "@/data/dictionaryTypes.json";

import JapEntryView from "@/components/dictionary/JapEntryView.vue";
import JapEntryEdit from "@/components/dictionary/JapEntryEdit.vue";
import ExampleEntryEdit from "@/components/dictionary/other/ExampleEntryEdit.vue";
import ExampleEntryView from "@/components/dictionary/other/ExampleEntryView.vue";
import NameEntryEdit from "@/components/dictionary/name/NameEntryEdit.vue";
import NameEntryView from "@/components/dictionary/name/NameEntryView.vue";

import StatusIcons from "@/components/dictionary/StatusIcons.vue";
import GalleryComponent from "@/components/dictionary/GalleryComponent.vue";
import ReferencesList from "@/components/dictionary/ReferencesList.vue";
import DuplicatesChecker from "@/components/dictionary/editor/DuplicatesChecker.vue";
import EditComment from "@/components/dictionary/editor/EditComment.vue";

export default {
  data() {
    return {
      editMode: false,
      dictTypes: dictTypesData,
      emptyJpEntry: {
        entry: {
          words: [{ writings: [], readings: [] }],
          meanings: [{ pos: ["unc"], langMeanings: [] }]
        }
      },
      emptyEntry: {},
      emptyImage: []
    };
  },
  computed: {
    ...mapGetters(["currentEntry", "currentImages", "currentEditComment", "userRoleId", "userHasRights", 'siteTranscriptions']),
    currentId() {
      return this.$route.params.id;
    },
    dictType() {
      return this.$route.params.type;
    },
    isNew() {
      return this.currentId === 'new';
    },
    cardTitle() {
      return this.dictTypes.filter(dict => dict.identifier === this.dictType)[0].title;
    },
    currentTitle() {
      if (!this.currentEntry.entry) return '';
      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }

      var titles = [];
      var readings = [];
      this.currentEntry.entry.words.forEach(function(item) {
        titles = titles.concat(
          item.writings.map(function(w) {
            return w.value;
          })
        );
        readings = readings.concat(
          item.readings.map(function(w, siteTranscriptions = this.siteTranscriptions) {
            return transcriptionConvert(w.value, 'hiragana', siteTranscriptions);
          })
        );
      });
      // let uniqueTitles = [...new Set(titles), ...new Set(readings)]
      return titles
        .concat(readings)
        .filter(onlyUnique)
        .join("・");
    }
  },
  methods: {
    ...mapActions([
      "getCurrentEntry",
      "fetchTags",
      "getCurrentSounds",
      "getCurrentImages",
      "newAlert",
      "deserializeEntry"
    ]),
    isDictType(type) {
      return type === this.dictType;
    },
    changeDict(dict) {
      this.$router.push({ name: "dict-entry", params: { id: "new", type: dict } }).catch(() => {});
    },
    async removeEdit() {
      // const newEntry = { comment: this.currentEditComment };
      const resp = await sendDeleteRequest(`edits/entries/${this.dictType}/${this.currentId}`);
      if (resp.status == 200 && resp.data.id !== 0) {
        this.newAlert({ msg: "Статья предложена к удалению", type: "success" });
      }
    },
    async saveEdit() {
      const newEntry = {
        japEntry: this.isDictType('jp') ? this.currentEntry.entry : null,
        //rusEntry
        //kanjiEntry
        exampleEntry: this.isDictType('example') ? this.currentEntry : null,
        nameEntry: this.isDictType('name') ? this.currentEntry : null,
        images: this.currentImages,
        comment: this.currentEditComment
      };
      if (!this.isNew) {
        const resp = await sendPostRequest(`edits/entries/${this.dictType}/${this.currentId}`, newEntry);
        if (resp.status == 200 && resp.data.id !== 0) {
          this.newAlert({ msg: "Правка отправлена", type: "success" });
          this.updatePage();
          this.editMode = false;
        } else {
          this.newAlert({ msg: "Нечего сохранять", type: "error" });
        }
      } else {
        const resp = await sendPostRequest(`edits/entries/${this.dictType}`, newEntry);
        if (resp.status == 200) {
          this.newAlert({ msg: "Правка отправлена", type: "success" });
          this.$store.commit("updateCurrentEntry", this.emptyJpEntry);
          this.$store.commit("updateCurrentImages", this.emptyImage);
          this.$router.push({ path: "/" }).catch(() => {});
        }
      }
    },
    cancelEdit() {
      this.editMode = false;
      this.updatePage();
    },
    updateJpEntry() {
      if (this.isNew) {
        this.$store.commit("updateCurrentEntry", this.emptyJpEntry);
        this.$store.commit("updateCurrentImages", this.emptyImage);
      } else {
        this.getCurrentEntry('dictionary/jap/entries/' + this.currentId);
        this.getCurrentSounds(this.currentId);
        this.getCurrentImages(this.currentId);
      }
    },
    updateExampleEntry() {
      if (this.isNew) {
        this.$store.commit("updateCurrentEntry", this.emptyEntry);
      } else {
        this.getCurrentEntry('dictionary/examples/entries/' + this.currentId);
      }
    },
    updateNameEntry() {
      if (this.isNew) {
        this.$store.commit("updateCurrentEntry", this.emptyEntry);
      } else {
        this.getCurrentEntry('dictionary/names/entries/' + this.currentId);
      }
    },
    updatePage() {
      this.$store.commit('updateEditComment', '');
      if (this.isDictType('jp')) this.updateJpEntry();
      if (this.isDictType('example')) this.updateExampleEntry();
      if (this.isDictType('name')) this.updateNameEntry();

      this.editMode = this.isNew;
    }
  },
  watch: {
    currentId() {
      this.updatePage();
    }
  },
  async mounted() {
    this.updatePage();
    this.fetchTags();
  },
  components: {
    JapEntryView, JapEntryEdit,
    DuplicatesChecker,
    GalleryComponent,
    EditComment,
    ReferencesList,
    StatusIcons,
    ExampleEntryView, ExampleEntryEdit,
    NameEntryView, NameEntryEdit
  },
  metaInfo() {
    return {
      title: this.currentTitle + " — НЯРС",
      meta: [
        {
          property: "og:title",
          content: `${this.currentTitle}`,
          vmid: "og:title"
        },
        {
          property: "og:description",
          content: `Японско-русский словарь | НЯРС`,
          vmid: "og:description"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.title-card {
  padding-right: 5px;
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

.example {
  font-size: 120%;

  rt {
    font-size: 60%;
    vertical-align: bottom;

  }
}

</style>
