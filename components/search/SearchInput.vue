<script setup lang="ts">
  const searchStore = useSearchStore()

  const showSearchSettings = ref(false)

  const settings = ref(null)

  onClickOutside(settings, () => {
    showSearchSettings.value = false
  }, { capture: false })
</script>

<template>
  <section class="relative rounded-md bg-white shadow-md dark:bg-ns-gray-800">
    <div :class="`relative flex items-stretch border dark:border-ns-gray-700 ${showSearchSettings ? 'rounded-t-md': 'rounded-md'}`">
      <button
        :class="`flex items-center p-4 capitalize opacity-100 duration-75 ease-in-out hover:bg-ns-gray-100 hover:opacity-75 dark:text-ns-gray-400 dark:hover:bg-ns-gray-700 ${showSearchSettings ? 'rounded-tl-md': 'rounded-l-md'}`"
        @click.stop="showSearchSettings = !showSearchSettings"
      >
        <span class="hidden sm:block">
          {{ $t(`components.searchInput.mode.${searchStore.mode}`) }}
        </span>
        <IconChevronUp v-show="showSearchSettings" class="!m-0 text-2xl text-ns-gray-400" />
        <IconChevronDown v-show="!showSearchSettings" class="!m-0 text-2xl text-ns-gray-400" />
      </button>
      <div class="group relative z-20 grow">
        <input
          v-model="searchStore.searchQuery"
          type="text"
          class="peer h-full w-full text-center text-xl outline-none focus-within:bg-ns-gray-100 group-focus-within:bg-ns-gray-100 dark:bg-ns-gray-800 dark:focus-within:bg-ns-gray-700 dark:group-focus-within:bg-ns-gray-700"
          :placeholder="$t('components.searchInput.placeholder.words')"
        >
        <LazySuggestions v-if="searchStore.mode === 'words'" />
      </div>
      <button class="rounded-r-md p-4 text-xl opacity-100 duration-75 ease-in-out hover:bg-ns-gray-100 hover:opacity-75 dark:hover:bg-ns-gray-700">
        <IconMagnify class="!m-0 text-2xl" />
      </button>
    </div>
    <Transition
      enter-active-class="duration-200 ease-out"
      enter-from-class="max-h-0"
      enter-to-class="max-h-56"
      leave-active-class="duration-200 ease-in"
      leave-from-class="max-h-56"
      leave-to-class=" max-h-0"
      mode="in-out"
    >
      <LazySearchSettings v-if="showSearchSettings" ref="settings" />
    </Transition>
  </section>
</template>
