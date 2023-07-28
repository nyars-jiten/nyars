<script setup lang="ts">
// import { useI18n } from 'vue-i18n'
// import { storeToRefs } from '@pinia/nuxt'

// import { useSearch } from '@/stores/search'
// import { MessagesNames } from '@/locale/messages-names'
// import { ReadOnlyRequest } from '@/stores/search/types'
// import { SearchType } from '@/api/types/search/search-type'

// const { t, tm, rt } = useI18n()
// const { searchResults } = useSearch()
// const { mode } = storeToRefs(useSearch())

// async function search(params: ReadOnlyRequest) {
//   mode.value = SearchType.Jpn
//   return await searchResults(params)
// }
</script>

<template>
  <section
    class="flex select-text flex-col gap-4 border border-gray-100 bg-white p-10 shadow-md dark:border-gray-700 dark:bg-gray-800 md:rounded-md"
  >
    <div class="indent-10" v-text="$t('search.info_pre')" />

    <!-- <ul>
      <li v-for="info in tm(String(MessagesNames.SearchExamples))">
        ※
        {{ rt(info.message) }}

        <span v-for="example in info.examples"
          class="whitespace-nowrap before:text-gray-200 before:content-['「'] after:text-gray-200 after:content-['」・'] last:after:content-['」'] dark:before:text-gray-700 dark:after:text-gray-700">
          <button class="underline decoration-dotted underline-offset-4 hover:text-accent-500"
            @click="search({ request: rt(example) })">
            {{ rt(example) }}
          </button>
        </span>
      </li>
    </ul> -->

    <i18n-t class="indent-10" tag="div" :keypath="String('search.info_post')" scope="global">
      <template #docs>
        <ExternalIntextLink href="https://docs.nyars.org">
          {{ $t('search.info_docs') }}
        </ExternalIntextLink>
      </template>

      <template #discord>
        <ExternalIntextLink
          href="https://discord.gg/u7H5nsPWVB"
          class="text-indigo-600 hover:text-accent-500 dark:text-indigo-300 dark:hover:text-accent-500"
        >
          {{ $t('search.info_discord') }}
        </ExternalIntextLink>
      </template>
    </i18n-t>
  </section>
</template>
