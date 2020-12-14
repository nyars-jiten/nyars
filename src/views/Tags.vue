<template>
  <div class="tags-page">
    <v-container fluid>
      <TagList v-bind:title='"Тематика"' v-bind:tagSubject='"Fld"' />
      <TagList v-bind:title='"Диалект"' v-bind:tagSubject='"Dial"' />
      <TagList v-bind:title='"Прочее"' v-bind:tagSubject='"Misc"' />
      <TagList v-bind:title='"Часть речи"' v-bind:tagSubject='"Pos"' />
      <TagList v-bind:title='"Rinf"' v-bind:tagSubject='"Rinf"' />
      <TagList v-bind:title='"Kinf"' v-bind:tagSubject='"Kinf"' />
    </v-container>
  </div>
</template>

<script>
import TagList from '@/components/TagList.vue';
import { mapActions } from "vuex";

export default {
    methods: mapActions(["fetchTags"]),
    async mounted() {
        this.fetchTags();
    },
    components: { TagList }
}
</script>
