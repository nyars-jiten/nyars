<template>
  <div class="editor-dialog">
    <v-dialog :value="dialogModel(2)" @input="updateModel" max-width="700px">
      <v-card class="">
        <v-card-title>
          <span class="headline">Язык</span>
        </v-card-title>
        <v-card-text>
          <v-select
            :items="nokoriLangs"
            v-model="selectedLang"
            label="Язык"
          ></v-select>
        </v-card-text>

        <v-card-actions>
          <v-btn color="blue darken-1" text @click="updateModel">
            Отмена
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="createLang"> ОК </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    selectedLang: "",
    allowedLangs: ["rus", "eng", "lat", "jap"],
  }),
  methods: {
    createLang() {
      if (
        this.allowedLangs.includes(this.selectedLang) &&
        this.nokoriLangs.length > 0
      ) {
        this.$store.commit("editorAddLang", {
          lang: this.selectedLang,
          posIndex: this.dialogIndex(2),
        });
        this.selectedLang = "";
      }
      this.updateModel();
    },
    updateModel() {
      this.selectedLang = "";
      this.$store.commit("resetDial");
    },
  },
  computed: {
    ...mapGetters([
      "existingLangs",
      "currentEntry",
      "dialogModel",
      "dialogIndex",
      "getSubjectTags",
    ]),
    nokoriLangs: function () {
      const exists = this.existingLangs(this.dialogIndex(2));
      return this.allowedLangs.filter((lang) => !exists.includes(lang));
    },
  },
};
</script>
