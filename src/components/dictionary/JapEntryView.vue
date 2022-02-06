<template>
  <div class="jap-view">
    <!-- <v-container v-if="entry.entry"> -->
    <div v-if="entry.entry">
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
              <div class="jpn-reading">
                <PitchAccent
                  :pitch="reading.pitchedReading"
                  :trscpt="convertToTrscr(reading.value)"
                  :kana="convertR(reading.value)"
                  :tags="reading.tag"
                  :kanjiless="word.writings.length == 0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="common-tags">
        <div class="c-tag" v-for="tag in actualTags" :key="tag.id">
          <v-chip
            class="ma-1"
            :color="tag.color"
            small
            outlined
          >
            {{tag.text}}
          </v-chip>
        </div>
      </div>

      <!-- <PitchAccent :raw="entry.entry.pitchAccent" v-if="entry.entry.pitchAccent && entry.entry.pitchAccent.length > 0" /> -->

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
                  class="sense sense-grid"
                  v-for="(sense, senseIndex) in lm.senses"
                  :key="senseIndex"
                >
                  <div class="sense-num">
                    <template v-if="lm.senses.length > 1">
                      {{ 1 + senseIndex }}&#41;
                    </template>
                  </div>

                  <div class="sense-text">
                    <InlineTag
                      v-bind:tags="filterTags(sense.tags, ['Fld'])"
                      v-bind:short="true"
                      v-bind:lang="lm.lang"
                    />

                    <!-- {{ convertBB(sense.value) }} -->
                    <span
                      class="entry-text-md"
                      :class="{sense_rare:sense.isRare}"
                      v-html="convertBB(sense.value)"
                      style="white-space: pre-wrap"
                    />
                    <InlineTag
                      v-bind:tags="filterTags(sense.tags, ['Dial', 'Misc'])"
                      v-bind:lang="lm.lang"
                      :loanSources="sense.loanSources"
                    />

                    <div class="references-block">
                      <div
                        class="reference"
                        v-for="ref in sense.references"
                        :key="ref.id"
                      >
                        <span>⇒
                          <span class="ref-type">{{ getReferenceType(ref.referenceType, lm.lang) }}</span>
                          <router-link
                            class="entry-reference-link"
                            :to="{ name: 'dict-entry', params: { id: ref.target, type: 'jp' } }"
                            v-if="ref.target && ref.target.length >= 4"
                          >{{ ref.value }}</router-link>
                          <router-link
                            class="entry-reference-link"
                            :to="{ name: 'search', query: { r: ref.value } }"
                            v-else
                          >{{ ref.value }}</router-link>
                        </span>
                      </div>
                    </div>

                    <div class="examples-block">
                      <div
                        class="example"
                        v-for="example in sense.examples"
                        :key="example.id"
                      >
                        <span v-html="exBbCodes(example.value)"></span>
                        <span></span>
                        <span class="example-translation">{{ example.translation }}</span>
                      </div>
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
        <!-- <div class="ref-entry mt-4" v-if="entry.entry.externalEntry">
          Связанная
          <router-link
            :to="{ name: 'dict-entry', params: { id: entry.entry.externalEntry, type: 'jp' } }"
            v-text="'статья'"
          />.
        </div> -->
      </div>
    </div>
    <!-- </v-container> -->
  </div>
</template>

<script>
import { transcriptionConvert } from "@/core/scriptConverter.js";
import { bbCodesProcess, examplesBbCodesProcess }  from "@/core/bbCodes.js";
import referenceTypes from "@/data/referenceTypes.json";
import InlineTag from "@/components/dictionary/InlineTag.vue";
import PitchAccent from "@/components/dictionary/PitchAccent.vue";
import commonTags from "@/data/commonTags.json";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    tags: commonTags,
    refType: referenceTypes
  }),
  computed:  {
    ...mapGetters(["currentSounds", 'siteTranscriptions']),
    actualTags() {
      if (!this.entry.entry.tags) return [];
      return this.entry.entry.tags.map(
        (key) => this.tags[key]
      );
    }
  },
  methods: {
    convertBB(sense) {
      return bbCodesProcess(sense);
    },
    getReferenceType(value, lang) {
      return this.refType[value].translation[lang] + ' ';
    },
    exBbCodes(text){
      return examplesBbCodesProcess(text);
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
      return transcriptionConvert(raw, 'hiragana', this.siteTranscriptions);
    },
    convertToTrscr(raw) {
      return transcriptionConvert(raw, 'kiriji', this.siteTranscriptions);
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
    InlineTag,PitchAccent
  },
};
</script>

<style lang="scss">
.entry-text-md, .common-tags, .c-tag {
  display: inline;
}

// .reading-lines {
//   font-size: 65%;
//   display: inline-block;
//   vertical-align: middle;
//   text-align: center;
//   // padding-top: 14px;
//   line-height: 14px;
//   // position: relative;
//   // top: 8px;
//   padding-bottom: 5px;
// }

.sense_rare {
  color: var(--v-inline-tag-full-tags-color-base);
}

.jpn-reading {
  // font-size: 120%;
  display: inline-block;
  font-size: 80%;
}

// .trscpt-reading {
//   // display: block;
// }

.trscpt-reading {
  display: block;
  // color: rgb(85, 85, 85);
}

.references-block {
  padding-left: 10px;
  font-style: italic;
}

.lang-sep {
  grid-column: 1/-1;
  border: unset;
  border-bottom: 1px solid var(--v-jap-entry-view-lang-sep-color-base);
  margin: 0 30px;
}

.sense-text, .sense-num {
  display: inline-block;
  vertical-align: top;
}

.sense-grid {
  // display: grid;
  grid-template-columns: auto 1fr;
  gap: 5px;
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
  // color: #000;
}

.lang {
  font-style: italic;
  color: var(--v-jap-entry-view-lang-color-base) !important;
  // color: #000;
}

.lang-mean {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  // margin: 0 10px;
  padding: 2px;
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

// .jap-view {
//   width: 100%;
//   padding: 0 16px 16px;
// }

.words-header {
  color: var(--v-jap-entry-view-words-header-color-base);
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

.example-translation {
  padding-left: 5px;
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
