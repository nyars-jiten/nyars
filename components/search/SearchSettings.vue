<script setup lang="ts">
  const searchStore = useSearchStore()
</script>

<template>
  <div class="flex w-full flex-col gap-2 rounded-b-md border-x border-b p-4 text-sm leading-relaxed dark:border-ns-gray-700">
    <span class="text-ns-gray-500">
      {{ $t('components.searchInput.modeSettings.headerText') }}
    </span>
    <div class="flex flex-row gap-2">
      <div value="words">
        <Button :disabled="searchStore.mode === 'words'" @click="searchStore.mode = 'words'">
          {{ $t('components.searchInput.mode.words') }}
        </Button>
      </div>
      <div value="kanji">
        <Button :disabled="searchStore.mode === 'kanji'" @click="searchStore.mode = 'kanji'">
          {{ $t('components.searchInput.mode.kanji') }}
        </Button>
      </div>
    </div>
  </div>
</template>
