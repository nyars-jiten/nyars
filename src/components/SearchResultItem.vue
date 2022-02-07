<template>
  <div class="search-item">
    <v-container v-if="entry" :class="{ nonreviewed: !entry.isReviewed }">
      <!-- {{entry}} -->
      <div class="words-header">
        <router-link
          class="titles-link"
          :to="{ name: 'dict-entry', params: { id: entry.wid, type: 'jp' } }"
        >
          <div
            class="word"
            v-for="(word, wordId) in entry.entry.words"
            :key="wordId"
          >
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

            <div
              class="corpus-icon"
              v-if="
                !entry.isReviewed &&
                entry.theme &&
                entry.theme.length > 0 &&
                wordId == 0
              "
            >
              <DictionaryIcon
                color="blue lighten-3"
                :icon="corpusInfo(entry).icon"
                :tooltip="corpusInfo(entry).description"
              />
            </div>
          </div>
        </router-link>
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
      <div class="meaning-block">
        <div
          class="pos-meaning"
          v-for="pos in entry.entry.meanings"
          :key="pos.id"
        >
          <!-- <div class="pos-list">
                    <div class="pos" v-for="posval in pos.pos" :key="posval.id">
                        {{ posval }}
                    </div>
                </div> -->
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
                  <div
                    v-if="lm.senses.length > 1"
                    class="sense-num"
                    :class="{sense_rare:sense.isRare}"
                    v-text="1 + senseIndex + ')'"
                  />
                  <InlineTag
                    v-bind:tags="filterTags(sense.tags, ['Fld'])"
                    v-bind:short="true"
                    v-bind:lang="lm.lang"
                  />
                  <!-- {{ sense.value }} -->
                  <span
                    class="entry-text-md"
                    :class="{sense_rare:sense.isRare}"
                    v-html="convertBB(sense.value)"
                  />
                  <InlineTag
                    v-bind:tags="filterTags(sense.tags, ['Dial', 'Misc'])"
                    v-bind:lang="lm.lang"
                  />

                  <!-- <div class="examples-block">
                                    <div class="example" v-for="example in sense.examples" :key="example.id">
                                        <span>{{ example.value }} </span>
                                        <span></span>
                                        <span>{{ example.translation }}</span>
                                    </div>
                                </div> -->
                </div>
                <!-- <div class="note" style="white-space: pre-wrap;" v-if="lm.note">
                                <span>※</span>
                                <span>{{lm.note}}</span>
                             </div> -->
              </div>
              <!-- <hr class="lang-sep" v-if="lmIndex + 1 < pos.langMeanings.length"> -->
            </div>
          </div>
        </div>
      </div>
      <v-divider inset></v-divider>
    </v-container>
  </div>
</template>

<script>
import { transcriptionConvert } from "@/core/scriptConverter.js";
import commonTags from "@/data/commonTags.json";
import corpusList from "@/data/corpus.json";
import InlineTag from "@/components/dictionary/InlineTag.vue";
import { bbCodesProcess } from "@/core/bbCodes.js";
import DictionaryIcon from "@/components/dictionary/DictionaryIcon.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      corpus: corpusList.corpusList,
      tags: commonTags,
    };
  },
  methods: {
    convertBB(sense) {
      return bbCodesProcess(sense);
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
    corpusInfo(entry) {
      return this.corpus[entry.theme];
    },
    convertR(raw) {
      return transcriptionConvert(raw, 'hiragana', this.siteTranscriptions);
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
  computed: {
    ...mapGetters(['siteTranscriptions']),
    actualTags() {
      return this.entry.entry.tags.map(
        (key) => this.tags[key]
      );
    }
  },
  props: {
    entry: Object,
  },
  components: {
    InlineTag,
    DictionaryIcon,
  },
};
</script>

<style lang="scss">
.common-tags, .c-tag, .sense-num {
  display: inline;
}

.entry-text-md {
  a {
    color: var(--v-search-result-item-entry-text-md-color-base) !important;
  }
}

.nonreviewed {
  border-left: 2px solid var(--v-search-result-item-nonreviewed-color-base);
}

.search-item {
  font-size: 90%;
}

// .lang-sep {
//     grid-column: 1/-1;
//     border: unset;
//     border-bottom: 1px solid hsla(0,0%,56.1%,.34);
//     margin: 0 30px;
// }

.note {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
}

.examples-block {
  margin-left: 10px;
}

.example {
  color: var(--v-search-result-item-example-color-base);
  border-left: 3px solid var(--v-search-result-item-example-border-color-base);
  padding-left: 5px;
  margin-bottom: 6px;
  margin-top: 6px;
}

.sense {
  padding: 0;
  margin: 0;
}

.lang {
  font-style: italic;
  color: var(--v-search-result-item-lang-color-base);
}

.lang-mean {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  // margin: 0 10px;
  padding: 2px;
}

.pos-list {
  // display: block;
  // border-bottom: 1px solid var(--v-search-result-item-pos-list-color-base);
  // padding: 6px;
  padding-left: 30px;
}

.pos {
  font-size: 16px;
  display: inline;
  font-style: italic;
  // text-transform: uppercase;
}

.corpus-icon {
  display: inline-block;
  padding-bottom: 2px;
  padding-left: 4px;
}

.word {
  margin-top: 3px;
  margin-bottom: 3px;
  display: flex;
  align-items: center;
  font-size: 0;
}

.jap-view {
  width: 100%;
  padding: 0 16px 16px;
}

.sense_rare {
  color: var(--v-inline-tag-full-tags-color-base);
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

.titles-link {
  color: unset !important;
}

.reading,
.words-header {
  display: inline;
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
