<template>
  <div class="tags-list">
    <v-data-table
      :headers="headers"
      :items='currentTags'
      sort-by="rus"
      class="elevation-1"
      disable-pagination
      hide-default-footer
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" outlined dark class="mb-2" v-bind="attrs" v-on="on">
                Создать
              </v-btn>
            </template>
            <v-card class="">
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.rusShort"
                        label="rusShort"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.rus"
                        label="rus"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.engShort"
                        label="engShort"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.eng"
                        label="eng"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Отмена
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Сохранить
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card class="">
              <v-card-title class="headline"
                >Вы уверены, что хотите удалить тег?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Отмена</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >Да</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <!-- <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon> -->
      </template>
      <!-- <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">
          Reset
        </v-btn>
      </template> -->
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { sendPostRequest } from '@/core/apiRequests.js';
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "rusShort", value: "rusShort" },
      { text: "rus", value: "rus" },
      { text: "engShort", value: "engShort" },
      { text: "eng", value: "eng" },
      { text: 'Действия', value: 'actions', sortable: false },
    ],
    currentTags: [],
    editedIndex: -1,
    editedItem: {
      rus: "",
      rusShort: "",
      eng: "",
      engShort: "",
      category: ""
    },
    defaultItem: {
      rus: "",
      rusShort: "",
      eng: "",
      engShort: "",
      category: ""
    },
  }),
  created: function() {
      this.currentTags = this.getSubjectTags(this.tagSubject);
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Создать" : "Отредактировать";
    },
    tagsFiltered() {
        return this.getSubjectTags(this.tagSubject);
    },
    ...mapGetters(["getSubjectTags"]),
  },
  watch: {
    tagsFiltered() {
        this.currentTags = this.getSubjectTags(this.tagSubject);
    },
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    ...mapActions(['newAlert']),
    editItem(item) {
      this.editedIndex = this.currentTags.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.currentTags.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.currentTags.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      this.editedItem.category = this.tagSubject;
      if (this.editedIndex > -1) {
        const resp = await sendPostRequest('dictionary/jap/tags/' + this.editedItem.id, this.editedItem);
        if (resp.status == 200) {
            this.newAlert({ msg: 'Изменения тега сохранены', type: 'success'});
        }
        Object.assign(this.currentTags[this.editedIndex], this.editedItem);

      } else {
        const resp = await sendPostRequest('dictionary/jap/tags/', this.editedItem);
        if (resp.status == 200) {
            this.newAlert({ msg: 'Тег добавлен', type: 'success'});
        }

        this.currentTags.push(this.editedItem);
      }
      this.close();
    },
  },
  props: {
    title: String,
    tagSubject: String,
  },
};
</script>


<style lang="scss">
.tags-list {
    padding: 10px;
}
</style>
