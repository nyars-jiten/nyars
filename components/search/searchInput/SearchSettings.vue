<script setup lang="ts">
const searchStore = useSearchStore()
</script>

<template>
  <div class="flex w-full flex-col gap-2 rounded-b-md border-x border-b p-4 text-sm leading-relaxed dark:border-ns-gray-700">
    <span class="text-ns-gray-500">
      {{ $t('components.searchGroup.searchSettings.headerText') }}
    </span>
    <div class="flex flex-row gap-2">
      <div value="words">
        <SearchButton :disabled="searchStore.mode === 'words'" @click="searchStore.mode = 'words'">
          {{ $t('components.searchGroup.general.mode.words') }}
        </SearchButton>
      </div>
      <div value="kanji">
        <SearchButton :disabled="searchStore.mode === 'kanji'" @click="searchStore.mode = 'kanji'">
          {{ $t('components.searchGroup.general.mode.kanji') }}
        </SearchButton>
      </div>
    </div>
  </div>
</template>
