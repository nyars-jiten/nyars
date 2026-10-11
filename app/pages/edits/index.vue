<script setup lang="ts">
// Список правок по макету «Правки»: слева статус и фильтры, справа карточки правок.
// Чего нет на бэкенде — фильтруется на клиенте или выключено, см. docs/backend-edits.md.
const {
  filters,
  reset,
  activeCount,
  authorMissing,
  list,
  status,
  error,
  refresh,
  hasMore,
  loadingMore,
  loadMore,
  clientFiltered,
  reviewers,
  act,
} = useEditsList()

useHead({ title: 'Правки' })

const statusItems: UiSideNavItem[] = [
  { id: 'all', label: 'Все', status: 'all' },
  { id: 'pend', label: 'Не проверено', status: 'pend' },
  { id: 'work', label: 'Нужна доработка', status: 'work', disabled: true, hint: 'Появится, когда этот статус будет на сервере' },
  { id: 'ok', label: 'Приняты', status: 'ok' },
  { id: 'rej', label: 'Отклонены', status: 'rej' },
]

const statusModel = computed({
  get: () => filters.value.status,
  set: (value: string) => { filters.value.status = value as EditsFilters['status'] },
})

// на узком экране фильтры (кроме статуса) свёрнуты
const filtersOpen = ref(true)
onMounted(() => {
  if (window.matchMedia('(max-width: 900px)').matches)
    filtersOpen.value = false
})

/* ---------- раскрытые карточки ---------- */

const open = ref<Record<string, boolean>>({})

function openAll() {
  open.value = Object.fromEntries(list.value.map(edit => [edit.id, true]))
}

function closeAll() {
  open.value = {}
}

const loading = computed(() => status.value === 'pending' || status.value === 'idle')
</script>

<template>
  <div class="pb-[72px]">
    <header class="pt-[22px] pb-[18px]">
      <h1 class="m-0 text-4xl leading-[1.15] font-extrabold tracking-[-0.015em] normal-case">
        Правки
      </h1>
      <p class="m-0 mt-1.5 max-w-[640px] text-muted">
        Изменения статей во всех словарях: кто предложил, кто проверил и что именно поменялось.
      </p>
    </header>

    <div class="flex flex-wrap items-start gap-9 max-md:gap-6">
      <aside aria-label="Статус и фильтры правок" class="max-w-[280px] flex-[1_1_250px] max-[900px]:max-w-none max-[900px]:flex-[1_1_100%]">
        <div class="mb-1.5 flex items-baseline justify-between">
          <UiCaption class="m-0">
            Фильтры
          </UiCaption>
          <UiButton variant="link" size="sm" class="-mr-2 h-8 text-[13px] font-normal" @click="reset">
            Сбросить
          </UiButton>
        </div>

        <UiFilterGroup title="Статус">
          <UiSideNav v-model="statusModel" :items="statusItems" label="Статус правки" />
        </UiFilterGroup>

        <UiButton
          class="mb-4 min-[901px]:hidden"
          icon="tabler:adjustments-horizontal"
          :count="activeCount || undefined"
          :aria-expanded="filtersOpen"
          aria-controls="edits-filters"
          @click="filtersOpen = !filtersOpen"
        >
          {{ filtersOpen ? 'Скрыть фильтры' : 'Фильтры' }}
        </UiButton>

        <EditsFiltersPanel
          v-show="filtersOpen"
          id="edits-filters"
          v-model:filters="filters"
          :reviewers="reviewers"
          :author-missing="authorMissing"
        />
      </aside>

      <section aria-label="Список правок" class="min-w-0 flex-[999_1_640px]">
        <div class="flex flex-wrap items-center gap-x-4 gap-y-2.5 pb-0.5">
          <span class="text-[13.5px] text-muted" aria-live="polite">
            Показано: <b class="text-ink">{{ loading ? '…' : list.length }}</b><template v-if="hasMore && !loading">, есть ещё</template>
          </span>
          <UiButton variant="link" size="sm" class="h-10" :disabled="!list.length" @click="openAll">
            Развернуть все
          </UiButton>
          <UiButton variant="link" size="sm" class="h-10" :disabled="!list.length" @click="closeAll">
            Свернуть все
          </UiButton>
        </div>

        <div class="flex flex-col gap-2.5 pt-3">
          <template v-if="loading">
            <div v-for="i in 4" :key="i" class="animate-pulse rounded-panel py-4 pr-[18px] pl-16 shadow-[inset_0_0_0_1px_var(--line)]" aria-hidden="true">
              <div class="flex items-center gap-3">
                <div class="h-[26px] w-28 rounded-tag bg-soft" />
                <div class="h-8 w-20 rounded-ctl bg-soft" />
              </div>
              <div class="mt-2.5 h-4 w-72 max-w-full rounded-tag bg-soft" />
            </div>
            <span class="sr-only">Загружаем правки</span>
          </template>

          <div v-else-if="status === 'error'" class="py-6">
            <p class="m-0 font-semibold">
              Не удалось загрузить правки.
            </p>
            <p class="m-0 mt-1 text-sm text-muted">
              {{ error?.message }}
            </p>
            <UiButton class="mt-3" icon="tabler:refresh" @click="refresh()">
              Повторить
            </UiButton>
          </div>

          <template v-else-if="list.length">
            <EditItem
              v-for="edit in list"
              :key="edit.id"
              v-model:open="open[edit.id]"
              :edit="edit"
              :act="act"
            />
          </template>

          <UiEmptyState v-else-if="!loadingMore" title="По выбранным фильтрам правок нет">
            <template v-if="hasMore">
              Среди загруженных правок подходящих нет — можно поискать дальше.
            </template>
            <template #actions>
              <UiButton variant="primary" @click="reset">
                Сбросить фильтры
              </UiButton>
              <UiButton v-if="hasMore" @click="loadMore">
                Искать дальше
              </UiButton>
            </template>
          </UiEmptyState>
        </div>

        <div v-if="hasMore && list.length && !loading" class="flex justify-center pt-[22px]">
          <UiButton :disabled="loadingMore" :icon="loadingMore ? 'tabler:loader-2' : undefined" @click="loadMore">
            {{ loadingMore ? 'Загружаем…' : 'Показать ещё правки' }}
          </UiButton>
        </div>

        <p v-if="clientFiltered && !loading" class="m-0 mt-4 text-[13px] text-muted">
          Объём, проверяющий и дата «по» пока применяются к уже загруженным правкам.
        </p>
      </section>
    </div>
  </div>
</template>
