<script setup lang="ts">
  interface Props {
    meanings: Meaning[]
  }

  defineProps<Props>()

  const route = useRoute('jpn-wid')

  const isPreview = !route.params.wid
</script>

<template>
  <div>
    <div v-for="(meaning, meaningIndex) of meanings" :key="meaningIndex">
      <div v-show="meanings.length > 1 || !isPreview" class="mb-2 border-b border-ns-gray-200 pb-2 pl-2 text-sm dark:border-ns-gray-700">
        <span
          v-for="tagPos of meaning.pos"
          :key="tagPos"
          class="pl-1 font-bold uppercase after:content-[','] first:pl-0 last:after:content-none"
        >
          {{ $t(`models.tags.pos.${tagPos}.full`) }}
        </span>
      </div>
      <div v-for="(lang, langIndex) of meaning.langMeanings" :key="langIndex">
        <div class="mb-2 flex gap-2">
          <span class="w-1/12 border-r border-ns-gray-200 text-center text-xs font-medium uppercase leading-6 text-ns-gray-400 dark:border-ns-gray-700 dark:text-ns-gray-400">
            {{ $t(`models.jpnEntry.language.${lang.lang}`) }}
          </span>
          <div class="flex w-11/12 flex-col">
            <div v-for="(sense, senseIndex) of lang.senses" :key="senseIndex" class="flex flex-col">
              <div class="flex">
                <span v-if="lang.senses.length > 1" class="min-w-[30px] text-center text-ns-gray-400">
                  {{ senseIndex + 1 }}
                </span>
                <div class="flex">
                  <div v-if="sense.tags.some(t => t.type === 'Fld')" class="mr-1 italic text-green-600">
                    <div
                      v-for="(tag, tagIndex) of sense.tags.filter(t => t.type === 'Fld')"
                      :key="tagIndex"
                    >
                      <span v-for="value of tag.values" :key="value" class="pl-1 after:content-[','] first:pl-0 last:after:content-none">
                        {{ $t(`models.tags.fld.${value}.short`) }}
                      </span>
                    </div>
                  </div>
                  <!-- TODO: DELETE V-HTML -->
                  <!-- eslint-disable-next-line vue/no-v-html -->
                  <span class="whitespace-pre-wrap" v-html="bbCodesToHtml(sense.value)"></span>
                  <span v-if="sense.tags.some(t => t.type === 'Misc')" class="italic text-ns-gray-400">
                    <div
                      v-for="(tag, tagIndex) of sense.tags.filter(t => t.type === 'Misc')"
                      :key="tagIndex"
                    >
                      <span v-for="value of tag.values" :key="value" class="pl-1 after:content-[','] first:before:content-['('] last:after:content-[')']">
                        {{ $t(`models.tags.misc.${value}.full`) }}
                      </span>
                    </div>
                  </span>
                </div>
              </div>
              <div v-if="!isPreview" class="my-1 ml-7">
                <ul v-for="(reference, referenceIndex) of sense.references" :key="referenceIndex">
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
              <PanelBody v-if="!isPreview && sense.examples?.length" class="mx-6 my-2">
                <p v-for="(example, exampleIndex) of sense.examples" :key="exampleIndex">
                  <!-- TODO: DELETE V-HTML -->
                  <!-- eslint-disable-next-line vue/no-v-html -->
                  <span class="whitespace-pre-wrap" v-html="furiganaToHtml(example.value)"></span>
                  {{ example.translation }}
                </p>
              </PanelBody>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
