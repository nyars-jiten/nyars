<template>
  <div class="status-icons">
    <div class="icon-wrapper" v-if="!editMode && !currentEntry.isReviewed && currentCorpus">
      <DictionaryIcon color="light-blue lighten-1" :icon="currentCorpus.icon" :tooltip="currentCorpus.description" />
    </div>
    <div
      class="icon-wrapper"
      @click="changeStatus(1)"
      v-if="!editMode && (!currentEntry.isReviewed || userHasRights(2))"
    >
      <DictionaryIcon
        :color="currentEntry.isReviewed ? 'grey' : 'warning'"
        icon="mdi-alert-outline"
        tooltip="Неотредактированная статья"
      />
    </div>
    <div
      class="icon-wrapper"
      @click="changeStatus(2)"
      v-if="!editMode && (currentEntry.isUnconfirmed || userHasRights(2))"
    >
      <DictionaryIcon
        :color="currentEntry.isUnconfirmed ? 'red' : 'grey'"
        icon="mdi-magnify-scan"
        tooltip="Статья не подтверждается источниками"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import corpusList from "@/data/corpus.json";
import DictionaryIcon from "@/components/dictionary/DictionaryIcon.vue";
import { sendPostRequest } from "@/core/apiRequests.js";

export default {
  data() {
    return {
      corpus: corpusList.corpusList,
    };
  },
  computed: {
    ...mapGetters(["userHasRights"]),
    currentCorpus() {
      const theme = this.currentEntry.theme;
      if (theme == "" || !this.corpus[theme]) {
        return false;
      }

      return this.corpus[theme];
      // this.corpus
    },
  },
  methods: {
    ...mapActions([
      "newAlert",
    ]),
    async changeStatus(type) {
      if (!this.userHasRights(2)) return;
      const resp = await sendPostRequest("dictionary/jap/entry/change-status/" + this.currentId + `?type=${type}`, {});
      if (resp.status == 200 && resp.data.id !== 0) {
        this.newAlert({ msg: "Статус статьи изменён", type: "success" });
        this.$emit("updatePage");
        this.editMode = false;
      }
    },
  },
  props: {
    currentEntry: Object,
    editMode: Boolean,
    currentId: String,
  },
  components: {
    DictionaryIcon,
  },
};
</script>

<style>
.status-icons, .icon-wrapper {
  display: inline-block;
}

.icon-wrapper {
  padding-bottom: 5px;
}
</style>
