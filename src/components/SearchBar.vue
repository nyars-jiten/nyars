<template>
  <div class="search-line">
    <v-text-field
      v-model="request"
      :loading="currentLoadingState"
      placeholder="Поиск"
      autocomplete="off"
      @keydown.enter.prevent="search"
      class="mx-4"
      flat
      hide-details
    ></v-text-field>
    <v-checkbox
      v-model="exactSearchState"
      label="Точное соответствие"
    ></v-checkbox>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    request: "",
  }),
  methods: {
    ...mapActions(["startSearch"]),
    search() {
      this.startSearch({ request: this.request, page: 1 });
      this.$router
        .push({ path: "/search", query: { r: this.request } })
        .catch(() => {});
    },
  },
  watch: {
    currentSearchRequest() {
      this.request = this.currentSearchRequest;
    },
  },
  mounted() {
    this.$store.commit('updateExactSearchState', false);
  },
  computed: {
    ...mapGetters(["currentLoadingState", "currentSearchRequest"]),
    exactSearchState: {
      get() {
        return this.$store.state.entry.exactSearch;
      },
      set(value) {
        this.$store.commit('updateExactSearchState', value);
      }
    },
  },
};
</script>
