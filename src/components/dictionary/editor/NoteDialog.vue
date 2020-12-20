<template>
  <div class="editor-dialog">
    <v-dialog :value="dialogModel(5)" @input="updateModel" max-width="700px">
      <v-card class="">
        <v-card-title>
          <span class="headline">Заметка</span>
        </v-card-title>
        <v-card-text>
          <v-textarea
            label="Заметка"
            id="note-area"
            v-model="note"
            @input="updateNote"
            auto-grow
            counter
          ></v-textarea>
          <BBCodePanel
            textAreaId="note-area"
            @changed="(...args) => updateWithNewValue(args[0])"
          />
        </v-card-text>

        <v-card-actions>
          <!-- <v-btn color="blue darken-1" text @click="removeCurrent">
            Удалить
          </v-btn> -->
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="updateModel"> ОК </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BBCodePanel from "@/components/dictionary/editor/BBCodePanel.vue";
export default {
  data: () => ({
    note: "",
  }),
  methods: {
    updateModel() {
      //editorUpdateNote
      this.note = "";
      this.$store.commit("resetDial");
    },
    updateNote() {
      this.$store.commit("editorUpdateNote", {
        index: this.dialogIndex(5),
        note: this.note,
      });
    },
    updateWithNewValue(newVal) {
      this.$store.commit("editorUpdateNote", {
        index: this.dialogIndex(5),
        note: newVal,
      });
    },
  },
  computed: {
    ...mapGetters(["currentNote", "dialogModel", "dialogIndex"]),
  },
  watch: {
    currentNote() {
      this.note = this.currentNote;
    },
  },
  components: { BBCodePanel },
};
</script>
