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
        <draggable
          v-model="entry.entry.words"
          group="words"
          handle=".handle"
          @start="drag=true"
          @end="drag=false"
        >
          <div
            class="word"
            v-for="(word, wordIndex) in entry.entry.words"
            :key="wordIndex"
          >
            <v-icon class="handle">mdi-drag</v-icon>
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
              <div class="jpn-reading">
                <PitchAccent
                  :pitch="reading.pitchedReading"
                  :trscpt="convertToTrscr(reading.value)"
                  :kana="convertR(reading.value)"
                  :tags="reading.tag"
                />
              </div>
            </div>
          </div>
            <v-btn icon small @click="openDialog(0, wordIndex)" color="primary"
              ><v-icon>mdi-pencil</v-icon></v-btn
            >
          </div>
        </draggable>
        <v-btn text outlined small @click="addNewWord" color="primary"
          ><v-icon>mdi-plus</v-icon> чтение/написание</v-btn
        >
      </div>

      <div class="meaning-block" v-if="!entry.entry.externalEntry">
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
                <draggable
                  v-model="lm.senses"
                  group="senses"
                  handle=".handle"
                  @start="drag=true"
                  @end="drag=false"
                >
                  <div
                    class="sense sense-grid"
                    v-for="(sense, senseIndex) in lm.senses"
                    :key="sense.id"
                  >
                    <div class="sense-num">
                        <v-btn
                          icon
                          x-small
                          @click="openDialog(4, [posIndex, lmIndex, senseIndex])"
                          color="primary"
                          ><v-icon>mdi-pencil</v-icon></v-btn
                        >
                        <v-icon class="handle">mdi-drag</v-icon>
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
                          :loanSources="sense.loanSources"
                        />

                        <div class="references-block">
                          <div
                            class="reference"
                            v-for="ref in sense.references"
                            :key="ref.id"
                          >
                            <span>⇒
                              <span class="ref-type">{{ getReferenceType(ref.referenceType, lm.lang) }}</span>
                              <router-link
                                class="entry-reference-link"
                                :to="{ name: 'dict-entry', params: { id: ref.target, type: 'jp' } }"
                                v-if="ref.target && ref.target.length >= 4"
                              >{{ ref.value }}</router-link>
                              <router-link
                                class="entry-reference-link"
                                :to="{ name: 'search', query: { r: ref.value } }"
                                v-else
                              >{{ ref.value }}</router-link>
                            </span>
                          </div>
                        </div>

                        <div class="examples-block">
                          <div
                            class="example"
                            v-for="example in sense.examples"
                            :key="example.id"
                          >
                            <span v-html="exBbCodes(example.value)"></span>
                            <span></span>
                            <span class="example-translation">{{ example.translation }}</span>
                          </div>
                        </div>
                    </div>
                  </div>
                </draggable>
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
      <div v-else>
        <span class="external-entry-msg">
          В связанных статьях значения берутся из основной статьи.<br>
          Для редактирования значений необходимо отвязать статью или отредактировать <router-link
            class="entry-reference-link"
            :to="{ name: 'dict-entry', params: { id: entry.entry.externalEntry, type: 'jp' } }"
            target='_blank'
            v-text="'основную'"
          />.
        </span>
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
      <v-row>
        <v-col cols="12" md="8">
          <v-textarea label="Питч-акцент" v-model="entry.entry.pitchAccent" auto-grow rows="1" readonly />
        </v-col>
        <v-col cols="12" md="4">
          <div class="templates">
            Шаблоны: <span class="template-button" @click="useNTemplate">N</span>
          </div>
        </v-col>
        <v-col cols="12" md="12">
          <div class="external-entry">
            <span>Внешняя статья: </span>
            <div class="external-entry-block" v-if="entry.entry.externalEntry" >
              <router-link
                class="entry-reference-link"
                :to="{ name: 'dict-entry', params: { id: entry.entry.externalEntry, type: 'jp' } }"
                target='_blank'
                v-text="entry.entry.externalEntry"
              />
              <v-btn color="primary" class="ma-2" dark small outlined @click="extEntryRmLink" v-text="'Отвязать'" />
            </div>
            <div class="external-entry-block" v-else>
              <v-textarea class="external-wid-input ma-2" label="ID" v-model="externalEntryWid" auto-grow rows="1" />
              <v-btn color="primary" class="ma-2" dark small outlined @click="extEntryLink" v-text="'Привязать'" />
              <v-btn color="primary" class="mr-2" dark small outlined @click="extEntryCopy" v-text="'Скопировать'" />
              <!-- <v-btn color="primary" class="mr-2" dark small outlined v-text="'Скопировать со ссылкой'" /> -->
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { transcriptionConvert } from "@/core/scriptConverter.js";
import Vue from 'vue';
import draggable from 'vuedraggable'
import { bbCodesProcess, examplesBbCodesProcess }  from "@/core/bbCodes.js";
import commonTags from "@/data/commonTags.json";
import InlineTag from "@/components/dictionary/InlineTag.vue";
import WordDialog from "@/components/dictionary/editor/WordDialog.vue";
import referenceTypes from "@/data/referenceTypes.json";
import SenseDialog from "@/components/dictionary/editor/SenseDialog.vue";
import PosDialog from "@/components/dictionary/editor/PosDialog.vue";
import NoteDialog from "@/components/dictionary/editor/NoteDialog.vue";
import PitchAccent from "@/components/dictionary/PitchAccent.vue";
// import LangDialog from '@/components/dictionary/editor/LangDialog.vue';
import { mapGetters, mapMutations, mapActions } from "vuex";
import { sendGetRequest } from '@/core/apiRequests.js';
export default {
  data: () => ({
    // dialogs: [false],
    // dialogIndex: -1
    allowedLangs: ["rus", "eng", "lat", "jap"],
    tags: commonTags,
    refType: referenceTypes,
    externalEntryWid: '',
    templateEntryN: {
      entry: {
        "words":[{"writings":[{"value":"—","tag":{"type":"Kinf","values":[]}}],
        "readings":[{"value":"—","tag":{"type":"Rinf","values":[]}}]}],
        "meanings":[{"pos":["n"],
        "langMeanings":[
          {"lang":"rus","senses":[{"tags":[],"value":"новое значение","examples":[],"references":[],"loanSources":[]}],"note":""},
          {"lang":"eng","senses":[{"tags":[],"value":"новое значение","examples":[],"references":[],"loanSources":[]}],"note":""}
        ]}]
      },
    },
  }),
  computed: {
    ...mapGetters(["currentSounds", "existingLangs", 'siteTranscriptions']),
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
    exBbCodes(text){
      return examplesBbCodesProcess(text);
    },
    getReferenceType(value, lang) {
      return this.refType[value].translation[lang] + ' ';
    },
    useNTemplate() {
      this.$store.commit("serializeTextEntry", this.templateEntryN.entry);
    },
    removeFromLM: function (posIndex, lmIndex) {
      this.$store.commit("editorRemoveLang", { posIndex, lmIndex });
    },
    createLang(lang, posIndex) {
      if (this.allowedLangs.includes(lang) && this.nokoriLangs.length > 0) {
        this.$store.commit("editorAddLang", { lang: lang, posIndex: posIndex });
      }
    },
    extEntryLink() {
      this.entry.entry.externalEntry = this.externalEntryWid;
      Vue.set(this.entry, 'entry.externalEntry', this.externalEntryWid);
      console.log(this.entry.entry.externalEntry);
    },
    extEntryRmLink() {
      this.externalEntryWid = '';
      this.extEntryLink();
    },
    async extEntryCopy() {
      const resp = await sendGetRequest("dictionary/jap/get-external-entry?wid=" + this.externalEntryWid);
      if (resp.status == 200) {
        this.entry.entry.meanings = resp.data.meanings;
      }
    },
    convertToTrscr(raw) {
      return transcriptionConvert(raw, 'kiriji', this.siteTranscriptions);
    },
    // notExistingLang(lang, posIndex) {
    //     console.log(lang)
    //     return this.nokoriLangsComp.includes(lang)
    // },
    convertBB(sense) {
      return bbCodesProcess(sense);
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
      return transcriptionConvert(raw, 'hiragana', this.siteTranscriptions);
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
    draggable,
    PitchAccent
  },
};
</script>

<style lang="scss">
.reading-inline-tags {
  vertical-align: top;
  position: absolute;
}

.external-wid-input {
  width: 60px;
}

.external-entry,
.external-entry-msg {
  font-size: 120%;
}

.external-entry-block,
.external-wid-input {
  display: inline-block;
}

.handle {
  color: var(--v-text-decoration-color-base);
  cursor: move;
}

.new-pos-btn {
  border-top: 1px solid black;
}

.references-block {
  padding-left: 10px;
  font-style: italic;
}

.templates {
  padding-top: 10px;
}

.template-button {
  cursor: pointer;
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

.sense-text, .sense-num {
  display: inline-block;
  vertical-align: top;
}

.sense-num {
  margin-right: 5px;
}

.sense-grid {
  // display: grid;
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

.example-translation {
  padding-left: 5px;
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
