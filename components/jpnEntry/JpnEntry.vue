<script setup lang="ts">
interface Props {
  jpnEntry: V2EntryJp
}

defineProps<Props>()
</script>

<template>
  <article>
    <!-- <div id="xxx" /> -->
    <!-- https://nuxt.com/docs/api/nuxt-config#router -->
    <!-- https://router.vuejs.org/api/interfaces/RouterOptions.html#scrollBehavior -->

    <Words :jpn-entry="jpnEntry" class="mb-2 border-b border-ns-gray-200 pb-2 dark:border-ns-gray-700" />

    <div>
      <div v-for="(reading, ri) in jpnEntry.words.flatMap(word => word.readings)" :key="ri">
        <div v-for="(pitch, pi) in reading.pitch" :key="pi">
          <span
            v-for="(accent, ai) in pitch.pitchMap"
            :key="ai"
            :class="{
              'border-b': accent.t === 0 || accent.t === 2,
              'border-t': accent.t === 1 || accent.t === 3,
              'border-r': accent.t === 2 || accent.t === 3,
            }"
          >
            {{ accent.m }}
          </span>
          [{{ pitch.pitchNum }}]
        </div>
      </div>
    </div>

    <Meanings :meanings="jpnEntry.meanings" class="px-2" />
  </article>
</template>
