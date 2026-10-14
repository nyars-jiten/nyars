<script setup lang="ts">
// Строка поиска нового дизайна: поле с подчёркиванием, подсказки и история (combobox),
// рукописный ввод (筆) и поиск кандзи по ключам (部).
const props = withDefaults(defineProps<{
  /** header — поле с подчёркиванием в шапке; hero — крупная карточка с кнопкой «Найти» на главной */
  variant?: 'header' | 'hero'
}>(), {
  variant: 'header',
})

const { t } = useI18n()

const hero = computed(() => props.variant === 'hero')

const searchStore = useSearchStore()
const { searchQuery } = storeToRefs(searchStore)
const suggestionsStore = useSuggestionsStore()
const { suggestions, listType } = storeToRefs(suggestionsStore)

const root = useTemplateRef('root')
const input = useTemplateRef('input')

const inputId = useId()
const listId = useId()

type Panel = 'draw' | 'radicals'
const panel = ref<Panel | null>(null)
const listOpen = ref(false)
const active = ref(-1)

const isHistory = computed(() => listType.value === 0)
const showList = computed(() => listOpen.value && !panel.value && suggestions.value.length > 0)

watch(suggestions, () => {
  active.value = -1
})

function closeAll() {
  listOpen.value = false
  panel.value = null
}

onClickOutside(root, closeAll)

function onFocusOut(event: FocusEvent) {
  if (!root.value?.contains(event.relatedTarget as Node | null))
    listOpen.value = false
}

function onFocus() {
  listOpen.value = true
  input.value?.select()
}

// подсказки ищутся как точная фраза
function escape(value: string) {
  return !isHistory.value && value.length > 0 && value[0] !== '"' ? `"${value}"` : value
}

function search(value?: string) {
  // пустой запрос — просмотр словаря (с главной) или сброс запроса на странице поиска
  const query = (value ?? searchQuery.value).trim()

  searchStore.push(query)
  if (query)
    suggestionsStore.addToHistory(query)
  closeAll()
  input.value?.blur()
}

function pick(index: number) {
  const value = suggestions.value[index]
  if (value !== undefined)
    search(escape(value))
}

// любой ввод сбрасывает выбор стрелками: Enter ищет набранный текст, а не пункт, выбранный до правки
function onInput() {
  active.value = -1
  listOpen.value = true
}

function onKeydown(event: KeyboardEvent) {
  // Enter и стрелки при выборе кандзи в IME — не наши
  if (event.isComposing || event.keyCode === 229)
    return

  const count = suggestions.value.length

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      listOpen.value = true
      if (count)
        active.value = (active.value + 1) % count
      break
    case 'ArrowUp':
      event.preventDefault()
      listOpen.value = true
      if (count)
        active.value = active.value <= 0 ? count - 1 : active.value - 1
      break
    case 'Enter':
      event.preventDefault()
      if (showList.value && active.value >= 0)
        pick(active.value)
      else
        search()
      break
    case 'Escape':
      if (showList.value && active.value >= 0) {
        // первый Esc снимает выбор стрелками, второй закрывает список
        event.preventDefault()
        active.value = -1
      }
      else if (panel.value || showList.value) {
        event.preventDefault()
        closeAll()
      }
      break
    case 'Tab':
      listOpen.value = false
      break
  }
}

function togglePanel(name: Panel) {
  panel.value = panel.value === name ? null : name
  listOpen.value = false
}

function clear() {
  searchQuery.value = ''
  input.value?.focus()
}

// «/» — перейти к поиску с любого места страницы
onKeyStroke('/', (event) => {
  const target = event.target as HTMLElement | null
  if (target?.closest('input, textarea, select, [contenteditable="true"]'))
    return
  event.preventDefault()
  input.value?.focus()
})
</script>

<template>
  <div ref="root" class="relative" @focusout="onFocusOut">
    <form
      role="search"
      class="flex items-center transition-colors focus-within:border-strong"
      :class="hero
        ? 'gap-1.5 rounded-[14px] border-[1.5px] border-line bg-surf py-1.5 pr-1.5 pl-5 shadow-[0_6px_24px_rgba(0,0,0,.05)] max-sm:pl-3.5'
        : 'gap-1 border-b-2 border-ink'"
      @submit.prevent="search()"
    >
      <label :for="inputId" class="sr-only">Поиск по словарю</label>

      <input
        :id="inputId"
        ref="input"
        v-model="searchQuery"
        type="search"
        role="combobox"
        aria-autocomplete="list"
        :aria-expanded="showList"
        :aria-controls="listId"
        :aria-activedescendant="showList && active >= 0 ? `${listId}-${active}` : undefined"
        :placeholder="t('components.searchGroup.searchInput.placeholder.words')"
        autocomplete="off"
        autocapitalize="off"
        spellcheck="false"
        enterkeyhint="search"
        class="
          min-w-0 flex-1 border-0 bg-transparent font-jp text-ink outline-none
          placeholder:font-ui placeholder:text-muted
          [&::-webkit-search-cancel-button]:hidden
        "
        :class="hero ? 'h-[52px] text-[21px] placeholder:text-base' : 'h-12 text-[19px] placeholder:text-[15px]'"
        @focus="onFocus"
        @input="onInput"
        @keydown="onKeydown"
      >

      <UiIconButton v-if="searchQuery" icon="tabler:x" label="Очистить" size="sm" class="mr-1" @click="clear" />
      <UiIconButton glyph="筆" label="Рукописный ввод" :pressed="panel === 'draw'" @click="togglePanel('draw')" />
      <UiIconButton glyph="部" label="Поиск кандзи по ключам" :pressed="panel === 'radicals'" @click="togglePanel('radicals')" />
      <UiButton v-if="hero" type="submit" variant="primary" size="lg" class="ml-1 px-[22px]">
        Найти
      </UiButton>
    </form>

    <!-- история и подсказки -->
    <div
      v-if="showList"
      class="absolute inset-x-0 top-full z-40 mt-2 rounded-panel border border-line bg-surf p-1.5 shadow-lg"
    >
      <ul :id="listId" role="listbox" :aria-label="isHistory ? 'Недавние запросы' : 'Подсказки'" class="m-0 list-none p-0">
        <li
          v-for="(value, index) of suggestions"
          :id="`${listId}-${index}`"
          :key="`${index}-${value}`"
          role="option"
          :aria-selected="index === active"
          class="group flex h-10 cursor-pointer items-center gap-2.5 rounded-ctl pr-1 pl-2.5 text-ink hover:bg-soft aria-selected:bg-soft aria-selected:text-strong"
          @mousedown.prevent
          @click="pick(index)"
        >
          <Icon :name="isHistory ? 'tabler:history' : 'tabler:search'" size="16px" class="shrink-0 text-muted" />
          <span class="grow truncate font-jp text-base">{{ value }}</span>
          <button
            v-if="isHistory"
            type="button"
            tabindex="-1"
            class="inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-ctl text-muted opacity-0 transition-opacity group-hover:opacity-100 group-aria-selected:opacity-100 hover:bg-bg hover:text-danger"
            :aria-label="`Удалить «${value}» из истории`"
            title="Удалить из истории"
            @mousedown.prevent
            @click.stop="suggestionsStore.removeFromHistory(value)"
          >
            <Icon name="tabler:x" size="14px" />
          </button>
        </li>
      </ul>

      <p class="m-0 mt-1 border-t border-line px-2.5 pt-2 pb-1 text-xs text-muted max-sm:hidden">
        <kbd class="font-ui">↑</kbd> <kbd class="font-ui">↓</kbd> — выбрать · <kbd class="font-ui">Enter</kbd> — найти · <kbd class="font-ui">Esc</kbd> — закрыть
      </p>
    </div>

    <!-- рукописный ввод и ключи -->
    <ClientOnly>
      <DrawingPanel v-if="panel === 'draw'" class="absolute top-full left-0 z-40 mt-2 max-w-full" />
      <ComponentPanel v-else-if="panel === 'radicals'" class="absolute inset-x-0 top-full z-40 mt-2" />
    </ClientOnly>
  </div>
</template>
