<script setup lang="ts">
interface Props {
  meanings: V2EntryJp['meanings']
}

defineProps<Props>()
const isPreview = false
</script>

<template>
  <div class="space-y-4">
    <div v-for="(meaning, meaningIndex) of meanings" :key="meaningIndex">
      <div v-show="meanings.length > 1 || !isPreview" class="space-x-2">
        <small
          v-for="tagPos of meaning.tags"
          :key="tagPos.eng"
          class="group relative cursor-pointer rounded-sm uppercase leading-none text-xs bg-lime-900 p-0.5 px-1"
        >
          {{ tagPos.ruShort.replaceAll('.', '') }}

          <UiTooltip>
            {{ tagPos.ru }}
          </UiTooltip>
        </small>
      </div>

      <div class="w-11/12 space-y-2">
        <Sense
          v-for="(sense, senseIndex) of meaning.senses"
          :key="senseIndex"
          :sense="sense"
          :ix="meaning.senses.length > 1 || sense.subSenses.length > 0 ? `${senseIndex + 1}` : ''"
          :is-preview="isPreview"
          class="flex flex-col"
        />

        <div v-if="meaning.note.length > 0" class="flex flex-col">
          <div class="flex">
            <span class="min-w-[30px] text-center align-top text-ns-gray-400">
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
