<script setup lang="ts">
interface Props {
  meanings: EntryJp['meanings']
  showLemmas: boolean
}

defineProps<Props>()
const isPreview = false
</script>

<template>
  <div class="space-y-4">
    <div v-for="(meaning, meaningIndex) of meanings" :key="meaningIndex">
      <div v-show="meanings.length > 1 || !isPreview" class="space-x-2">
        <UiTag v-for="tagPos of meaning.tags" :key="tagPos.eng" kind="meaning" class="group relative cursor-help">
          {{ tagPos.rusShort }}

          <UiTooltip>
            {{ tagPos.rus }}
          </UiTooltip>
        </UiTag>
      </div>
      <!-- <div v-show="meanings.length > 1 || !isPreview" class="text-sm italic text-lime-600">
        <span
          v-for="tagPos of meaning.tags"
          :key="tagPos.eng"
          class="group relative pl-1 after:content-[','] first:pl-0 last:after:content-none"
        >
          {{ tagPos.ruShort }}
          <UiTooltip>
            {{ tagPos.ru }}
          </UiTooltip>
        </span>
      </div> -->

      <div class="w-11/12 space-y-2">
        <Sense
          v-for="(sense, senseIndex) of meaning.senses"
          :key="senseIndex"
          :sense="sense"
          :show-ix="meanings.length > 1 || meaning.senses.length > 1 || sense.subSenses.length > 0"
          :is-preview="isPreview"
          :show-lemmas="showLemmas"
          class="flex flex-col"
        />

        <div v-if="meaning.note.length > 0" class="flex flex-col">
          <div class="flex">
            <span class="min-w-[30px] text-center align-top text-neutral-400">
              ※
            </span>

            <div class="inline-block w-11/12">
              <Content :data="meaning.note" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
