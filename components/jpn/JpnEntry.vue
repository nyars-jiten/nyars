<script setup lang="ts">
import { tv } from 'tailwind-variants'

interface Props {
  jpnEntry: EntryJp
  showLemmas: boolean
}

defineProps<Props>()

const styles = tv({
  base: 'flex items-center justify-start rounded-md transition-colors text-xl hover:text-neutral-800',
})
</script>

<template>
  <article class="space-y-4">
    <!-- <div id="xxx" /> -->
    <!-- https://nuxt.com/docs/api/nuxt-config#router -->
    <!-- https://router.vuejs.org/api/interfaces/RouterOptions.html#scrollBehavior -->

    <div class="flex flex-col hyphens-auto cursor-text items-start gap-3 pl-4 mb-2 border-b border-ns-gray-200 pb-2 dark:border-ns-gray-700">
      <Words :jpn-entry="jpnEntry" class="" />
    </div>

    <div class="px-2 flex flex-wrap items-center gap-2">
      <UiTag v-if="jpnEntry.frequency > 0" kind="freq">
        <MiscFreq :value="jpnEntry.frequency" />
      </UiTag>
      <EntryFlagBadge :statuses="jpnEntry.status" hint />
    </div>
    <div class="px-2 space-y-4">
      <div class="space-x-2">
        <!-- <UiTag v-if="jpnEntry.frequency > 0" kind="freq">
          <MiscFreq :value="jpnEntry.frequency" />
        </UiTag>
        <EntryFlagBadge :statuses="jpnEntry.status" hint /> -->
        <template v-for="(reading, ri) in jpnEntry.words.flatMap(word => word.readings)" :key="ri">
          <template v-for="(pitch, pi) in reading.pitch" :key="pi">
            <span class="space-x-1 py-1 px-1.5 rounded-md bg-neutral-800/20 shadow-md inline-flex items-center">
              <button v-if="pitch.audio.length > 0" type="button" :class="styles()">
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
                    'after:content-[\'・\']': accent.sp,
                  }"
                >
                  {{ accent.m }}
                </span>
              </span>

              <small class="bg-slate-700 px-1 leading-none py-0.5 rounded-sm shadow-md font-bold text-xs">
                {{ pitch.pitchNum }}
              </small>
            </span>
          </template>
        </template>
      </div>

      <Meanings :meanings="jpnEntry.meanings" :show-lemmas="showLemmas" />
    </div>
  </article>
</template>
