<script setup lang="ts">
  interface Props {
    jpnEntry: JpnEntry
  }

  defineProps<Props>()
</script>

<template>
  <div class="flex items-start gap-4">
    <NuxtLink :to="{name: 'jpn-wid', params: {wid: jpnEntry.wid}}" class="flex grow flex-col hover:text-ns-500">
      <div
        v-for="(word, wordIndex) of jpnEntry.entry.words"
        :key="wordIndex"
        class="text-2xl"
      >
        <ul v-show="word.writings?.length" class="inline before:text-ns-gray-200 before:content-['【'] after:text-ns-gray-200 after:content-['】'] dark:before:text-ns-gray-700 dark:after:text-ns-gray-700">
          <li
            v-for="(writing, writingIndex) of word.writings"
            :key="writingIndex"
            class="inline-flex flex-wrap items-baseline before:text-ns-gray-200 after:text-ns-gray-200 after:content-['・'] last:after:content-none dark:after:text-ns-gray-700"
          >
            {{ writing.value }}
            <span
              v-for="(tag, tagIndex) of writing.tag?.values"
              :key="tagIndex"
              class="inline align-text-bottom text-sm italic text-fuchsia-700"
            >
              {{ $t(`models.tags.kinf.${tag}.short`) }}
            </span>
          </li>
        </ul>
        <ul class="inline">
          <li
            v-for="(reading, readingIndex) of word.readings"
            :key="readingIndex"
            class="inline-flex flex-wrap items-baseline after:text-ns-gray-200 after:content-['・'] last:after:content-none dark:after:text-ns-gray-700"
          >
            {{ reading.value }}
            <span
              v-for="(tag, tagIndex) of reading.tag?.values"
              :key="tagIndex"
              class="align-text-top text-sm italic text-fuchsia-700"
            >
              {{ $t(`models.tags.rinf.${tag}.short`) }}
            </span>
          </li>
        </ul>
      </div>
    </NuxtLink>
    <LazyTags :tags="jpnEntry.entry.tags" />
  </div>
</template>
