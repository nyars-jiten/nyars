<script setup lang="ts">
  const infoExamples = [
    // Кол-во примеров:
    [1, 2], // Поиск по японским словам
    [1, 2], // Поиск по русским и английским словам
    [1, 2, 3, 4], // Поиск по транскрипции
    [1], // Парсинг форм слова, предложений и текстов
    [1, 2] // Поиск по шаблону
  ]

  const config = useRuntimeConfig()

  const searchStore = useSearchStore()

  const { t } = useI18n()

  const getExample = (exampleType: number, exampleIndex: number) => {
    return t(`pages.main.infoExamples.${exampleType}.searchExamples.${exampleIndex}`)
  }

  const search = (example: string) => {
    searchStore.searchQuery = example
    searchStore.mode = 'words'
    navigateTo({ name: 'search-JpnEntries', query: { r: example } })
  }
</script>

<template>
  <section
    class="flex select-text flex-col gap-4 border border-ns-gray-100 bg-white p-10 shadow-md dark:border-ns-gray-700 dark:bg-ns-gray-800 md:rounded-md"
  >
    <div class="indent-10">
      {{ $t('pages.main.infoNyars') }}
    </div>
    <ul>
      <li v-for="(searchExamples, i) in infoExamples" :key="i">
        → {{ $t(`pages.main.infoExamples.${i+1}.text`) }}
        <span
          v-for="searchExample in searchExamples"
          :key="searchExample"
          class="whitespace-nowrap before:text-ns-gray-200 before:content-['「'] after:text-ns-gray-200 after:content-['」・'] last:after:content-['」'] dark:before:text-ns-gray-700 dark:after:text-ns-gray-700"
        >
          <button
            type="button"
            class="underline decoration-dotted underline-offset-4 hover:text-ns-500"
            @click="search(getExample(i+1, searchExample))"
          >
            {{ getExample(i+1, searchExample) }}
          </button>
        </span>
      </li>
    </ul>
    <i18n-t tag="div" keypath="pages.main.infoHelp" scope="global" class="indent-10">
      <NuxtLink to="https://docs.nyars.org" external target="_blank" class="select-text underline decoration-dotted underline-offset-4 hover:text-ns-500">
        {{ $t('pages.main.infoDocs') }}
      </NuxtLink>
      <NuxtLink :to="config.public.discordUrl" external target="_blank" class="select-text text-indigo-600 underline decoration-dotted underline-offset-4 hover:text-ns-500 dark:text-indigo-300 dark:hover:text-ns-500">
        {{ $t('pages.main.infoDiscord') }}
      </NuxtLink>
    </i18n-t>
  </section>
</template>
