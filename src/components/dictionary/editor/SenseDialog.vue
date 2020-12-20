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
              <v-col
                cols="12"
                md="12"
                v-for="(example, exampleId) in sense.examples"
                :key="example.id"
              >
                <v-row>
                  <v-col cols="12" md="1">
                    <v-btn
                      icon
                      x-small
                      @click="removeExample(exampleId)"
                      color="red"
                      ><v-icon>mdi-close</v-icon></v-btn
                    > </v-col
                  ><v-col cols="12" md="11">
                    <ExampleComponent :exampleRaw="example" />
                  </v-col>
                </v-row>
              </v-col>
              <v-btn color="blue darken-1" outlined @click="addExample">
                Добавить пример
              </v-btn>
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
import BBCodePanel from "@/components/dictionary/editor/BBCodePanel.vue";
export default {
  data: function () {
    return {
      sense: {},
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
    addExample() {
      this.sense.examples.push({ value: "", translation: "" });
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
  components: { TagSelector, ExampleComponent, BBCodePanel },
};
</script>
