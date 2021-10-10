<template>
  <div class="editor-dialog">
    <v-dialog :value="dialogModel(4)" @input="updateModel" max-width="700px">
      <v-card class="" v-if="sense">
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="12">
                <v-textarea
                  id="sense-area"
                  label="Значение"
                  v-model="sense.value"
                  rows="1"
                  auto-grow
                  counter
                ></v-textarea>
                <BBCodePanel
                  textAreaId="sense-area"
                  @changed="(...args) => (sense.value = args[0])"
                />
              </v-col>
              <v-col cols="12" md="12">
                <TagSelector
                  :initSelected="validateTag('Fld')"
                  :type="'Fld'"
                  title="Тематика"
                  @changeTags="(...args) => updateTags('Fld', ...args)"
                />
              </v-col>
              <v-col cols="12" md="6">
                <TagSelector
                  :initSelected="validateTag('Misc')"
                  :type="'Misc'"
                  title="Теги"
                  @changeTags="(...args) => updateTags('Misc', ...args)"
                />
              </v-col>
              <v-col cols="12" md="6">
                <TagSelector
                  :initSelected="validateTag('Dial')"
                  title="Диалект"
                  :type="'Dial'"
                  @changeTags="(...args) => updateTags('Dial', ...args)"
                />
              </v-col>
              <v-col cols="12" md="12">
                <div class="tabs-wrapper">
                  <div class="tabs">
                    <v-tabs v-model="tabs">
                      <v-tab href="#addition-1">Примеры</v-tab>
                      <v-tab href="#addition-2">Ссылки</v-tab>
                      <v-tab href="#addition-3">Заимствование</v-tab>
                    </v-tabs>
                  </div>
                  <v-tabs-items v-model="tabs">
                    <v-tab-item value="addition-1">
                      <v-col
                        cols="12"
                        md="12"
                        v-for="(example, exampleId) in sense.examples"
                        :key="sense.examples.length * exampleId"
                      >
                        <v-row>
                          <v-col cols="12" md="1">
                            <v-btn
                              icon
                              x-small
                              @click="removeExample(exampleId)"
                              color="red"
                              ><v-icon>mdi-close</v-icon>
                            </v-btn>
                          </v-col>
                          <v-col cols="12" md="11">
                            <ExampleComponent :exampleRaw="example" />
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-btn color="blue darken-1" outlined @click="addExample">
                        Добавить пример
                      </v-btn>
                    </v-tab-item>
                    <v-tab-item value="addition-2">
                      <v-col
                        cols="12"
                        md="12"
                        v-for="(ref, refId) in sense.references"
                        :key="sense.references.length * refId"
                      >
                        <v-row>
                          <v-col cols="12" md="1">
                            <v-btn
                              icon
                              x-small
                              @click="removeRef(refId)"
                              color="red"
                              ><v-icon>mdi-close</v-icon>
                            </v-btn>
                          </v-col>
                          <v-col cols="12" md="11">
                            <ReferenceComponent :refRaw="ref" />
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-btn color="blue darken-1" outlined @click="addReference">
                        Добавить ссылку
                      </v-btn>
                    </v-tab-item>
                    <v-tab-item value="addition-3">
                      <v-col
                        cols="12"
                        md="12"
                        v-for="(lsource, lsId) in sense.loanSources"
                        :key="sense.loanSources.length * lsId"
                      >
                        <v-row>
                          <v-col cols="12" md="1">
                            <v-btn
                              icon
                              x-small
                              @click="removeLSource(lsId)"
                              color="red"
                              ><v-icon>mdi-close</v-icon>
                            </v-btn>
                          </v-col>
                          <v-col cols="12" md="11">
                            <LoanSourceComponent :sourceRaw="lsource" />
                          </v-col>
                        </v-row>
                      </v-col>
                      <p>
                        Код языка указывается в соответствии со стандартом <a href="https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D0%B4%D1%8B_%D1%8F%D0%B7%D1%8B%D0%BA%D0%BE%D0%B2#%D0%9A%D0%BE%D0%B4%D1%8B_%D1%8F%D0%B7%D1%8B%D0%BA%D0%BE%D0%B2_%D0%BF%D0%BE_ISO_639_%D0%B8_%D0%93%D0%9E%D0%A1%D0%A2_7.75-97" target="_blank">ISO 639-3</a>
                      </p>
                      <v-btn color="blue darken-1" outlined @click="addLoanSource">
                        Добавить источник заимствования
                      </v-btn>
                    </v-tab-item>
                  </v-tabs-items>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-btn color="red darken-1" text @click="removeCurrentSense">
            Удалить
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="updateModel"> ОК </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TagSelector from "@/components/dictionary/editor/TagSelector.vue";
import ExampleComponent from "@/components/dictionary/editor/ExampleComponent.vue";
import ReferenceComponent from "@/components/dictionary/editor/ReferenceComponent.vue";
import LoanSourceComponent from "@/components/dictionary/editor/LoanSourceComponent.vue";
import BBCodePanel from "@/components/dictionary/editor/BBCodePanel.vue";

export default {
  data: function () {
    return {
      sense: {},
      tabs: null,
    };
  },
  methods: {
    removeCurrentSense() {
      this.$store.commit("editorRemoveSense", { index: this.dialogIndex(4) });
      this.updateModel();
    },
    removeExample(index) {
      this.sense.examples.splice(index, 1);
    },
    removeRef(refId){
      this.sense.references.splice(refId, 1);
    },
    removeLSource(lsId){
      this.sense.loanSources.splice(lsId, 1);
    },
    addExample() {
      this.sense.examples.push({ value: "", translation: "" });
    },
    addReference() {
      this.sense.references.push({ target: "", translation: "", referenceType: 0 });
    },
    addLoanSource() {
      if (this.sense.loanSources == null) this.sense.loanSources = [];
      this.sense.loanSources.push({ lang: "", word: ""});
    },
    updateModel() {
      this.selectedLang = "";
      this.$store.commit("resetDial");
    },
    updateTags(type, tags) {
      let filteredTags = this.sense.tags.filter((tag) => {
        return tag.type !== type;
      });
      filteredTags.push({ type, values: tags });
      this.sense.tags = filteredTags;
    },
    validateTag(type) {
      if (typeof this.sense.tags == "undefined" || this.sense.tags.length < 1)
        return [];
      const findTag = this.sense.tags.find((tag) => tag.type == type);
      if (typeof findTag == "undefined") return [];
      return findTag.values;
    },
  },
  computed: {
    ...mapGetters(["currentEntry", "dialogModel", "dialogIndex"]),
    currentObj: function () {
      const dst = this.dialogIndex(4);
      if (typeof this.currentEntry.entry.meanings[dst[0]] === "undefined")
        return {};
      return this.currentEntry.entry.meanings[dst[0]].langMeanings[dst[1]]
        .senses[dst[2]];
    },
  },
  watch: {
    currentObj() {
      this.sense = this.currentObj;
    },
  },
  components: {
    TagSelector,
    ExampleComponent,
    BBCodePanel,
    ReferenceComponent,
    LoanSourceComponent
  },
};
</script>

<style lang="scss">
.tabs {
  margin: 20px;
}
</style>
