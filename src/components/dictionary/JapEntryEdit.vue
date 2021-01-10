<template>
  <div class="jap-view">
    <v-container v-if="entry.entry">
      <!-- <v-container> -->
      <WordDialog />
      <!-- <LangDialog /> -->
      <NoteDialog />
      <PosDialog />
      <SenseDialog />
      <div class="words-header">
        <div
          class="word"
          v-for="(word, wordIndex) in entry.entry.words"
          :key="wordIndex"
        >
          <div class="word-writings">
            <div
              class="writing"
              v-for="writing in word.writings"
              :key="writing.id"
            >
              {{ writing.value }}
              <InlineTag
                v-if="writing.tag"
                v-bind:tags="writing.tag.values"
                :short="true"
                :lang="'rus'"
                :inf="true"
              />
            </div>
          </div>
          <div class="word-readings">
            <div
              class="reading"
              v-for="reading in word.readings"
              :key="reading.id"
            >
              {{ convertR(reading.value) }}
              <InlineTag
                v-if="reading.tag"
                v-bind:tags="reading.tag.values"
                :short="true"
                :lang="'rus'"
                :inf="true"
              />
            </div>
          </div>
          <v-btn icon small @click="openDialog(0, wordIndex)" color="primary"
            ><v-icon>mdi-pencil</v-icon></v-btn
          >
        </div>
        <v-btn text outlined small @click="addNewWord" color="primary"
          ><v-icon>mdi-plus</v-icon> чтение/написание</v-btn
        >
      </div>

      <div class="meaning-block">
        <div
          class="pos-meaning"
          v-for="(pos, posIndex) in entry.entry.meanings"
          :key="pos.id"
        >
          <div class="pos-list">
            <div class="pos" v-for="posval in pos.pos" :key="posval.id">
              {{ posval }}
            </div>
            <v-btn icon x-small @click="openDialog(1, posIndex)" color="primary"
              ><v-icon>mdi-pencil</v-icon></v-btn
            >
          </div>
          <div class="lang-meaning-block">
            <div
              class="lang-mean"
              v-for="(lm, lmIndex) in pos.langMeanings"
              :key="lmIndex"
            >
              <div class="lang">
                <v-btn
                  icon
                  x-small
                  @click="removeFromLM(posIndex, lmIndex)"
                  color="red"
                  ><v-icon>mdi-close</v-icon></v-btn
                >
                {{ getRusLang(lm.lang) }}
              </div>
              <div class="senses">
                <div
                  class="sense sense-grid"
                  v-for="(sense, senseIndex) in lm.senses"
                  :key="senseIndex"
                >
                  <div class="sense-num">
                    <v-btn
                      icon
                      x-small
                      @click="openDialog(4, [posIndex, lmIndex, senseIndex])"
                      color="primary"
                      ><v-icon>mdi-pencil</v-icon></v-btn
                    >
                    <template v-if="lm.senses.length > 1">
                      {{ 1 + senseIndex }}&#41;
                    </template>
                  </div>

                  <div class="sense-text">
                    <InlineTag
                      v-bind:tags="filterTags(sense.tags, ['Fld'])"
                      v-bind:short="true"
                      v-bind:lang="lm.lang"
                    />
                    <!-- {{ sense.value }} -->
                    <div class="entry-text-md" v-html="convertBB(sense.value)" style="white-space: pre-wrap" align="left" />
                    <InlineTag
                      v-bind:tags="filterTags(sense.tags, ['Dial', 'Misc'])"
                      v-bind:lang="lm.lang"
                    />

                    <div class="examples-block">
                      <div
                        class="example"
                        v-for="example in sense.examples"
                        :key="example.id"
                      >
                        <span>{{ example.value }} </span>
                        <span></span>
                        <span>{{ example.translation }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <v-btn
                  text
                  x-small
                  @click="addSense(posIndex, lmIndex)"
                  color="primary"
                  ><v-icon>mdi-plus</v-icon> значение</v-btn
                >
                <div
                  class="note text-justify"
                  style="white-space: pre-wrap"
                  v-if="lm.note"
                >
                  <span>※</span>
                  <span v-html="convertBB(lm.note)"></span>
                </div>
                <v-btn
                  text
                  x-small
                  @click="openDialog(5, [posIndex, lmIndex])"
                  color="primary"
                >
                  <v-icon>mdi-file-document-edit-outline</v-icon>
                  заметка
                </v-btn>
              </div>
              <hr
                class="lang-sep"
                v-if="lmIndex + 1 < pos.langMeanings.length"
              />
            </div>
            <div
              class="lang-btn pa-3 pl-6"
              v-if="nokoriLangs(posIndex).length > 0"
            >
              <!-- <v-btn outlined text small @click="openDialog(2, posIndex)" color="primary" > -->
              <div class="add-lang">
                Добавить язык:
                <div
                  class="lang-btn"
                  v-for="lang in allowedLangs"
                  :key="lang.id"
                >
                  <div
                    class="lang-add-comp"
                    v-if="nokoriLangs(posIndex).includes(lang)"
                  >
                    <v-btn
                      outlined
                      text
                      small
                      color="primary"
                      @click="createLang(lang, posIndex)"
                      ><v-icon>mdi-plus</v-icon>{{ lang }}</v-btn
                    >
                  </div>
                </div>
              </div>
              <!-- </v-btn> -->
            </div>
          </div>
        </div>
        <div class="pos-btn pa-3 new-pos-btn">
          <v-btn outlined text small @click="addPos()" color="primary"
            ><v-icon>mdi-plus</v-icon> часть речи</v-btn
          >
        </div>
      </div>

      <v-autocomplete
        class="writing-input"
        label="Теги"
        multiple
        small-chips
        deletable-chips
        item-text="descr"
        item-value="val"
        :items="tagList"
        v-model="entry.entry.tags"
      ></v-autocomplete>
      <v-textarea label="Питч-акцент" v-model="entry.entry.pitchAccent" auto-grow rows="1"></v-textarea>
    </v-container>
  </div>
</template>

<script>
import sc from "@/core/scriptConverter.js";
import bb from "@/core/bbCodes.js";
import commonTags from "@/data/commonTags.json";
import InlineTag from "@/components/dictionary/InlineTag.vue";
import WordDialog from "@/components/dictionary/editor/WordDialog.vue";
import SenseDialog from "@/components/dictionary/editor/SenseDialog.vue";
import PosDialog from "@/components/dictionary/editor/PosDialog.vue";
import NoteDialog from "@/components/dictionary/editor/NoteDialog.vue";
// import LangDialog from '@/components/dictionary/editor/LangDialog.vue';
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data: () => ({
    // dialogs: [false],
    // dialogIndex: -1
    allowedLangs: ["rus", "eng", "lat", "jap"],
    tags: commonTags,
  }),
  computed: {
    ...mapGetters(["currentSounds", "existingLangs"]),
    nokoriLangsComp: function () {
      const exists = this.existingLangs(this.dialogIndex(2));
      return this.allowedLangs.filter((lang) => !exists.includes(lang));
    },
    tagList() {
      return Object.keys(this.tags).map(
        (key) => new Object({ descr: this.tags[key].text, val: key })
      );
    }
  },
  methods: {
    ...mapMutations([
      "addNewWord",
      "updateEditorDialState",
      "editorAddSense",
      "editorAddPos",
      "editorAddLang",
    ]),
    ...mapActions(["startDublicatesSearch"]),
    removeFromLM: function (posIndex, lmIndex) {
      this.$store.commit("editorRemoveLang", { posIndex, lmIndex });
    },
    createLang(lang, posIndex) {
      if (this.allowedLangs.includes(lang) && this.nokoriLangs.length > 0) {
        this.$store.commit("editorAddLang", { lang: lang, posIndex: posIndex });
      }
    },
    // notExistingLang(lang, posIndex) {
    //     console.log(lang)
    //     return this.nokoriLangsComp.includes(lang)
    // },
    convertBB(sense) {
      return bb.bbCodesProcess(sense);
    },
    nokoriLangs: function (index) {
      const exists = this.existingLangs(index);
      return this.allowedLangs.filter((lang) => !exists.includes(lang));
    },
    openDialog(dialog, index) {
      this.updateEditorDialState({ dialog, index });
    },
    addPos() {
      this.editorAddPos();
    },
    addSense(posIndex, lmIndex) {
      this.editorAddSense({ posIndex, lmIndex });
    },
    filterTags(tags, type) {
      let filtered = tags.filter((tagObj) => type.includes(tagObj.type));
      if (filtered.length < 1) return [];

      return filtered
        .map(function (tagList) {
          return tagList.values;
        })
        .flat();
    },
    convertR(raw) {
      return sc.scriptConvert(raw);
    },
    getRusLang(lang) {
      switch (lang) {
        case "rus":
          return "рус";
        case "eng":
          return "анг";
        case "jap":
          return "япо";
        case "lat":
          return "лат";
        default:
          return "";
      }
    },
  },
  async mounted() {
    this.startDublicatesSearch();
  },
  props: {
    entry: Object,
  },
  components: {
    InlineTag,
    WordDialog,
    NoteDialog,
    PosDialog,
    SenseDialog,
  },
};
</script>

<style lang="scss">
.new-pos-btn {
  border-top: 1px solid black;
}

.lang-btn {
  display: inline;
}

.lang-add-comp {
  display: inline;
  padding-left: 5px;
  padding-right: 5px;
}

.note-block {
  overflow-wrap: break-word;
}

.lang-sep {
  grid-column: 1/-1;
  border: unset;
  border-bottom: 1px solid hsla(0, 0%, 56.1%, 0.34);
  margin: 0 30px;
}

.sense-grid {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 5px;
}

.note {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
}

.examples-block {
  margin-left: 10px;
}

.example {
  color: var(--v-jap-entry-edit-example-color-base);
  border-left: 3px solid var(--v-jap-entry-edit-example-border-color-base);
  padding-left: 5px;
  margin-bottom: 6px;
  margin-top: 6px;
}

.sense {
  padding: 0;
  margin: 0;
}

.lang {
  font-style: italic;
  color: var(--v-jap-entry-edit-lang-color-base);
}

.lang-mean {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  margin: 0 10px;
  padding: 10px;
}

.pos-list {
  display: block;
  border-bottom: 1px solid var(--v-jap-entry-edit-pos-color-base);
  padding: 6px;
}

.pos {
  font-size: 16px;
  display: inline;
  text-transform: uppercase;
}

.word {
  margin-top: 3px;
  margin-bottom: 3px;
}

.jap-view {
  width: 100%;
  padding-bottom: 20px;
}

.word-writings,
.word-readings,
.writing,
.reading {
  font-size: 22px;
  display: inline-block;
}

.word-writings {
  &::after {
    color: var(--v-text-decoration-color-base);
    content: "】";
  }

  &::before {
    color: var(--v-text-decoration-color-base);
    content: "【";
  }
}

.writing,
.reading,
.pos {
  &:not(:last-child) {
    &::after {
      color: var(--v-text-decoration-color-base);
      //   white-space: pre;
      content: "・";
    }
  }
}
</style>
