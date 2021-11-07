<template>
  <div class="search-line">
    <v-container fluid>
      <v-row>
        <v-col
          cols="12"
          md="10"
          sm="12"
        >
          <form action="/search" method="GET">
            <v-text-field
              v-model="request"
              :loading="currentLoadingState"
              placeholder="Поиск"
              autocomplete="off"
              append-outer-icon="mdi-draw"
              append-icon="mdi-magnify"
              @keydown.enter.prevent="search"
              @click:append-outer="showDrawInput"
              @click:append="search"
              class="mx-4"
              flat
              hide-details
            />
          </form>
        </v-col>

        <!-- <v-col
          cols="12"
          sm="6"
          md="2"
        >
          <v-checkbox
            class="options"
            v-model="exactSearchState"
            label="Точное соответствие"
          />
        </v-col> -->
      </v-row>
    </v-container>
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
      this.$emit("startSearch");
      this.startSearch({ request: this.request, page: 1 });
      this.$router
        .push({ path: "/search", query: { r: this.request, page: 1 } })
        .catch(() => {});
    },
    showDrawInput() {
      this.$emit("showDrawInput");
    },
    addChar(char) {
      this.request += char;
    }
  },
  watch: {
    currentSearchRequest() {
      this.request = this.currentSearchRequest;
    },
  },
  mounted() {
    this.$store.commit("updateExactSearchState", false);
    this.$root.$on('addSearchStr', (value) => {
      this.addChar(value)
    });
  },
  computed: {
    ...mapGetters(["currentLoadingState", "currentSearchRequest"]),
    exactSearchState: {
      get() {
        return this.$store.state.entry.exactSearch;
      },
      set(value) {
        this.$store.commit("updateExactSearchState", value);
      },
    },
  },
};
</script>

<style lang="scss">
.search-line {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.options {
  .v-input__control,
  .v-input__slot {
    margin: unset !important;
  }

  .v-messages {
    display: none !important;
  }
}
</style>
