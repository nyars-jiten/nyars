<template>
  <div class="pitch-accent">
    <!-- {{pitch}} -->
    <!-- <template v-for="(pitch, pitchId) in pitches" > -->
    <div class="readings-block">
      <div v-if="pitch" class="pitch-renders">
        <template v-for="(render, renderId) in pitch.renders" >
          <div class="pitch-word" :key="renderId">
            <div class="pitch-render" v-if="render.num == selectedNum">
              <div class="pitch-render-word">
                <span class="pitch-word-mora" v-for="char in render.word"
                  :key="char.id"
                  :data-pitch="char.pitch"
                  :data-pitch-next="char.nextPitch"
                  :data-pitch-devoice="char.devoice"
                  :data-pitch-nasal="char.nasal"
                  >
                  <span class="pitch-word-char" v-text="char.char" />
                  <span class="pitch-word-devoice" v-if="char.devoice" />
                  <span class="pitch-word-nasal" v-if="char.nasal" text="ﾟ" />
                  <span class="pitch-word-line" />
                </span>
                <!-- <sup class="pitch-num">{{render.num}}</sup> -->
              </div>
              <!-- <svg height="40px" :width="getSvgWidth(pitch.word)" xmlns="http://www.w3.org/2000/svg" v-html="render.svg" /> -->
            </div>
          </div>
        </template>
      </div>
      <div class="kana-trscpt-reading" v-else>
        {{ kana }}
      </div>
      <div class="trscpt-reading">{{ trscpt }}</div>
    </div>
    <!-- </template> -->
    <div v-if="pitch" class="nums">
      <span
        v-for="num in pitch.resNum"
        :key="num.id"
        v-text="num"
        :class="'pitch-num ' + (num == selectedNum ? 'pitch-num-selected' : 'pitch-num-unselected')"
        @click="setSelectedPitch(num)"
      />
    </div>
    <div class="reading-tags">
      <InlineTag
        v-if="tags"
        v-bind:tags="tags.values"
        :short="true"
        :lang="'rus'"
        :inf="true"
      />
    </div>
  </div>
</template>

<script>
// import { sendGetRequest } from '@/core/apiRequests.js';
import InlineTag from "@/components/dictionary/InlineTag.vue";

export default {
  data: () => ({
    selectedNum: 0,
  }),
  methods: {
    getSvgWidth(word) {
      const moraRx = /[^()'][ャュョゃゅょぁぃぅぇぉゎァィゥェォヮ]?/g
      const len = ((word || '').match(moraRx) || []).length;
      return (len + 1) * 15;
    },
    setSelectedPitch(num) {
      this.selectedNum = num;
    }
  },
  async mounted() {
    if (this.pitch) {
      this.setSelectedPitch(this.pitch.resNum[0]);
    }
  },
  props: {
    pitch: Object,
    trscpt: String,
    kana: String,
    tags: Object
  },
  components: {
    InlineTag
  },
}
</script>

<style lang="scss">
// svg {
//   -webkit-filter: invert(100%);
//   filter: invert(100%);
// }

.trscpt-reading {
  font-size: 90%;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  // padding-top: 14px;
  line-height: 8px;
  // position: relative;
  // top: 8px;
  padding-bottom: 5px;
}

.reading-tags {
  display: inline-block;
  font-size: 125%;
  vertical-align: top;
  padding-left: 5px;
  position: relative;
  bottom: 7px;
}

.readings-block {
  display: inline-block;
}

.pitch-accent, .nums {
  display: inline;
}

.pitch-word-mora {
  display: inline-block;
  position: relative;
}

.pitch-word-mora[data-pitch='high']>.pitch-word-line {
    content: "";
    display: block;
    user-select: none;
    pointer-events: none;
    position: absolute;
    top: 0.1em;
    left: 0;
    right: 0;
    height: 0;
    border-top-width: 0.1em;
    border-top-style: solid;
}

.pitch-word-mora[data-pitch='high'][data-pitch-next='low']>.pitch-word-line {
    right: -0.1em;
    height: 0.4em;
    border-right-width: 0.1em;
    border-right-style: solid;
}

.pitch-word-mora[data-pitch='high'][data-pitch-next='low'] {
    padding-right: 0.1em;
    margin-right: 0.1em;
}

.pitch-word-devoice::before {
    content: "◌";
    position: absolute;
    font-size: 130%;
    transform: translate(-90%, 0%);
    color: var(--v-pitch-meta-base);
}

.pitch-word-nasal::after {
    content: "ﾟ";
    display: inline-block;
    position: absolute;
    left: 80%;
    font-size: 130%;
    color: var(--v-pitch-meta-base);
}

.svg-stroke-primary {
  stroke: var(--v-svg-primary-base);
}

.svg-stroke-snd {
  stroke: var(--v-svg-secondary-base);
}

.svg-fill-primary {
  fill: var(--v-svg-primary-base);
}

.svg-fill-snd {
  fill: var(--v-svg-secondary-base);
}

.pitch-render-word {
  display: inline-block;
}

.pitch-num {
  cursor: pointer;
  text-align: center;
  margin: 0 2px;
  padding: 0 2px;
  vertical-align: top;
  font-size: 80%;
}

.pitch-num-selected {
  border: 1px solid;
  border-color: var(--v-pitch-num-color-base);
  background-color: var(--v-pitch-num-color-base);
  color: white;
  border-radius: 30%;
}

.pitch-num-unselected {
  border: 1px solid;
  border-color: var(--v-pitch-num-color-base);
  color: var(--v-pitch-num-color-base);
  border-radius: 30%;
}

.pitch-render {
  // padding-right: 20px;
  display: flex;
  align-items: center;
}

.pitch-word {
  display: inline-block;
}
</style>
