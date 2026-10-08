<script lang="ts" setup>
const { t } = useI18n()
const route = useRoute()
const { searchQuery } = storeToRefs(useSearchStore())
const { addToHistory } = useSuggestionsStore()
const { push } = useSearchStore()
const { openFilters } = useHzChrome()

if (!searchQuery.value && route.query.q)
  searchQuery.value = String(route.query.q)

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

function onSubmit() {
  push()
  addToHistory(searchQuery.value)
}
</script>

<template>
  <form
    role="search"
    class="relative flex min-w-0 flex-[1_1_520px] items-center gap-1 border-b-2 border-ink"
    @submit.prevent="onSubmit"
  >
    <label for="hz-q" class="sr-only">{{ t('components.searchGroup.searchInput.placeholder.words') }}</label>
    <input
      id="hz-q"
      v-model="searchQuery"
      type="search"
      class="hz-jp h-12 min-w-0 flex-1 border-0 bg-transparent text-[19px] text-ink outline-none"
      spellcheck="false"
      autocomplete="off"
      :placeholder="t('components.searchGroup.searchInput.placeholder.words')"
      @focus="($event.target as HTMLInputElement).select()"
    >

    <button
      ref="drawButtonRef"
      type="button"
      class="hz-ibtn"
      aria-label="Рукописный ввод"
      title="Рукописный ввод"
      @click="openDraw()"
    >
      筆
    </button>
    <button
      ref="compButtonRef"
      type="button"
      class="hz-ibtn"
      aria-label="Поиск по ключам"
      title="Ключи"
      @click="openComp()"
    >
      部
    </button>
    <button
      type="button"
      class="hz-ibtn"
      aria-label="Расширенный поиск"
      title="Фильтры"
      @click="openFilters()"
    >
      篩
    </button>

    <ClientOnly>
      <SearchSuggestions
        :class="(drawState || compState) ? 'invisible' : 'invisible group-focus-within:visible'"
      />
    </ClientOnly>

    <DrawingPanel v-if="drawState" ref="panelRef" class="absolute top-full left-0 z-20 mt-3" />
    <ComponentPanel v-if="compState" ref="compPanelRef" class="absolute top-full left-0 z-20 mt-3 w-full" />
  </form>
</template>
