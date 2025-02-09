<script setup lang="ts">
definePageMeta({
  name: 'Home',
})

const { getEdits } = useEditRepo()
const { data: edits, refresh, status } = await useLazyAsyncData(
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
  // [1], // Парсинг форм слова, предложений и текстов
  // [1, 2], // Поиск по шаблону
]

const config = useRuntimeConfig()

const { push } = useSearchRequest()

const { t } = useI18n()

function getExample(exampleType: number, exampleIndex: number) {
  return t(`pages.main.infoExamples.${exampleType}.searchExamples.${exampleIndex}`)
}
</script>

<template>
  <section class="grid grid-cols-[1fr_auto] gap-8 max-lg:grid-cols-1">
    <div class="grow space-y-8">
      <div class="space-y-4 p-8">
        <div class="indent-10">
          {{ t('pages.main.infoNyars') }}
        </div>

        <ul class="flex flex-col gap-1">
          <li v-for="(searchExamples, i) in infoExamples" :key="i">
            → {{ t(`pages.main.infoExamples.${i + 1}.text`) }}
            <span
              v-for="searchExample in searchExamples"
              :key="searchExample"
              class="whitespace-nowrap before:text-neutral-200 before:content-['「'] after:text-neutral-200 after:content-['」・'] last:after:content-['」'] dark:before:text-neutral-700 dark:after:text-neutral-700"
            >
              <button
                type="button"
                class="underline decoration-dotted underline-offset-4 hover:text-neutral-500"
                @click="push(getExample(i + 1, searchExample))"
              >
                {{ getExample(i + 1, searchExample) }}
              </button>
            </span>
          </li>
        </ul>

        <i18n-t tag="div" keypath="pages.main.infoHelp" scope="global" class="indent-10">
          <NuxtLink :to="config.public.discordUrl" external target="_blank" class="select-text text-discord underline decoration-dotted underline-offset-4 hover:text-neutral-500 dark:text-indigo-300 dark:hover:text-neutral-500">
            {{ t('pages.main.infoDiscord') }}
          </NuxtLink>
        </i18n-t>
      </div>

      <h1 class="text-center text-4xl uppercase">
        activity
        <Icon class="bg-slate-500 align-baseline cursor-pointer" :class="{ 'animate-spin': status === 'pending' }" size="1.3rem" name="mdi:restart" @click="refresh()" />
      </h1>

      <section class="space-y-4">
        <Edit
          v-for="edit of edits"
          :key="edit.id"
          :edit="edit"
        />
      </section>
    </div>

    <div class="space-y-8 pr-2">
      <MainPageSidebar />
    </div>
  </section>
</template>
