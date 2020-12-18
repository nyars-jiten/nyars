<template>
  <div class="duplicates-check">
    <div class="doubles-block" v-if="currentDoublesSearchResult.length > 0">
      <hr class="divider-hr" />
      <span class="doubles-title">Возможные дубликаты</span>
      <v-list-item
        class="res-item"
        v-for="entry in currentDoublesSearchResult"
        :key="entry.id"
      >
        <div class="sch-item" style="width: 100%">
          <SearchResultItem :entry="entry" />
        </div>
      </v-list-item>
    </div>
  </div>
</template>

<script>
import SearchResultItem from "@/components/SearchResultItem.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      currentEntryList: Object,
    };
  },
  computed: {
    ...mapGetters(["currentDoublesSearchResult"]),
  },
  components: {
    SearchResultItem,
  },
};
</script>

<style lang="scss">
.doubles-title {
  font-size: 120%;
  padding-left: 20px;
  margin-top: 20px;
  color: black;
}
.divider-hr {
  color: grey;
}
</style>
