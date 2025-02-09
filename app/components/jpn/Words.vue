<script setup lang="ts">
interface Props {
  jpnEntry: EntryJp
  preview?: boolean
}

defineProps<Props>()
</script>

<template>
  <div>
    <header v-if="jpnEntry.preferFurigana" class="text-2xl">
      <ul class="inline dark:before:text-ns-gray-700 dark:after:text-ns-gray-700">
        <li
          v-for="furigana, wIndex of jpnEntry.furigana"
          :key="wIndex"
          class="inline-flex flex-wrap items-baseline before:text-ns-gray-200 after:text-ns-gray-200 after:content-['・'] last:after:content-none dark:after:text-ns-gray-700"
        >
          <Furigana :furigana="furigana" :preview="preview" />
        </li>
      </ul>
    </header>
    <template v-else>
      <div
        v-for="(word, wordIndex) of jpnEntry.words"
        :key="wordIndex"
      >
        <ul v-show="word.spellings?.length" class="inline text-2xl before:-ml-3 before:text-ns-gray-200 before:content-['【'] after:text-ns-gray-200 after:content-['】'] dark:before:text-ns-gray-700 dark:after:text-ns-gray-700">
          <li
            v-for="(spelling, spellingIndex) of word.spellings"
            :key="spellingIndex"
            class="inline-flex flex-wrap items-baseline before:text-ns-gray-200 after:text-ns-gray-200 after:content-['・'] last:after:content-none dark:after:text-ns-gray-700"
          >
            <span>
              {{ spelling.value }}
            </span>

            <EntryHeaderTag :tags="spelling.tags" />
          </li>
        </ul>

        <ul class="inline text-lg">
          <li
            v-for="(reading, readingIndex) of word.readings"
            :key="readingIndex"
            class="inline-flex flex-wrap items-baseline after:text-neutral-300 after:content-['・'] last:after:content-none dark:after:text-neutral-700"
          >
            <span>
              {{ reading.transcription?.kana }}
            </span>

            <EntryHeaderTag :tags="reading.tags" />
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>
