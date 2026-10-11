<script setup lang="ts">
// Фильтры списка правок (левая колонка /edits, кроме статуса). Состояние — useEditsList().
const props = defineProps<{
  /** проверяющие из загруженных правок */
  reviewers: readonly string[]
  /** введённого автора нет */
  authorMissing?: boolean
}>()

const filters = defineModel<EditsFilters>('filters', { required: true })

const { user } = storeToRefs(useUserStore())

function toggle<T>(list: T[], value: T) {
  return list.includes(value) ? list.filter(item => item !== value) : [...list, value]
}

const reviewerOptions = computed<UiOption<string>[]>(() => [
  { value: '', label: 'Любой' },
  { value: '-', label: 'Не назначен' },
  ...props.reviewers.map(name => ({ value: name, label: name })),
])

// пресеты периода пишут даты в поля «с/по», правка дат переключает на свой период
const range = computed(() => periodRange(filters.value))
const from = computed({
  get: () => range.value.from,
  set: (value: string) => {
    filters.value = { ...filters.value, period: 'custom', from: value, to: range.value.to }
  },
})
const to = computed({
  get: () => range.value.to || (filters.value.period === 'custom' ? '' : isoDay(new Date())),
  set: (value: string) => {
    filters.value = { ...filters.value, period: 'custom', from: range.value.from, to: value }
  },
})

function shortDay(day: string) {
  const [y, m, d] = day.split('-').map(Number)
  const date = new Date(y!, m! - 1, d!)
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: y === new Date().getFullYear() ? undefined : 'numeric',
  }).replace(/\.|\s?г$/g, '')
}

const rangeHint = computed(() => {
  const { from: a, to: b } = range.value
  if (!a && !b)
    return 'За всё время'
  if (a && a === b)
    return `Только ${shortDay(a)}`
  return `${a ? shortDay(a) : 'с начала'} — ${b ? shortDay(b) : 'сегодня'}`
})
</script>

<template>
  <div>
    <UiFilterGroup title="Словарь">
      <UiCheckbox
        v-for="dict in EDITS_DICTS"
        :key="dict"
        :model-value="filters.dicts.includes(dict)"
        @update:model-value="filters.dicts = toggle(filters.dicts, dict)"
      >
        {{ editDictionaryLabel(dict) }}
      </UiCheckbox>
    </UiFilterGroup>

    <UiFilterGroup title="Тип правки">
      <div class="flex flex-wrap gap-1.5">
        <UiChip
          v-for="kind in EDITS_KINDS"
          :key="kind"
          :pressed="filters.kinds.includes(kind)"
          @update:pressed="filters.kinds = toggle(filters.kinds, kind)"
        >
          {{ kind === EditType.Create ? 'новая статья' : kind === EditType.Delete ? 'удаление' : 'исправление' }}
        </UiChip>
      </div>
    </UiFilterGroup>

    <UiFilterGroup title="Объём правки">
      <div class="flex flex-wrap gap-1.5">
        <UiChip
          v-for="size in EDITS_SIZES"
          :key="size.value"
          :pressed="filters.sizes.includes(size.value)"
          @update:pressed="filters.sizes = toggle(filters.sizes, size.value)"
        >
          {{ size.label }}
        </UiChip>
      </div>
    </UiFilterGroup>

    <section class="border-t border-line py-4">
      <UiCaption as="label" for="edits-author" class="block">
        Автор
      </UiCaption>
      <UiInput
        id="edits-author"
        v-model="filters.author"
        type="search"
        placeholder="Ник участника"
        autocomplete="off"
        :disabled="filters.mine"
      />
      <p v-if="authorMissing && !filters.mine" class="m-0 mt-1.5 text-[12.5px] text-danger">
        Участник не найден
      </p>
    </section>

    <section class="border-t border-line py-4">
      <UiCaption as="label" for="edits-reviewer" class="block">
        Проверяющий
      </UiCaption>
      <UiSelect id="edits-reviewer" v-model="filters.reviewer" :options="reviewerOptions" />
    </section>

    <section class="border-t border-line py-4">
      <fieldset class="m-0 min-w-0 border-0 p-0">
        <UiCaption as="legend" class="p-0">
          Дата правки
        </UiCaption>
        <UiSegmented
          :model-value="filters.period"
          :options="EDITS_PERIODS"
          label="Период"
          class="flex! w-full *:flex-1 *:px-1.5!"
          @update:model-value="filters.period = $event as EditsPeriod"
        />
        <UiDateRange v-model:from="from" v-model:to="to" class="mt-2.5" />
        <p class="m-0 mt-1.5 text-[12.5px] text-muted">
          {{ rangeHint }}
        </p>
      </fieldset>
    </section>

    <section class="border-t border-line py-4">
      <UiCheckbox v-model="filters.mine" :disabled="!user">
        только мои правки
      </UiCheckbox>
      <UiCheckbox :model-value="false" disabled title="Появится вместе с обсуждениями правок на сервере">
        только с обсуждением
      </UiCheckbox>
    </section>
  </div>
</template>
