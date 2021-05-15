<template>
  <div class="tag-inline">
    <span class="loan" v-if="loanSource && loanSource.word"> ({{loanSource.lang}} {{loanSource.word}})</span>
    <div class="tags-wrap" v-if="tags.length > 0">
      <div :class="{ shorttagfld: !inf, shorttaginf: inf }" v-if="short">
        <v-tooltip top v-for="(tag, tagId) in tags" :key="tagId">
          <template v-slot:activator="{ on, attrs }">
            <span dark v-bind="attrs" v-on="on" style="cursor: text">
              {{ searchTag(tag).short }}
              <span v-if="tagId + 1 < tags.length">,</span>
            </span>
          </template>
          <span>{{ searchTag(tag).full }}</span>
        </v-tooltip>
      </div>
      <div class="full-tags" v-else>
        (<!--
          --><span class="full-tag" v-for="(tag, tagId) in tags" :key="tagId"><!--
          -->{{ searchTag(tag).full }}<!--
          --><span v-if="tagId + 1 < tags.length">, </span><!--
        --></span><!--
        -->)
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
export default {
  methods: {
    searchTag(tag) {
      if (!(this.lang in this.searchTags)) {
        this.searchTags[this.lang] = [];
      }
      if (!(tag in this.searchTags[this.lang])) {
        this.searchTags[this.lang][tag] = this.$store.getters.getTag(
          tag,
          this.lang
        );
      }
      return this.searchTags[this.lang][tag];
    },
  },
  computed: {
    count() {
      return this.$store.state.entry.tags.length;
    },
  },
  data() {
    return {
      searchTags: [],
    };
  },
  props: {
    tags: Array,
    type: Object,
    lang: String,
    loanSource: Object,
    inf: {
      type: Boolean,
      default: false,
    },
    short: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    count() {
      this.searchTags = [];
    },
  },
};
</script>

<style lang="scss">
.tag-inline,
.full-tags,
.short-tag,
.tags-wrap,
.shorttagfld,
.shorttaginf {
  white-space: nowrap;
  display: inline;
}

.full-tags, .loan {
  font-style: italic;
  color: var(--v-inline-tag-full-tags-color-base);
}

.shorttagfld {
  font-style: italic;
  color: var(--v-inline-tag-shorttagfld-color-base);
  padding-right: 4px;
}

.shorttaginf {
  font-style: italic;
  font-size: 70%;
  vertical-align: super;
  color: var(--v-inline-tag-shorttaginf-color-base);
}
</style>
