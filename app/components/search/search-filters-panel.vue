<script setup lang="ts">
// Панель фильтров выдачи. Фильтрация выполняется на сервере; состояние — useSearchFilters (синхронизируется с URL).
defineProps<{
  /** в режиме отдельного слова бэкенд фильтры не применяет */
  disabled?: boolean
}>()

const { filters, open, reset, activeCount } = useSearchFilters()
const { data: allTags } = useSearchTags()

const JLPT_RE = /^jlpt-n([1-5])$/i

const jlptTags = computed(() => allTags.value
  .filter(tag => JLPT_RE.test(tag.engShort))
  .sort((a, b) => b.engShort.localeCompare(a.engShort)))
const posTags = computed(() => allTags.value.filter(tag => tag.category === 'Pos'))
const otherTags = computed(() => allTags.value.filter(tag => tag.category !== 'Pos' && !JLPT_RE.test(tag.engShort)))

function jlptLabel(tag: SearchTag) {
  return `N${JLPT_RE.exec(tag.engShort)?.[1]}`
}

function setJlpt(id: number, value: TriState | undefined) {
  const next = { ...filters.value.tags }
  if (value)
    next[id] = value
  else
    delete next[id]
  filters.value.tags = next
}

const defLang = computed({
  get: () => filters.value.defLang ?? '',
  set: (value: DefLang | '') => { filters.value.defLang = value || null },
})

// ползунок и поля «от/до» правят одни и те же границы ранга
const rankSlider = computed<[number, number]>({
  get: (): [number, number] => [
    filters.value.rankMin === null ? 0 : rankToSlider(filters.value.rankMin),
    filters.value.rankMax === null ? RANK_SLIDER_MAX : rankToSlider(filters.value.rankMax),
  ],
  set: ([lo, hi]: [number, number]) => {
    const [curLo, curHi] = rankSlider.value
    if (lo !== curLo)
      filters.value.rankMin = lo <= 0 ? null : sliderToRank(lo)
    if (hi !== curHi) {
      filters.value.rankMax = hi >= RANK_SLIDER_MAX ? null : sliderToRank(hi)
      // верхняя граница ниже максимума — слова без ранга не подходят, и наоборот
      filters.value.includeUnranked = hi >= RANK_SLIDER_MAX
    }
  },
})

function numberModel(key: 'lenMin' | 'lenMax' | 'rankMin' | 'rankMax') {
  return computed({
    get: () => filters.value[key] === null ? '' : String(filters.value[key]),
    set: (value: string) => {
      const n = Number.parseInt(value, 10)
      filters.value[key] = Number.isFinite(n) && n > 0 ? n : null
      if (key === 'rankMax')
        filters.value.includeUnranked = filters.value.rankMax === null
    },
  })
}
const lenMin = numberModel('lenMin')
const lenMax = numberModel('lenMax')
const rankMin = numberModel('rankMin')
const rankMax = numberModel('rankMax')

const panelId = 'search-filters'
</script>

<template>
  <div>
    <UiButton v-if="!open" :count="activeCount || undefined" :aria-controls="panelId" aria-expanded="false" @click="open = true">
      <template #icon>
        <span class="font-jp text-base" aria-hidden="true">篩</span>
      </template>
      Фильтры
    </UiButton>

    <section v-else :id="panelId" aria-label="Фильтры">
      <div class="mb-1.5 flex items-center gap-2.5">
        <UiCaption class="m-0 flex-1">
          Фильтры
        </UiCaption>
        <button type="button" class="cursor-pointer text-[13px] text-strong hover:underline disabled:cursor-default disabled:text-muted disabled:no-underline" :disabled="!activeCount" @click="reset">
          Сбросить
        </button>
        <button
          type="button"
          class="inline-flex h-7 cursor-pointer items-center gap-[3px] rounded-ctl pr-2 pl-1 text-[13px] font-semibold text-muted hover:bg-soft hover:text-strong"
          aria-expanded="true"
          :aria-controls="panelId"
          title="Скрыть фильтры"
          @click="open = false"
        >
          <Icon name="tabler:chevron-left" size="14px" />
          Скрыть
        </button>
      </div>

      <p v-if="disabled" class="m-0 mb-2 text-sm text-muted">
        Для отдельного слова фильтры не применяются.
      </p>

      <fieldset :disabled="disabled" class="m-0 min-w-0 border-0 p-0" :class="{ 'opacity-50': disabled }">
        <UiFilterGroup title="Сортировка">
          <div class="flex items-center gap-2">
            <UiSelect v-model="filters.sort" :options="SORT_OPTIONS" aria-label="Сортировка" />
            <UiIconButton
              :icon="filters.desc ? 'tabler:sort-descending' : 'tabler:sort-ascending'"
              :pressed="filters.desc"
              :label="filters.desc ? 'Обратный порядок' : 'Прямой порядок'"
              @click="filters.desc = !filters.desc"
            />
          </div>
        </UiFilterGroup>

        <UiFilterGroup v-if="jlptTags.length" title="JLPT">
          <div class="flex flex-wrap gap-1.5">
            <UiTriChip
              v-for="tag in jlptTags"
              :key="tag.id"
              :model-value="filters.tags[tag.id]"
              class="min-w-11 justify-center"
              @update:model-value="setJlpt(tag.id, $event)"
            >
              {{ jlptLabel(tag) }}
            </UiTriChip>
          </div>
        </UiFilterGroup>

        <UiFilterGroup v-if="posTags.length" title="Часть речи">
          <SearchTagPicker v-model="filters.tags" :tags="posTags" placeholder="Найти часть речи" />
        </UiFilterGroup>

        <UiFilterGroup v-if="otherTags.length" title="Теги">
          <SearchTagPicker v-model="filters.tags" :tags="otherTags" />
        </UiFilterGroup>

        <UiFilterGroup title="Статус">
          <div class="flex flex-wrap gap-1.5">
            <UiTriChip
              v-for="mark in MARK_OPTIONS"
              :key="mark.value"
              :model-value="filters.marks[mark.value]"
              @update:model-value="filters.marks = { ...filters.marks, [mark.value]: $event }"
            >
              {{ mark.label }}
            </UiTriChip>
          </div>
        </UiFilterGroup>

        <UiFilterGroup title="Язык определения">
          <UiSelect v-model="defLang" :options="DEF_LANG_OPTIONS" aria-label="Язык определения" />
        </UiFilterGroup>

        <UiFilterGroup title="Частотность — ранг">
          <div class="flex items-center gap-2">
            <label class="flex min-w-0 flex-1 items-center gap-2 text-sm text-muted">
              от
              <UiInput v-model="rankMin" type="number" placeholder="1" aria-label="Частотность: от ранга" />
            </label>
            <label class="flex min-w-0 flex-1 items-center gap-2 text-sm text-muted">
              до
              <UiInput v-model="rankMax" type="number" :placeholder="String(RANK_MAX)" aria-label="Частотность: до ранга" />
            </label>
          </div>
          <UiRangeSlider v-model="rankSlider" label-from="Частотность: от ранга" label-to="Частотность: до ранга" />
          <div class="flex justify-between text-[11.5px] text-muted">
            <span>частые</span>
            <span>редкие</span>
          </div>
          <UiCheckbox v-model="filters.includeUnranked" class="mt-1">
            включать слова без ранга
          </UiCheckbox>
        </UiFilterGroup>

        <UiFilterGroup title="Длина заголовка, знаков">
          <div class="flex items-center gap-2">
            <label class="flex min-w-0 flex-1 items-center gap-2 text-sm text-muted">
              от
              <UiInput v-model="lenMin" type="number" aria-label="Длина заголовка: от" />
            </label>
            <label class="flex min-w-0 flex-1 items-center gap-2 text-sm text-muted">
              до
              <UiInput v-model="lenMax" type="number" aria-label="Длина заголовка: до" />
            </label>
          </div>
        </UiFilterGroup>

        <section class="border-t border-line py-4">
          <UiCheckbox v-model="filters.inTranslations">
            искать и в переводах
          </UiCheckbox>
        </section>
      </fieldset>
    </section>
  </div>
</template>
