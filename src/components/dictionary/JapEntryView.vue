<template>
  <div class="jap-view">
    <v-container v-if="entry.entry">
      <div class="words-header">
        <div class="word" v-for="word in entry.entry.words" :key="word.id">
          <div class="word-writings" v-if="word.writings.length > 0">
            <div
              class="writing"
              v-for="writing in word.writings"
              :key="writing.id"
            >
              {{ writing.value }}
              <InlineTag
                v-if="writing.tag"
                v-bind:tags="writing.tag.values"
                :short="true"
                :lang="'rus'"
                :inf="true"
              />
            </div>
          </div>
          <div class="word-readings">
            <div
              class="reading"
              v-for="reading in word.readings"
              :key="reading.id"
            >
              {{ convertR(reading.value) }}
              <InlineTag
                v-if="reading.tag"
                v-bind:tags="reading.tag.values"
                :short="true"
                :lang="'rus'"
                :inf="true"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="entry-sound">
        <template v-if="currentSounds.length > 0">
          <div
            class="sound"
            v-for="currentSound in currentSounds"
            :key="currentSound"
          >
            <v-btn icon small color="grey" v-on:click="playAudio(currentSound)">
              <v-icon>mdi-play-outline</v-icon>
            </v-btn>
            <span class="duration"></span>
          </div>
        </template>
      </div>

      <div class="meaning-block">
        <div
          class="pos-meaning"
          v-for="pos in entry.entry.meanings"
          :key="pos.id"
        >
          <div class="pos-list">
            <div class="pos" v-for="posval in pos.pos" :key="posval.id">
              {{ posval }}
            </div>
          </div>
          <div class="lang-meaning-block">
            <div
              class="lang-mean"
              v-for="(lm, lmIndex) in pos.langMeanings"
              :key="lmIndex"
            >
              <div class="lang">{{ getRusLang(lm.lang) }}</div>
              <div class="senses">
                <div
                  class="sense"
                  v-for="(sense, senseIndex) in lm.senses"
                  :key="senseIndex"
                >
                  <template v-if="lm.senses.length > 1">
                    {{ 1 + senseIndex }}&#41;
                  </template>

                  <InlineTag
                    v-bind:tags="filterTags(sense.tags, ['Fld'])"
                    v-bind:short="true"
                    v-bind:lang="lm.lang"
                  />

                  <!-- {{ convertBB(sense.value) }} -->
                  <span
                    class="entry-text-md"
                    v-html="convertBB(sense.value)"
                  ></span>
                  <InlineTag
                    v-bind:tags="filterTags(sense.tags, ['Dial', 'Misc'])"
                    v-bind:lang="lm.lang"
                  />

                  <div class="examples-block">
                    <div
                      class="example"
                      v-for="example in sense.examples"
                      :key="example.id"
                    >
                      <span>{{ example.value }} </span>
                      <span></span>
                      <span>{{ example.translation }}</span>
                    </div>
                  </div>
                </div>
                <div class="note" style="white-space: pre-wrap" v-if="lm.note">
                  <span>※</span>
                  <span v-html="convertBB(lm.note)"></span>
                </div>
              </div>
              <hr
                class="lang-sep"
                v-if="lmIndex + 1 < pos.langMeanings.length"
              />
            </div>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import sc from "@/core/scriptConverter.js";
import bb from "@/core/bbCodes.js";
import InlineTag from "@/components/dictionary/InlineTag.vue";
import { mapGetters } from "vuex";
export default {
  computed: mapGetters(["currentSounds"]),
  methods: {
    convertBB(sense) {
      return bb.bbCodesProcess(sense);
    },
    playAudio(audioLink) {
      const audio = new Audio(
        `${process.env.VUE_APP_BASE}/upload/sound/${audioLink}`
      );
      return audio.play();
    },
    filterTags(tags, type) {
      let filtered = tags.filter((tagObj) => type.includes(tagObj.type));
      if (filtered.length < 1) return [];

      return filtered
        .map(function (tagList) {
          return tagList.values;
        })
        .flat();
    },
    convertR(raw) {
      return sc.scriptConvert(raw);
    },
    getRusLang(lang) {
      switch (lang) {
        case "rus":
          return "рус";
        case "eng":
          return "анг";
        case "jap":
          return "япо";
        case "lat":
          return "лат";
        default:
          return "";
      }
    },
  },
  props: {
    entry: Object,
  },
  components: {
    InlineTag,
  },
};
</script>

<style lang="scss">
.entry-text-md {
  display: inline;
}

.lang-sep {
  grid-column: 1/-1;
  border: unset;
  border-bottom: 1px solid var(--v-jap-entry-view-lang-sep-color-base);
  margin: 0 30px;
}

.note {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
}

.examples-block {
  margin-left: 10px;
}

.example {
  color: var(--v-jap-entry-view-example-color-base) !important;
  border-left: 3px solid var(--v-jap-entry-view-example-border-color-base) !important;
  padding-left: 5px;
  margin-bottom: 6px;
  margin-top: 6px;
}

.sense {
  padding: 0;
  margin: 0;
  color: var(--v-jap-entry-view-entry-sense-color-base) !important;
}

.lang {
  font-style: italic;
  color: var(--v-jap-entry-view-lang-color-base) !important;
}

.lang-mean {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  margin: 0 10px;
  padding: 10px;
}

.pos-list {
  display: block;
  border-bottom: 1px solid var(--v-jap-entry-view-pos-list-color-base);
  padding: 6px;
}

.pos {
  font-size: 16px;
  display: inline;
  text-transform: uppercase;
}

.word {
  margin-top: 3px;
  margin-bottom: 3px;
}

.jap-view {
  width: 100%;
  padding: 0 16px 16px;
}

.word-writings,
.word-readings,
.writing {
  font-size: 22px;
  display: inline-block;
  .reading {
    font-size: 85%;
  }
}

.word-writings {
  &::after {
    color: var(--v-text-decoration-color-base);
    content: "】";
  }

  &::before {
    color: var(--v-text-decoration-color-base);
    content: "【";
  }
}

.writing,
.reading,
.pos {
  &:not(:last-child) {
    &::after {
      color: var(--v-text-decoration-color-base);
      //   white-space: pre;
      content: "・";
    }
  }
}
</style>
