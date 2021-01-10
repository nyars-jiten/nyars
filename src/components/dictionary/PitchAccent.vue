<template>
  <div class="pitch-accent">
    <template v-for="(pitch, pitchId) in pitches" >
      <template v-for="(render, renderId) in pitch.renders" >
        <div class="pitch-word" :key="`${pitchId}-${renderId}`">
          <div class="pitch-render">
            <div class="pitch-render-word">
              <span class="pitch-word-char" v-for="char in render.word"
                :key="char.id"
                :data-pitch="char.pitch"
                :data-pitch-next="char.nextPitch"
                >
              {{char.char}}
              </span>
              <sup class="pitch-num">{{render.num}}</sup>
            </div>
            <svg height="40px" :width="(pitch.word.length + 1) * 15" xmlns="http://www.w3.org/2000/svg" v-html="render.svg" />
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import { sendGetRequest } from '@/core/apiRequests.js';
export default {
  data: () => ({
    pitches: [],
  }),
  async mounted() {
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

.pitch-render-word {
  display: inline-block;
}

.pitch-num {
  $color:rgb(158, 189, 209);
  border: 1px solid $color;
  color: $color;
  padding: 0 2px;
  border-radius: 30%;

  // font-size: 0.6rem;
  margin: 0 2px;

}

.pitch-render {
  padding-right: 20px;
  display: flex;
  align-items: center;
}

.pitch-word {
  display: inline-block;
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
