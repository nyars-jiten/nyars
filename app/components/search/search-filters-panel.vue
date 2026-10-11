<script setup lang="ts">
// Панель фильтров выдачи. Значения и счётчики берутся из полученной выдачи (facets).
const props = defineProps<{
  facets: SearchFacets
  /** текущий запрос — для образцов в «Совпадении» */
  query: string
}>()

const { filters, open, reset, activeCount } = useSearchFilters()

const matchTiles = computed(() => matchOptions(props.query))

const posOptions = computed(() => props.facets.pos)

function togglePos(id: string, checked: boolean) {
  const excluded = new Set(filters.value.posExcluded)
  if (checked)
    excluded.delete(id)
  else
    excluded.add(id)
  filters.value.posExcluded = [...excluded]
}

const JLPT_CHIPS: { value: JlptFilter | 'all', label: string }[] = [
  { value: 'all', label: 'все' },
  ...JLPT_LEVELS.map(level => ({ value: level, label: level })),
  { value: 'none', label: 'вне' },
]

function jlptPressed(value: JlptFilter | 'all') {
  return value === 'all' ? filters.value.jlpt.length === 0 : filters.value.jlpt.includes(value)
}

function toggleJlpt(value: JlptFilter | 'all') {
  if (value === 'all') {
    filters.value.jlpt = []
    return
  }
  const set = new Set(filters.value.jlpt)
  if (set.has(value))
    set.delete(value)
  else
    set.add(value)
  filters.value.jlpt = [...set]
}

function toggleLabel(label: string) {
  const set = new Set(filters.value.labels)
  if (set.has(label))
    set.delete(label)
  else
    set.add(label)
  filters.value.labels = [...set]
}

const rankFrom = computed(() => sliderToRank(filters.value.rank[0]).toLocaleString('ru-RU'))
const rankTo = computed(() => filters.value.rank[1] >= 100 ? `${RANK_MAX.toLocaleString('ru-RU')}+` : sliderToRank(filters.value.rank[1]).toLocaleString('ru-RU'))

const LENGTH_FROM = [{ value: 0, label: 'от 1' }, ...[2, 3, 4, 6, 8].map(n => ({ value: n, label: `от ${n}` }))]
const LENGTH_TO = [{ value: 0, label: 'до ∞' }, ...[1, 2, 3, 4, 6, 8, 12].map(n => ({ value: n, label: `до ${n}` }))]
const lengthMin = computed({
  get: () => filters.value.lengthMin ?? 0,
  set: (value: number) => { filters.value.lengthMin = value || null },
})
const lengthMax = computed({
  get: () => filters.value.lengthMax ?? 0,
  set: (value: number) => { filters.value.lengthMax = value || null },
})

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

      <UiFilterGroup title="Сортировка">
        <UiSelect v-model="filters.sort" :options="SORT_OPTIONS" aria-label="Сортировка" />
      </UiFilterGroup>

      <UiFilterGroup title="Совпадение">
        <UiRadioTiles v-model="filters.match" :options="matchTiles" legend="Тип совпадения" />
        <p v-if="filters.match" class="m-0 mt-1.5 text-xs text-muted">
          Запрос: <code class="font-jp">{{ applyMatch(query, filters.match) }}</code>
          <button type="button" class="ml-1 cursor-pointer text-strong hover:underline" @click="filters.match = null">
            как ввели
          </button>
        </p>
      </UiFilterGroup>

      <UiFilterGroup v-if="posOptions.length" title="Часть речи">
        <UiCheckbox
          v-for="pos in posOptions"
          :key="pos.id"
          :model-value="!filters.posExcluded.includes(pos.id)"
          :count="pos.count"
          @update:model-value="togglePos(pos.id, Boolean($event))"
        >
          {{ pos.label }}
        </UiCheckbox>
      </UiFilterGroup>

      <UiFilterGroup title="JLPT">
        <div class="flex flex-wrap gap-1.5">
          <UiChip
            v-for="chip in JLPT_CHIPS"
            :key="chip.value"
            :pressed="jlptPressed(chip.value)"
            class="min-w-11 justify-center"
            :title="chip.value !== 'all' ? `${facets.jlpt[chip.value]} в выдаче` : undefined"
            @click="toggleJlpt(chip.value)"
          >
            {{ chip.label }}
          </UiChip>
        </div>
      </UiFilterGroup>

      <UiFilterGroup title="Частотность — ранг">
        <div class="flex justify-between text-sm font-semibold tabular-nums">
          <span>от № {{ rankFrom }}</span>
          <span>до № {{ rankTo }}</span>
        </div>
        <UiRangeSlider v-model="filters.rank" label-from="Частотность: от ранга" label-to="Частотность: до ранга" />
        <div class="flex justify-between text-[11.5px] text-muted">
          <span>частые</span>
          <span>редкие</span>
        </div>
        <UiCheckbox v-model="filters.includeUnranked" class="mt-1">
          включать слова без ранга
        </UiCheckbox>
      </UiFilterGroup>

      <UiFilterGroup v-if="facets.labels.length" title="Пометы">
        <div class="flex flex-wrap gap-1.5">
          <UiChip
            v-for="item in facets.labels"
            :key="item.label"
            :pressed="filters.labels.includes(item.label)"
            :title="`${item.count} в выдаче`"
            @click="toggleLabel(item.label)"
          >
            {{ item.label }}
          </UiChip>
        </div>
      </UiFilterGroup>

      <UiFilterGroup title="Длина заголовка, знаков">
        <div class="flex items-center gap-2">
          <UiSelect v-model="lengthMin" :options="LENGTH_FROM" aria-label="Длина заголовка: от" />
          <span class="text-muted">—</span>
          <UiSelect v-model="lengthMax" :options="LENGTH_TO" aria-label="Длина заголовка: до" />
        </div>
      </UiFilterGroup>

      <section class="border-t border-line py-4">
        <UiCheckbox v-model="filters.withExamples">
          только с примерами
        </UiCheckbox>
        <UiCheckbox v-model="filters.hideUnreviewed">
          скрыть непроверенные
        </UiCheckbox>
        <UiCheckbox v-model="filters.inTranslations">
          искать и в переводах
        </UiCheckbox>
      </section>
    </section>
  </div>
</template>
