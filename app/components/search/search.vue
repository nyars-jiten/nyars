<script lang="ts" setup>
const { t } = useI18n()
const { searchQuery } = storeToRefs(useSearchStore())
const { addToHistory } = useSuggestionsStore()
const { push } = useSearchStore()
const [drawState, toggleDraw] = useToggle()
const [compState, toggleComp] = useToggle()

const panel = useTemplateRef('panelRef')
const drawButton = useTemplateRef('drawButtonRef')
const compPanel = useTemplateRef('compPanelRef')
const compButton = useTemplateRef('compButtonRef')

onClickOutside(panel, () => {
  toggleDraw(false)
}, { ignore: [drawButton] })

onClickOutside(compPanel, () => {
  toggleComp(false)
}, { ignore: [compButton] })

function openDraw() {
  toggleComp(false)
  toggleDraw()
}

function openComp() {
  toggleDraw(false)
  toggleComp()
}
</script>

<template>
  <div class="md:flex max-md:grid items-center gap-4">
    <!-- grid-cols-[auto_1fr_auto] -->
    <!-- <UiButton type="button" icon="ic:baseline-text-fields" /> -->

    <section class="group relative inline-flex grow flex-row gap-2 rounded-md bg-zinc-800 p-2 leading-none text-zinc-500 shadow outline-1 outline-zinc-700 transition-colors focus-within:outline-none hover:bg-zinc-700 hover:text-zinc-300 hover:outline-transparent">
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="t('components.searchGroup.searchInput.placeholder.words')"
        class="w-full bg-transparent placeholder:text-center focus:outline-none"
        spellcheck="false"
        autocomplete="off"
        @focus="($event.target as HTMLInputElement).select()"
        @keydown.enter.prevent="push(); addToHistory(searchQuery)"
      >

      <ClientOnly>
        <SearchSuggestions :class="(drawState || compState) ? 'invisible' : 'invisible group-focus-within:visible'" />
      </ClientOnly>

      <DrawingPanel v-if="drawState" ref="panelRef" class="absolute left-0 top-full z-10 mt-4" />
      <ComponentPanel v-if="compState" ref="compPanelRef" class="absolute left-0 top-full z-10 mt-4 w-full" />
    </section>

    <UiButton ref="drawButtonRef" type="button" class="relative" icon="mdi:draw-pen" @click="openDraw()">
      <span class="md:hidden">
        drawing
      </span>
    </UiButton>

    <UiButton ref="compButtonRef" type="button" class="relative text-2xl" @click="openComp()">
      部
    </UiButton>
  </div>
</template>
