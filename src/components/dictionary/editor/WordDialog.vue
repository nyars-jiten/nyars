<template>
  <div class="editor-dialog">
    <v-dialog :value="dialogModel(0)" @input="updateModel" max-width="700px">
      <v-card class="">
        <!-- <v-card-title>
          <span class="headline">Написание/чтение</span>
        </v-card-title> -->
        <v-card-text>
          <v-container v-if="currentObj">
            <!-- {{currentObj}} -->
            <v-row
              v-for="(writing, writingIndex) in currentObj.writings"
              :key="writing.id"
            >
              <v-col cols="12" md="6">
                <v-row>
                  <v-col cols="12" md="1">
                    <v-btn
                      icon
                      x-small
                      @click="removeFromWriting(writingIndex)"
                      color="red"
                      ><v-icon>mdi-close</v-icon></v-btn
                    > </v-col
                  ><v-col cols="12" md="11">
                    <v-text-field
                      v-model="writing.value"
                      label="Написание"
                      class="writing-input"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="6">
                <TagSelector
                  :initSelected="validateTag(writing)"
                  :type="'Kinf'"
                  @changeTags="
                    (...args) => changeWritingTags(writingIndex, ...args)
                  "
                />
              </v-col>
            </v-row>
            <div class="dial-btn">
              <v-btn outlined small @click="addWriting()" color="primary"
                ><v-icon>mdi-plus</v-icon> написание</v-btn
              >
            </div>
            <v-divider style="padding: 20px"></v-divider>
            <v-row
              v-for="(readings, rIndex) in currentObj.readings"
              :key="readings.id"
            >
              <v-col cols="12" md="6">
                <v-row>
                  <v-col cols="12" md="1">
                    <v-btn
                      icon
                      x-small
                      @click="removeFromReading(rIndex)"
                      color="red"
                      ><v-icon>mdi-close</v-icon></v-btn
                    > </v-col
                  ><v-col cols="12" md="11">
                    <v-text-field
                      v-model="readings.value"
                      label="Чтение"
                      class="writing-input"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="4">
                <TagSelector
                  :initSelected="validateTag(readings)"
                  :type="'Rinf'"
                  @changeTags="(...args) => changeReadingTags(rIndex, ...args)"
                />
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field
                  v-model="readings.pitch"
                  label="Питч"
                  class="writing-input"
                />
              </v-col>
            </v-row>
            <div class="dial-btn">
              <v-btn outlined small @click="addReading()" color="primary"
                ><v-icon>mdi-plus</v-icon> чтение</v-btn
              >
            </div>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-btn color="red darken-1" text @click="removeCurrent">
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
import { mapGetters, mapActions } from "vuex";
import Vue from "vue";
import TagSelector from "@/components/dictionary/editor/TagSelector.vue";
export default {
  data: () => ({
    // writingTags: [],
    readingTags: [],
  }),
  methods: {
    ...mapActions(["startDublicatesSearch"]),
    changeWritingTags(index, values) {
      const newValue = {
        value: this.currentObj.writings[index].value,
        tag: { type: "Kinf", values },
      };
      Vue.set(this.currentObj.writings, index, newValue);
    },
    changeReadingTags(index, values) {
      const newValue = {
        value: this.currentObj.readings[index].value,
        tag: { type: "Rinf", values },
      };
      Vue.set(this.currentObj.readings, index, newValue);
    },
    validateTag(vals) {
      if (!vals.tag) return [];
      return vals.tag.values;
    },
    removeCurrent() {
      this.$store.commit("editorRemoveWord", { index: this.dialogIndex(0) });
      this.$store.commit("resetDial");
    },
    removeFromWriting(removeIndex) {
      this.currentObj.writings.splice(removeIndex, 1);
    },
    removeFromReading(removeIndex) {
      this.currentObj.readings.splice(removeIndex, 1);
    },
    addReading() {
      this.currentObj.readings.push({
        value: "",
        tag: { type: "Rinf", values: [] },
      });
    },
    addWriting() {
      this.currentObj.writings.push({
        value: "",
        tag: { type: "Kinf", values: [] },
      });
    },
    updateModel() {
      this.startDublicatesSearch({});
      this.$store.commit("resetDial");
    },
    tagList(subject) {
      return this.getSubjectTags(subject);
    },
  },
  // beforeDestroy() {
  //     this.startDublicatesSearch();
  // },
  // watch: {
  //     dialogModel(newVal, oldVal) {
  //         console.log(newVal);
  //         console.log(oldVal);
  //     }
  // },
  computed: {
    ...mapGetters([
      "currentEntry",
      "dialogModel",
      "dialogIndex",
      "getSubjectTags",
    ]),
    currentObj: function () {
      const dst = this.dialogIndex(0);
      return this.currentEntry.entry.words[dst];
    },
    currModel: function () {
      if (!this.dialogModel) return false;
      return this.dialogModel[0];
    },
    writingTagsComp: {
      get() {
        let res = [];
        if (!this.currentObj) return res;
        this.currentObj.writings.forEach(function (writ, wI) {
          if (!writ.tag) {
            res[wI] = [];
          } else {
            res[wI] = writ.tag.values;
          }
        });
        return res;
      },
      set(newValue) {
        // console.log(newValue);
        newValue.forEach((writ, wI) => {
          const curTag = { type: "Kinf", values: writ };
          this.currentObj.writings[wI].tag = curTag;
        });
      },
    },
    readingTagsComp: function () {
      let res = [];
      if (!this.currentObj) return res;
      this.currentObj.readings.forEach(function (read, rI) {
        if (!read.tag) {
          res[rI] = [];
        } else {
          res[rI] = read.tag.values;
        }
      });
      return res;
    },
  },
  components: { TagSelector },
  // watch: {
  //     writingTagsComp() {
  //         this.writingTags = this.writingTagsComp;
  //     },
  //     readingTagsComp () {
  //         this.readingTags = this.readingTagsComp;
  //     },
  //     writingTags(oldst, newst) {
  //         console.log(oldst, newst);
  //         if (oldst == newst) return;
  //         // if (this.writingTags.length == 0) return;
  //         this.writingTags.forEach((writ, wI) => {
  //             const curTag = {type: 'Kinf', values: writ};
  //             this.currentObj.writings[wI].tag = curTag;
  //         });
  //     },
  //     // readingTags () {
  //     //     // this.readingTags.forEach((read, rI) => {
  //     //     //     const curTag = {type: 'Rinf', values: read};
  //     //     //     this.currentObj.readings[rI].tag = curTag;
  //     //     // });
  //     // }
  // }
};
</script>

<style lang="scss" scoped>
// .v-text-field {
//   padding: 0 !important;
// }

.dial-btn {
  padding-bottom: 30px;
}

// .writing-dial,
// .writing-input {
//   display: inline;
// }
</style>
