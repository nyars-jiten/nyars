<template>
  <div class="pitch-accent">
    {{pitch}}
    <div class="pitch-word" v-for="pitch in pitches" :key="pitch.id">
      <div class="pitch-render" v-for="render in pitch.renders" :key="render.id">
        <!-- {{pitch.word}} -->
        <!-- viewBox="-5 0 1000 50" -->
        <!-- {{render}} -->
        <div class="pitch-render-word">
          <span class="pitch-word-char" v-for="char in render.word"
            :key="char.id"
            :data-pitch="char.pitch"
            :data-pitch-next="char.nextPitch"
          >{{char.char}}</span>
          <div class="pitch-num">
            [{{render.num}}]
          </div>
        </div>
        <svg height="40px" :width="(pitch.word.length + 1) * 15" xmlns="http://www.w3.org/2000/svg" v-html="render.svg" />
      </div>
    </div>
  </div>
</template>

<script>
import { sendGetRequest } from '@/core/apiRequests.js';
export default {
  data: () => ({
    pitches: [],
  }),
  async mounted() {
    this.sendGetRequest
    const resp = await sendGetRequest("dictionary/jap/get-pitch?request=" + this.raw);
    if (resp.status == 200) {
      this.pitches = resp.data;
    }
  },
  props: {
    raw: String,
  },
}
</script>

<style lang="scss">
// svg {
//   -webkit-filter: invert(100%);
//   filter: invert(100%);
// }

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


.pitch-word, .pitch-render, .pitch-render-word, .pitch-num {
  display: inline-block;
}

.pitch-render {
  padding-right: 20px;
}

.pitch-word-char {
  display: inline-block;
  position: relative;
}

.pitch-word-char[data-pitch='high']::before {
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

.pitch-word-char[data-pitch='high'][data-pitch-next='low']::before {
    right: -0.1em;
    height: 0.4em;
    border-right-width: 0.1em;
    border-right-style: solid;
}

.pitch-word-char[data-pitch='high'][data-pitch-next='low'] {
    padding-right: 0.1em;
    margin-right: 0.1em;
}
</style>
