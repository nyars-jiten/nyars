<script setup lang="ts">
  interface Props {
    meanings: Meaning[]
  }

  defineProps<Props>()
</script>

<template>
  <div>
    <div v-for="(meaning, meaningIndex) of meanings" :key="meaningIndex">
      <div v-show="meanings.length > 1" class="mb-2 border-b border-ns-gray-200 pb-2 pl-2 text-sm dark:border-ns-gray-700">
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
            <div v-for="(sense, senseIndex) of lang.senses" :key="senseIndex" class="flex">
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
                      {{ value }}
                    </span>
                  </div>
                </div>
                <span class="whitespace-pre-wrap">{{ sense.value }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
