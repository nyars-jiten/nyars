<script setup lang="ts">
  const searchStore = useSearchStore()

  const showModeSettings = ref(false)
</script>

<template>
  <section class="relative rounded-md bg-white shadow-md dark:bg-ns-gray-800">
    <div :class="`relative flex items-stretch border dark:border-ns-gray-700 ${showModeSettings ? 'rounded-t-md': 'rounded-md'}`">
      <button
        class="flex items-center p-4 capitalize opacity-100 duration-75 ease-in-out hover:bg-ns-gray-100 hover:opacity-75 dark:text-ns-gray-400 dark:hover:bg-ns-gray-700"
        @click="showModeSettings = !showModeSettings"
      >
        <span class="hidden md:block">
          {{ $t(`components.searchInput.mode.${searchStore.mode}`) }}
        </span>
        <IconChevronUp v-show="showModeSettings" class="!m-0 text-2xl text-ns-gray-400" />
        <IconChevronDown v-show="!showModeSettings" class="!m-0 text-2xl text-ns-gray-400" />
      </button>
      <div class="group relative z-20 grow">
        <input
          v-model="searchStore.searchQuery"
          type="text"
          class="peer h-full w-full text-center text-xl outline-none focus-within:bg-ns-gray-100 group-focus-within:bg-ns-gray-100 dark:bg-ns-gray-800 dark:focus-within:bg-ns-gray-700 dark:group-focus-within:bg-ns-gray-700"
          :placeholder="$t('components.searchInput.placeholder.words')"
        >
        <!-- TheSuggs -->
      </div>
      <button class="p-4 text-xl opacity-100 duration-75 ease-in-out hover:bg-ns-gray-100 hover:opacity-75 dark:hover:bg-ns-gray-700">
        <IconMagnify class="!m-0 text-2xl" />
      </button>
      <button class="p-4 text-xl opacity-100 duration-75 ease-in-out hover:bg-ns-gray-100 hover:opacity-75 dark:hover:bg-ns-gray-700">
        <IconDraw class="!m-0 text-2xl" />
      </button>
      <!-- <Transition
        enter-active-class="duration-150 ease-out"
        enter-from-class="transform opacity-0 translate-y-2"
        enter-to-class="opacity-100"
        leave-active-class="duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="transform opacity-0 translate-y-2"
        mode="out-in"
      >
        <TheHandwriting/>
      </Transition> -->
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
      <div v-show="showModeSettings" class="flex w-full flex-col gap-2 rounded-b-md border-x border-b p-4 text-sm leading-relaxed dark:border-ns-gray-700">
        <span class="text-ns-gray-500">
          {{ $t('components.searchInput.modeSettings.headerText') }}
        </span>
        <HeadlessRadioGroup v-model="searchStore.mode" class="flex flex-row gap-2">
          <HeadlessRadioGroupOption v-slot="{ checked }" value="words">
            <Button :disabled="checked">
              {{ $t('components.searchInput.mode.words') }}
            </Button>
          </HeadlessRadioGroupOption>
          <HeadlessRadioGroupOption v-slot="{ checked }" value="kanji">
            <Button :disabled="checked">
              {{ $t('components.searchInput.mode.kanji') }}
            </Button>
          </HeadlessRadioGroupOption>
        </HeadlessRadioGroup>
      </div>
    </Transition>
  </section>
</template>
