<script setup lang="ts">
interface Props {
  jpnEntry: V2EntryJp
}

defineProps<Props>()
</script>

<template>
  <div class="flex cursor-text flex-col items-start gap-3 pl-4">
    <!-- TODO: bruh -->
    <div class="flex flex-col hyphens-auto">
      <div
        class="text-2xl"
      >
        <ul class="inline  dark:before:text-ns-gray-700 dark:after:text-ns-gray-700">
          <li
            v-for="(furigana, fI) of jpnEntry.furigana"
            :key="fI"
            class="inline-flex flex-wrap items-baseline before:text-ns-gray-200 after:text-ns-gray-200 after:content-['・'] last:after:content-none dark:after:text-ns-gray-700"
          >
            <Furigana :furigana="furigana" />
          </li>
        </ul>
      </div>
      <!-- <div
        v-for="(word, wordIndex) of jpnEntry.words"
        :key="wordIndex"
        class="text-2xl"
      > -->

      <!-- <ul v-show="word.writings?.length" class="inline before:-ml-3 before:text-ns-gray-200 before:content-['【'] after:text-ns-gray-200 after:content-['】'] dark:before:text-ns-gray-700 dark:after:text-ns-gray-700">
          <li
            v-for="(writing, writingIndex) of word.writings"
            :key="writingIndex"
            class="inline-flex flex-wrap items-baseline gap-2 before:text-ns-gray-200 after:text-ns-gray-200 after:content-['・'] last:after:content-none dark:after:text-ns-gray-700"
          >
            <span>
              {{ writing.value }}
            </span>

            <span class="space-x-2">
              <small
                v-for="(tag, tagIndex) of writing.tags"
                :key="tagIndex"
                class="inline align-text-top text-sm italic text-fuchsia-700"
              >
                {{ tag.engShort }}
              </small>
            </span>
          </li>
        </ul> -->
      <!--
        <ul class="inline">
          <li
            v-for="(reading, readingIndex) of word.readings"
            :key="readingIndex"
            class="inline-flex flex-wrap items-baseline gap-2 after:text-neutral-300 after:content-['・'] last:after:content-none dark:after:text-neutral-700"
          >
            <span>
              {{ reading.transcription?.kana }}
            </span>

            <span class="space-x-2 leading-none">
              <small
                v-for="(tag, tagIndex) of reading.tags"
                :key="tagIndex"
                class="align-text-top text-sm italic text-fuchsia-700"
              >
                {{ tag.engShort }}
              </small>
            </span>
          </li>
        </ul> -->
      <!-- </div> -->
    </div>

    <Tags :tags="jpnEntry.tags" />
  </div>
</template>
