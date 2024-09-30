<script setup lang="ts">
  interface Props {
    meanings: V2EntryJp['meanings']
  }

  const route = useRoute('jpn-wid')
  const isPreview = !route.params.wid

  defineProps<Props>()
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
        <Sense 
          v-for="(sense, senseIndex) of meaning.senses" 
          :key="senseIndex"  
          :sense="sense"
          :ix="meaning.senses.length > 1 || sense.subSenses.length > 0 ? `${senseIndex + 1}` : ''"
          :isPreview="isPreview"
          class="flex flex-col" 
        />
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
