<template>
  <div class="edit-comment">
    <v-textarea
      label="Обоснование / Источники"
      :value="currentEditComment"
      @input="updateEditComment"
      auto-grow
      rows="1"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  methods: {
    updateEditComment(text) {
      console.log(text);
      this.$store.commit("updateEditComment", text);
    }
  },
  computed: {
    ...mapGetters(["currentEditComment"])
  },
};
</script>

<style lang="scss">
.edit-comment {
  padding-bottom: 15px;
}
</style>
