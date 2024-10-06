<script setup lang="ts">
definePageMeta({
  layout: 'desktop',
  name: 'Home',
})

const { getEdits } = useApi(editRepository)
const { data: edits } = await useLazyAsyncData(
  'edits',
  () => getEdits(),
  {
    default: (): EditResponse[] => [],
  },
)

const infoExamples = [
  // Кол-во примеров:
  [1, 2], // Поиск по японским словам
  [1, 2], // Поиск по русским и английским словам
  [1, 2, 3, 4], // Поиск по транскрипции
  [1], // Парсинг форм слова, предложений и текстов
  [1, 2], // Поиск по шаблону
]

const config = useRuntimeConfig()

const searchStore = useSearchStore()

const { t } = useI18n()

function getExample(exampleType: number, exampleIndex: number) {
  return t(`pages.main.infoExamples.${exampleType}.searchExamples.${exampleIndex}`)
}

function search(example: string) {
  searchStore.searchQuery = example
  searchStore.mode = 'words'
  
  return navigateTo({ name: 'search-JpnEntries', query: { r: example } })
}
</script>

<template>
  <section class="grid grid-cols-[1fr_auto] gap-8 max-lg:grid-cols-1">
    <div class="grow space-y-8">
      <UiBlock class="space-y-4" size="large" :active="true">
        <div class="indent-10">
          {{ t('pages.main.infoNyars') }}
        </div>

        <ul class="flex flex-col gap-1">
          <li v-for="(searchExamples, i) in infoExamples" :key="i">
            → {{ t(`pages.main.infoExamples.${i + 1}.text`) }}
            <span
              v-for="searchExample in searchExamples"
              :key="searchExample"
              class="whitespace-nowrap before:text-ns-gray-200 before:content-['「'] after:text-ns-gray-200 after:content-['」・'] last:after:content-['」'] dark:before:text-ns-gray-700 dark:after:text-ns-gray-700"
            >
              <button
                type="button"
                class="underline decoration-dotted underline-offset-4 hover:text-ns-500"
                @click="search(getExample(i + 1, searchExample))"
              >
                {{ getExample(i + 1, searchExample) }}
              </button>
            </span>
          </li>
        </ul>

        <i18n-t tag="div" keypath="pages.main.infoHelp" scope="global" class="indent-10">
          <NuxtLink to="https://docs.nyars.org" external target="_blank" class="select-text underline decoration-dotted underline-offset-4 hover:text-ns-500">
            {{ t('pages.main.infoDocs') }}
          </NuxtLink>
          <NuxtLink :to="config.public.discordUrl" external target="_blank" class="select-text text-indigo-600 underline decoration-dotted underline-offset-4 hover:text-ns-500 dark:text-indigo-300 dark:hover:text-ns-500">
            {{ t('pages.main.infoDiscord') }}
          </NuxtLink>
        </i18n-t>
      </UiBlock>

      <h1 class="text-center text-4xl uppercase">
        activity
      </h1>

      <section class="space-y-4">
        <Edit
          v-for="edit of edits"
          :key="edit.id"
          :edit="edit"
        />
      </section>
    </div>

    <div class="space-y-8">
      <div>
        <UsersTable />
      </div>

      <hr class="border-neutral-800 max-lg:hidden">

      <div>
        summary
      </div>

      <hr class="border-neutral-800 max-lg:hidden">

      <div>
        comments
      </div>
    </div>
  </section>
</template>
