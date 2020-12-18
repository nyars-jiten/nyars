<template>
  <div class="tag-selector">
    <v-autocomplete
      :menu-props="{ maxHeight: '400' }"
      :label="title"
      multiple
      small-chips
      deletable-chips
      item-text="rus"
      item-value="engShort"
      :items="tagList"
      :value="initSelected"
      @input="changeTags($event)"
    ></v-autocomplete>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: function () {
    return {
      selected: this.initSelected,
    };
  },
  computed: {
    ...mapGetters(["getSubjectTags"]),
    tagList: function () {
      return this.getSubjectTags(this.type);
    },
  },
  methods: {
    changeTags(value) {
      this.$emit("changeTags", value);
    },
  },
  props: {
    initSelected: Array,
    type: String,
    title: {
      type: String,
      default: "Теги",
    },
  },
};
</script>
