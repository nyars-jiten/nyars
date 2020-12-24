<template>
  <div class="edit-comment">
    <v-textarea label="Обоснование / Источники" v-model="comment" auto-grow rows="1"></v-textarea>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    comment: "",
  }),
  computed: {
    ...mapGetters(["currentEditComment"])
  },
  watch: {
    comment() {
      this.$store.commit("updateEditComment", this.comment);
    }
  },
  mounted() {
    this.comment = this.currentEditComment;
  }
};
</script>

<style lang="scss">
.edit-comment {
  padding-bottom: 15px;
}
</style>
