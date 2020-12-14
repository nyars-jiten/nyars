<template>
  <div class="search-line">
    <!-- <v-autocomplete
        v-model="select"
        :loading="loading"
        :items="items"
        :search-input.sync="search"
        cache-items
        class="mx-4"
        flat
        hide-no-data
        hide-details
        label="Search"
      ></v-autocomplete> -->
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
      this.$router.push({ path: '/search', query: { r: this.request }}).catch(()=>{ });
    },
  },
  watch: {
    currentSearchRequest() {
      this.request = this.currentSearchRequest
    }
  },
  computed: {
    ...mapGetters(["currentLoadingState", "currentSearchRequest"]),
  },
};
</script>
