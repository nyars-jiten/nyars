<template>
  <div class="bb-code-panel">
    <span class="bb-btn" @click="processbb('[ref]', '[/ref]')">[ref]</span>
    <span class="bb-btn" @click="processbb('[i]', '[/i]')">[i]</span>
    <span class="bb-btn" @click="processbb('[p]', '[/p]')">[p]</span>
    <span class="bb-btn" @click="processbb('[sub]', '[/sub]')">[sub]</span>
    <span class="bb-btn" @click="processbb('[sup]', '[/sup]')">[sup]</span>
    <span class="bb-btn" @click="processbb('{~', '}')">{~}</span>
    <span class="bb-btn" @click="processbb('«', '»')">« »</span>
    <span class="bb-btn" @click="processbb('[\']', '[/\']')">[']</span>
    <span class="bb-btn" @click="processbb('⌈', '')">⌈</span>
    <span v-if="hasToLower" class="bb-btn" @click="toLower()">[↓]</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  methods: {
    processbb(openTag, closedTag) {
      const txtarea = document.getElementById(this.textAreaId);
      // const txtarea = document.activeElement;
      // console.log(txtarea);
      txtarea.focus();
      const start = txtarea.selectionStart;
      const finish = txtarea.selectionEnd;
      const allText = txtarea.value;
      const sel = allText.substring(start, finish);
      const newText =
        allText.substring(0, start) +
        openTag +
        sel +
        closedTag +
        allText.substring(finish, allText.length);

      txtarea.setSelectionRange(start + openTag.length, sel.length);

      // txtarea.value=newText;
      this.$emit("changed", newText);
    },
    toLower() {
      const txtarea = document.getElementById(this.textAreaId);
      txtarea.focus();
      const start = txtarea.selectionStart;
      const finish = txtarea.selectionEnd;
      const allText = txtarea.value;
      const sel = allText.substring(start, finish);
      const newText =
        allText.substring(0, start) +
        sel.toLowerCase() +
        allText.substring(finish, allText.length);

      txtarea.setSelectionRange(start, sel.length);

      // txtarea.value=newText;
      this.$emit("changed", newText);
    }
  },
  computed: {
    ...mapGetters(["currentEntry"]),
  },
  props: {
    textAreaId: String,
    hasToLower: Boolean,
  },
};
</script>

<style lang="scss">
.bb-btn {
  cursor: pointer;
  padding-right: 10px;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome, Edge, Opera and Firefox */
}
</style>
