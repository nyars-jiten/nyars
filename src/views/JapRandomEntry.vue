<template>
  <div class="random-page">
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="12" sm="12" xs="12">
          <v-card class="" elevation="2" outlined tile>
            <v-card-title> Случайная статья </v-card-title>
            <v-card-text>
              <!-- <v-checkbox
                class="checkbox-line-element"
                v-model="selected"
                label="Без русского перевода"
                value="!rus"
              ></v-checkbox>
              <v-checkbox
                class="checkbox-line-element"
                v-model="selected"
                label="С русским переводом"
                value="rus"
              ></v-checkbox>
              <v-checkbox
                v-model="selected"
                label="Без английского перевода"
                value="!eng"
              ></v-checkbox>
              <v-checkbox
                v-model="selected"
                label="Неотредактированная"
                value="!rev"
              ></v-checkbox> -->
              <v-row>
                <v-col cols="12" md="4" sm="12" >
                  <v-select
                    :items="ruSenseItems"
                    label="Русское значение"
                    v-model="ruSenseValue"
                    item-text="value"
                    item-value="key"
                    clearable
                    outlined
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4" sm="12" >
                  <v-select
                    :items="engSenseItems"
                    label="Английское значение"
                    v-model="engSenseValue"
                    item-text="value"
                    item-value="key"
                    clearable
                    outlined
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4" sm="12" >
                  <v-select
                    :items="jpnSenseItems"
                    label="Японское значение"
                    v-model="jpnSenseValue"
                    item-text="value"
                    item-value="key"
                    clearable
                    outlined
                  ></v-select>
                </v-col>
                <v-col cols="12" md="6" sm="12" >
                  <v-select
                    :items="statusItems"
                    label="Статус"
                    v-model="statusValue"
                    item-text="value"
                    item-value="key"
                    clearable
                    outlined
                  ></v-select>
                </v-col>
                <v-col cols="12" md="6" sm="12" >
                  <v-select
                    :items="commonTags"
                    label="Тег"
                    v-model="tagsValue"
                    clearable
                    outlined
                  ></v-select>
                </v-col>
              </v-row>
              <div class="pl-4 pb-2">
                <v-btn color="primary" dark outlined @click.stop="search"
                  >Обновить</v-btn
                >
              </div>
              <v-list-item
                class="res-item"
                v-for="entry in currentRandomSearchResult"
                :key="entry.id"
              >
                <div class="sch-item" style="width: 100%">
                  <SearchResultItem :entry="entry" />
                </div>
              </v-list-item>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import commonTagsImported from "@/data/commonTags.json";
import SearchResultItem from "@/components/SearchResultItem.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      ruSenseItems: [{'key':'!rus','value':'не содержит'},{'key':'rus','value':'содержит'}],
      engSenseItems: [{'key':'!eng','value':'не содержит'},{'key':'eng','value':'содержит'}],
      jpnSenseItems: [{'key':'!jap','value':'не содержит'},{'key':'jap','value':'содержит'}],
      statusItems: [{'key':'!rev','value':'не отредактировано'},{'key':'rev','value':'отредактировано'}],
      ruSenseValue: 'rus',
      engSenseValue: '',
      jpnSenseValue: '',
      statusValue: '!rev',
      tagsValue: '',
      tags: commonTagsImported,
    };
  },
  methods: {
    ...mapActions(["startRandomSearch", "fetchTags"]),
    search() {
      this.startRandomSearch({
        selected: [this.ruSenseValue,this.engSenseValue,this.jpnSenseValue,this.statusValue,this.tagsValue],
      });
    },
  },
  computed: {
    ...mapGetters(["currentRandomSearchResult"]),
    commonTags() {
      return Object.keys(this.tags);
    },
  },
  async mounted() {
    this.search();
    this.fetchTags();
  },
  components: { SearchResultItem },
};
</script>

<style lang="scss">
.checkbox-line-element {
  display: inline-block;
  margin-right: 20px;
}
</style>
