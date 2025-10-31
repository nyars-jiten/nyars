<script setup lang="ts">
interface Props {
  jpnEntry: EntryJp
  showLemmas: boolean
}

const props = defineProps<Props>()

const hasPitchAccents = computed(() => {
  return props.jpnEntry.words.some(word =>
    word.readings.some(reading => reading.pitch.length > 0),
  )
})

const hasBadgeInfo = computed(() => {
  const hasFrequency = props.jpnEntry.frequency > 0
  const hasStatus = Object.values(props.jpnEntry.status).includes(true)
  return hasFrequency || hasStatus
})

function playAudio(audio: string) {
  const audioElement = new Audio(audio)
  audioElement.play()
}
</script>

<template>
  <Words :jpn-entry="jpnEntry" class="px-4" />

  <hr class="border-neutral-800">

  <template v-if="hasBadgeInfo">
    <div class="px-2 flex flex-wrap items-center gap-2">
      <UiBadgeFrequency v-if="jpnEntry.frequency > 0" :value="jpnEntry.frequency" />
      <EntryFlagBadge :statuses="jpnEntry.status" hint />
    </div>
  </template>
  <template v-if="hasPitchAccents">
    <section class="px-4 inline-flex items-center gap-4 flex-wrap">
      <template v-for="(reading, ri) in jpnEntry.words.flatMap(word => word.readings)" :key="ri">
        <span v-for="(pitch, pi) in reading.pitch" :key="pi" class="inline-flex items-center gap-2">
          <button v-if="pitch.audio.length > 0" type="button" class="flex items-center justify-start rounded-md transition-colors text-xl hover:text-violet-300/50 cursor-pointer" @click="playAudio(pitch.audio)">
            <Icon name="ic:baseline-volume-up" />
          </button>

          <span>
            <span
              v-for="(accent, ai) in pitch.diagram"
              :key="ai"
              class="border-violet-300/50"
              :class="{
                'border-b-2 border-t-2 border-t-transparent': accent.s === 0 || accent.s === 2,
                'border-t-2 border-b-2 border-b-transparent': accent.s === 1 || accent.s === 3,
                'border-r-2': accent.s === 2 || accent.s === 3,
                'text-red-400/80': accent.sl,
                'underline decoration-wavy decoration-red-400/80': accent.n,
                'after:content-[\'・\'] after:text-gray-500': accent.sp,
              }"
            >
              {{ accent.m }}
            </span>
          </span>

          <small class="bg-slate-700 px-1 leading-none py-0.5 rounded-sm shadow font-bold text-xs">
            {{ pitch.pitchNum }}
          </small>
        </span>
      </template>
    </section>
  </template>

  <hr v-if="hasBadgeInfo || hasPitchAccents" class="border-neutral-800">

  <Meanings :meanings="jpnEntry.meanings" :show-lemmas="showLemmas" class="px-4" />
</template>
