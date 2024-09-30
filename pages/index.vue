<script setup lang="ts">
  definePageMeta({
    layout: 'desktop',
    name: 'Home'
  })

  const edits = Array.from({ length: 10 }).map((_, id) => (
    {
      id,
      dictionary: 4,
      identifier: 'z5CW',
      title: {
        磁針航路: [
          'じしんこうろ'
        ]
      } as Record<string, string[]>,
      type: 2,
      status: id % 4 + 1,
      author: {
        id: 1,
        username: 'Ёко',
        banned: false,
        role: 'Admin',
        access: 0,
        avatar: 'f0eccae4-0bd2-4d77-9bc5-095cd90ba058.png',
        isBot: false,
        userRating: null,
        createdDate: new Date('2020-10-12T21:35:20.538224Z')
      },
      approver: {
        id: 1,
        username: 'Ёко',
        banned: false,
        role: 'Admin',
        access: 0,
        avatar: 'f0eccae4-0bd2-4d77-9bc5-095cd90ba058.png',
        isBot: false,
        userRating: null,
        createdDate: new Date('2020-10-12T21:35:20.538224Z')
      },
      commentsCount: 0,
      createdDate: new Date('2024-09-28T09:18:31.723278Z'),
      modifiedDate: new Date('2024-09-28T09:18:31.773633Z')
    } as Edit))

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
  <section class="grid grid-cols-[1fr_auto] gap-8">
    <div class="grow space-y-8">
      <UiBlock class="space-y-4" size="large" :active="true">
        <div class="indent-10">
          {{ $t('pages.main.infoNyars') }}
        </div>

        <ul class="flex flex-col gap-1">
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
      </UiBlock>

      <UiBlock class="space-y-4" size="large" :active="true">
        <h1 class="text-3xl font-bold">
          activity
        </h1>

        <section class="space-y-4">
          <Edit
            v-for="edit of edits"
            :key="edit.id"
            :edit="edit"
          />
        </section>
      </UiBlock>
    </div>

    <div class="space-y-8">
      <div>
        <UsersTable />
      </div>

      <hr class="border-neutral-800">

      <div>
        summary
      </div>

      <hr class="border-neutral-800">

      <div>
        comments
      </div>
    </div>
  </section>
</template>
