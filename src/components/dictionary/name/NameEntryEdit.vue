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
      :initSelected="entry.tags"
      :type="'Name'"
      title="Тип"
      @changeTags="(...args) => entry.tags = args[0]"
    />
  </div>
</template>

<script>
import TagSelector from "@/components/dictionary/editor/TagSelector.vue";

export default {
  props: {
    entry: Object
  },
  components: {
    TagSelector
  },
}
</script>
