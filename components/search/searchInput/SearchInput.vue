<script setup lang="ts">
  const searchStore = useSearchStore()

  const showSearchSettings = ref(false)

  const settings = ref(null)

  const input = ref<HTMLInputElement>()

  onClickOutside(settings, () => {
    showSearchSettings.value = false
  }, { capture: false })

  const search = async () => {
    if (searchStore.searchQuery.length === 0) {
      return
    }

    switch (searchStore.mode) {
      case 'words':
        await navigateTo({ name: 'search-JpnEntries', query: { r: searchStore.searchQuery } })
        break
      case 'kanji':
        await navigateTo({ name: 'search-KanjiEntries', query: { r: searchStore.searchQuery } })
        break
    }
  }

  const searchEnter = async () => {
    const currentSuggestion = searchStore.currentSuggestion
    if (currentSuggestion !== -1) {
      searchStore.searchQuery = (await searchStore.getSuggestions)[currentSuggestion]
      await navigateTo({ name: 'search-JpnEntries', query: { r: searchStore.searchQuery } })
    } else {
      search()
    }
    input.value?.blur()
  }
</script>

<template>
  <section class="relative rounded-md bg-white shadow-md dark:bg-ns-gray-800">
    <div :class="`relative flex items-stretch border dark:border-ns-gray-700 ${showSearchSettings ? 'rounded-t-md': 'rounded-md'}`">
      <button
        type="button"
        :class="`flex items-center p-4 capitalize opacity-100 duration-75 ease-in-out hover:bg-ns-gray-100 hover:opacity-75 dark:text-ns-gray-400 dark:hover:bg-ns-gray-700 ${showSearchSettings ? 'rounded-tl-md': 'rounded-l-md'}`"
        @click.stop="showSearchSettings = !showSearchSettings"
      >
        <span class="hidden sm:block">
          {{ $t(`components.searchGroup.general.mode.${searchStore.mode}`) }}
        </span>
        <IconChevronUp v-show="showSearchSettings" class="!m-0 text-2xl text-ns-gray-400" />
        <IconChevronDown v-show="!showSearchSettings" class="!m-0 text-2xl text-ns-gray-400" />
      </button>
      <div class="relative z-20 grow">
        <input
          ref="input"
          v-model="searchStore.searchQuery"
          type="text"
          class="peer size-full text-center text-xl outline-none dark:bg-ns-gray-800"
          :placeholder="$t(`components.searchGroup.searchInput.placeholder.${searchStore.mode}`)"
          autofocus
          @focus="($event.target as HTMLInputElement).select()"
          @keydown.enter="searchEnter"
          @keydown.prevent.up="searchStore.setCurrentSuggestion('up')"
          @keydown.prevent.down="searchStore.setCurrentSuggestion('down')"
          @blur="searchStore.setCurrentSuggestion('reset')"
        >
        <LazySuggestions v-if="searchStore.mode === 'words'" />
      </div>
      <button
        type="button"
        class="rounded-r-md p-4 text-xl opacity-100 duration-75 ease-in-out hover:bg-ns-gray-100 hover:opacity-75 dark:hover:bg-ns-gray-700"
        @click="search"
      >
        <IconMagnify class="!m-0 text-2xl" />
      </button>
    </div>
    <LazySearchSettings v-if="showSearchSettings" ref="settings" />
  </section>
</template>
