<script setup lang="ts">
interface Props {
  jpnEntry: V2EntryJp
}

defineProps<Props>()

const route = useRoute('jpn-wid')

const isPreview = !route.params.wid
</script>

<template>
  <div class="flex cursor-text flex-col items-start gap-3 pl-4">
    <NuxtLink
      :to="{ name: 'jpn-wid', params: { wid: jpnEntry.wid } }"
      :class="`flex flex-col break-all ${isPreview ? 'hover:text-ns-500' : 'pointer-events-none'}`"
    >
      <div
        v-for="(word, wordIndex) of jpnEntry.words"
        :key="wordIndex"
        class="text-2xl"
      >
        <div class="mb-2 ml-6">
          <ul v-show="word.furigana?.length" class="inline before:-ml-3 dark:before:text-ns-gray-700 dark:after:text-ns-gray-700">
            <li
              v-for="(furigana, fi) of word.furigana"
              :key="fi"
              class="inline-flex flex-wrap items-baseline before:text-ns-gray-200 after:text-ns-gray-200 after:content-['・'] last:after:content-none dark:after:text-ns-gray-700"
            >
              <Furigana :furigana="furigana" />
            </li>
          </ul>
        </div>
        <ul v-show="word.writings?.length" class="inline before:-ml-3 before:text-ns-gray-200 before:content-['【'] after:text-ns-gray-200 after:content-['】'] dark:before:text-ns-gray-700 dark:after:text-ns-gray-700">
          <li
            v-for="(writing, writingIndex) of word.writings"
            :key="writingIndex"
            class="inline-flex flex-wrap items-baseline before:text-ns-gray-200 after:text-ns-gray-200 after:content-['・'] last:after:content-none dark:after:text-ns-gray-700"
          >
            {{ writing.value }}
            <span
              v-for="(tag, tagIndex) of writing.tags"
              :key="tagIndex"
              class="inline align-text-bottom text-sm italic text-fuchsia-700"
            >
              {{ tag.engShort }}
            </span>
          </li>
        </ul>
        <ul class="inline">
          <li
            v-for="(reading, readingIndex) of word.readings"
            :key="readingIndex"
            class="inline-flex flex-wrap items-baseline after:text-ns-gray-200 after:content-['・'] last:after:content-none dark:after:text-ns-gray-700"
          >
            {{ reading.transcription?.kana }}

            <span
              v-for="(tag, tagIndex) of reading.tags"
              :key="tagIndex"
              class="align-text-top text-sm italic text-fuchsia-700"
            >
              {{ tag.engShort }}
            </span>
          </li>
        </ul>
      </div>
    </NuxtLink>
    <LazyTags :tags="jpnEntry.tags" />
  </div>
</template>
