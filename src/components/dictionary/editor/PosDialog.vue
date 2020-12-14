<template>
  <div class="editor-dialog">
    <v-dialog :value="dialogModel(1)" @input="updateModel" max-width="700px">
      <v-card>
        <v-card-title>
            <span class="headline">Часть речи</span>
        </v-card-title>
        <v-card-text>
          <v-container v-if="currentEntry.entry.meanings[currIndex]">
            <v-autocomplete
              class="writing-input"
              label="Теги"
              multiple
              chips
              deletable-chips
              item-text="rus"
              item-value="engShort"
              :items="tagList"
              v-model="selectedPos"
            ></v-autocomplete>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-btn color="red darken-1" text @click="removeCurrent">
            Удалить блок
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="updateModel">
            ОК
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
      selectedPos: []
  }),
  methods: {
    removeCurrent() {
      this.$store.commit("editorRemovePosBlock", { index: this.dialogIndex(1) });
      this.$store.commit("resetDial");
    },
    updateModel() {
      this.$store.commit("resetDial");
    },
  },
  computed: {
    ...mapGetters([
      "currentEntry",
      "dialogModel",
      "dialogIndex",
      "getSubjectTags",
    ]),
    selectedTags: function() {
        if (this.currIndex < 0) return [];
        if (!this.currentEntry.entry.meanings[this.currIndex]) return [];
        return this.currentEntry.entry.meanings[this.currIndex].pos;
    },
    tagList: function() {
      return this.getSubjectTags('Pos');
    },
    currentObj: function() {
      const dst = this.dialogIndex(1);
      return this.currentEntry.entry.meanings[dst].pos;
    },
    currModel: function() {
      if (!this.dialogModel) return false;
      return this.dialogModel[1];
    },
    currIndex: function() {
      return this.dialogIndex(1);
    },
  },
  watch: {
      selectedTags() {
          this.selectedPos = this.selectedTags;
      },
      selectedPos () {
        if (this.currIndex > -1) {
          this.currentEntry.entry.meanings[this.currIndex].pos = this.selectedPos;
        }
      }
  }
};
</script>
