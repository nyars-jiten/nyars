<template>
    <div class="text-editor">
        <div class="text-editor-field" v-if="currentTextEntry">
            <v-textarea
                rows="20"
                outlined
                counter
                :value="currentTextEntry"
                @input="updateTextEntry"
            ></v-textarea>
        </div>
        <div class="templates">
            Шаблоны: <span class="template-button" @click="useNTemplate">N</span>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    // data: function() {
    //     return {
    //         entry: ""
    //     }
    // },
    computed: {
        ...mapGetters(['currentTextEntry']),
    },
    methods: {
        ...mapActions(['getEntryText']),
        updateTextEntry(e) {
            this.$store.commit('updateTextEntry', e)
        },
        useNTemplate() {
            let text = "[word][writing]—[tag=Kinf][/tag][/writing][reading]—[tag=Rinf][/tag][/reading][/word][pos=n][m]новое значение[/m][note][/note][m=eng]new value[/m][note=eng][/note][/pos]";
            this.$store.commit('updateTextEntry', text);
        }
    },
    created() {
        this.getEntryText();
    }
}
</script>

<style lang="scss">
.v-textarea textarea {
      line-height: 20px;
 }
 .template-button {
     cursor: pointer;
 }
</style>
