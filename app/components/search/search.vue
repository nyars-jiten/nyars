<script lang="ts" setup>
const { t } = useI18n()

const { searchQuery } = storeToRefs(useSearchStore())
const { push } = useSearchStore()
const [state, toggle] = useToggle()

const panel = useTemplateRef('panelRef')

onClickOutside(panel, () => {
  toggle(false)
})
</script>

<template>
  <div class="md:flex max-md:grid items-center gap-4">
    <!-- grid-cols-[auto_1fr_auto] -->
    <!-- <UiButton type="button" icon="ic:baseline-text-fields" /> -->

    <section class="group relative inline-flex grow flex-row gap-2 rounded-md bg-zinc-800 p-2 leading-none text-zinc-500 shadow-md outline-1 outline-zinc-700 transition-colors focus-within:outline-none hover:bg-zinc-700 hover:text-zinc-300 hover:outline-transparent">
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="t('components.searchGroup.searchInput.placeholder.words')"
        class="w-full bg-transparent placeholder:text-center focus:outline-none"
        spellcheck="false"
        autocomplete="off"
        @keydown.enter.prevent="push()"
      >
      <!-- <Icon name="ic:baseline-search" size="1.5rem" /> -->

      <SearchSuggestions class="invisible group-focus-within:visible" />

      <DrawingPanel v-if="state" ref="panelRef" class="absolute left-0 top-full z-10 mt-4" />
    </section>

    <UiButton type="button" class="relative" icon="mdi:draw-pen" @click="toggle()">
      <span class="md:hidden">
        drawing
      </span>
    </UiButton>

    <!-- <div class="grid grid-cols-2 gap-2">

      <UiButton type="button" icon="ic:baseline-draw" />

      <UiButton type="button">
        部
      </UiButton>
    </div> -->
  </div>
</template>
