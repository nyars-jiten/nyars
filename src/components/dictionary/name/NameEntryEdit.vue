<template>
  <div class="names-entry-edit">
    <v-textarea
      outlined
      label="Написание"
      rows="1"
      v-model="entry.writing"
      auto-grow
    />
    <v-textarea
      outlined
      label="Чтение"
      rows="1"
      v-model="entry.reading"
      auto-grow
    />
    Оставьте поля перевода пустыми, если нужна авто-транслитерация.
    <v-textarea
      outlined
      label="Английский перевод"
      rows="1"
      v-model="entry.engText"
      auto-grow
    />
    <v-textarea
      outlined
      label="Русский перевод"
      rows="1"
      v-model="entry.rusText"
      auto-grow
    />
    <TagSelector
      :initSelected="this.entry.tags"
      :type="'Name'"
      title="Тип"
      @changeTags="(...args) => entry.tags = args[0]"
    />
  </div>
</template>

<script>
import TagSelector from "@/components/dictionary/editor/TagSelector.vue";

export default {
  mounted () {
    if (this.entry && typeof this.entry.tags[0] !== 'string') {
      const res = this.entry.tags.map(i => i.engShort);
      this.entry.tags = res;
    }
  },
  props: {
    entry: Object
  },
  components: {
    TagSelector
  },
}
</script>
