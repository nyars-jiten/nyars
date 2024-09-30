<script setup lang="ts">
  interface Props {
    meanings: V2EntryJp['meanings']
  }

  defineProps<Props>()

  // const { t } = useI18n()

  const route = useRoute('jpn-wid')
  // const searchStore = useSearchStore()

  const isPreview = !route.params.wid

  // const clickOnTooltip = (e: Event) => {
  //   const tag = (e.target as HTMLElement).dataset.tag
  //   if (tag) {
  //     searchStore.searchQuery = '#' + tag
  //   }
  // }

  // const bbCodesWithTagsToHTML = (sense: string | null, tags: Tag[]) => {
  //   if (tags.length === 0) {
  //     return bbCodesToHtml(sense)
  //   }

  //   let tagsFld = ''
  //   let tagsMisc = ''

  //   for (const tag of tags) {
  //     if (tag.type === 'Fld') {
  //       for (const value of tag.values ?? []) {
  //         /* eslint-disable @stylistic/indent-binary-ops */
  //         /* eslint-disable vue/script-indent */
  //         tagsFld += '<span class="group relative cursor-pointer pl-1 after:content-[\',\'] first:pl-0 last:mr-2 last:after:content-none">'
  //                       + t(`models.tags.fld.${value}.short`)
  //                       + '<div class="absolute hidden z-20 left-1/2 translate-x-[-50%] bottom-full pb-1 group-hover:block">'
  //                         + '<div class="flex items-center justify-center px-3 py-1.5 rounded-md border border-ns-gray-200 bg-white shadow-md dark:border-ns-gray-700 dark:bg-ns-gray-800">'
  //                           + `<span class="text-center leading-tight pb-[4px] text-wrap xl:text-nowrap xl:leading-[75%]">${t(`models.tags.fld.${value}.full`)}</span>`
  //                         + '</div>'
  //                       + '</div>'
  //                     + '</span>'
  //         /* eslint-enable @stylistic/indent-binary-ops */
  //         /* eslint-enable vue/script-indent */
  //       }
  //     }
  //     if (tag.type === 'Misc') {
  //       for (const value of tag.values ?? []) {
  //         tagsMisc += `<span class="pl-1 after:content-[','] first:before:content-['('] last:after:content-[')']">${t(`models.tags.misc.${value}.full`)}</span>`
  //       }
  //     }
  //   }
  //   return (
  //     `<span class="italic text-green-600">${tagsFld}</span>`
  //     + bbCodesToHtml(sense)
  //     + `<span class="italic text-ns-gray-400">${tagsMisc}</span>`
  //   )
  // }
</script>

<template>
  <div>
    <div v-for="(meaning, meaningIndex) of meanings" :key="meaningIndex">
      <div v-show="meanings.length > 1 || !isPreview" class="mb-2 border-b border-ns-gray-200 pb-2 pl-2 text-sm dark:border-ns-gray-700">
        <span
          v-for="tagPos of meaning.tags"
          :key="tagPos.eng"
          class="pl-1 font-bold uppercase after:content-[','] first:pl-0 last:after:content-none"
        >
          {{ tagPos.eng }}
        </span>
      </div>

      <div class="flex w-11/12 flex-col">
        <div v-for="(sense, senseIndex) of meaning.senses" :key="senseIndex" class="flex flex-col">
          <div class="flex">
            <span v-if="meaning.senses.length > 1" class="min-w-[30px] text-center text-ns-gray-400">
              {{ senseIndex + 1 }}
            </span>

            <Content :content="sense.content" />
          </div>

          <div v-if="!isPreview" class="my-1 ml-7">
            {{ sense.intRefs }}
            <ul v-for="(reference, referenceIndex) of sense.intRefs" :key="referenceIndex">
              <li>
                <span class="text-xs">
                  ⇒
                </span>

                <span class="ml-1 mr-2 italic">
                  {{ $t(`models.jpnEntry.referenceType.${reference.referenceType}`) }}
                </span>

                <NuxtLink
                  v-if="reference.target !== null && reference.target.length === 4"
                  :to="{name: 'jpn-wid', params: {wid: reference.target}}"
                  class="text-ns-500 underline decoration-dotted underline-offset-4"
                >
                  {{ reference.value }}
                </NuxtLink>

                <NuxtLink
                  v-else
                  :to="{name: 'search-JpnEntries', query: {r: reference.value}}"
                  class="text-ns-500 underline decoration-dotted underline-offset-4"
                >
                  {{ reference.value }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div v-if="!isPreview && sense.examples?.length" :class="`${meaning.senses.length > 1 ? 'ml-8':'ml-1'}`">
            <div v-for="(example, exampleIndex) of sense.examples" :key="exampleIndex" class="border-l-2 border-ns-gray-200 pl-2 text-neutral-500 dark:border-ns-gray-700">
              <Content :content="example.sentence" />
              <Content :content="example.translation" />
            </div>
          </div>
        </div>
        <div v-if="meaning.note.length > 0" class="flex flex-col">
          <div class="flex">
            <span class="min-w-[30px] text-center text-ns-gray-400">
              ※
            </span>

            <Content :content="meaning.note" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
