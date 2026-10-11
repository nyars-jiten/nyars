<script setup lang="ts">
// Страница статьи японско-русского словаря (макет «Статья»).
// Слева — сведения о статье (статус, произношение, кандзи, частотность, история, действия),
// справа — заглавное слово, значения и вкладки «История · Обсуждение · Сателлиты · Сканы».
// На узком экране порядок: слово и значения → сведения → вкладки.
// Шаблон страницы (шапка, подвал) задаёт родительский pages/dict/jpn.vue.
// Чего нет на бэкенде — см. docs/backend-entry.md.
definePageMeta({
  layout: false,
  alias: '/jp/:wid',
})

const route = useRoute('dict-jpn-wid')
const { getEntryData } = useJpnEntries()
const { user } = storeToRefs(useUserStore())

/** параметр как в адресе: 1577460-蛙 */
const wid = computed(() => String(route.params.wid))
/** чистый wid для правок, сателлитов и сканов */
const rawWid = computed(() => wid.value.split('-')[0] ?? wid.value)

const { data: entry, status, error, refresh } = useAsyncData(
  () => `entry-${wid.value}`,
  () => getEntryData(wid.value),
)

const { edits, satellites, scans } = useEntryExtras(rawWid)

const forms = computed(() => entry.value ? headwordForms(entry.value) : [])
const headword = computed(() => forms.value[0]?.text ?? entry.value?.title ?? '')
/** все обычные написания подряд — из них берутся «Кандзи в записи» */
const mainText = computed(() => splitHeadwordForms(forms.value).main.map(form => form.text).join(''))
const flags = computed(() => entry.value ? entryStatusFlags(entry.value.status) : [])
const summary = computed(() => summarizeEdits(edits.data.value))

const showLemmas = ref(false)

/* ---------- вкладки ---------- */

type Tab = 'hist' | 'disc' | 'sat' | 'scan' | 'llm'
const tab = ref<Tab>('hist')

watch(wid, () => {
  tab.value = 'hist'
  if (import.meta.client)
    window.scrollTo(0, 0)
})

const tabs = computed<UiTabItem[]>(() => [
  { id: 'hist', label: 'История', count: edits.data.value ? summary.value.list.length : undefined },
  { id: 'disc', label: 'Обсуждение', disabled: true, hint: 'Обсуждение статей появится позже' },
  { id: 'sat', label: 'Сателлиты', count: satellites.data.value?.length },
  { id: 'scan', label: 'Сканы', count: scans.data.value?.length },
  ...(user.value?.isAdmin ? [{ id: 'llm', label: 'LLM' }] : []),
])

const tabModel = computed({
  get: () => tab.value,
  set: (value: string) => { tab.value = value as Tab },
})

function openHistory() {
  tab.value = 'hist'
}

/* ---------- заголовок вкладки браузера ---------- */

useHead({ title: () => headword.value || entry.value?.title || 'Статья' })

const flagText: Record<EntryStatusFlag['kind'], string> = {
  warn: 'text-warn',
  danger: 'text-danger',
  dial: 'text-dial',
  neutral: 'text-muted',
}
</script>

<template>
  <div>
    <!-- загрузка -->
    <div v-if="!entry && (status === 'pending' || status === 'idle')" class="pt-[18px] pb-[72px]" aria-busy="true">
      <span class="sr-only">Статья загружается</span>
      <div class="grid gap-8 min-[1000px]:grid-cols-[minmax(240px,290px)_minmax(0,1fr)] min-[1000px]:gap-x-12" aria-hidden="true">
        <div class="hidden flex-col gap-3 min-[1000px]:flex">
          <div class="h-3 w-24 rounded-tag bg-soft" />
          <div class="h-8 w-40 animate-pulse rounded-ctl bg-soft" />
          <div class="mt-4 h-3 w-24 rounded-tag bg-soft" />
          <div class="h-12 w-48 animate-pulse rounded-ctl bg-soft" />
        </div>
        <div class="flex animate-pulse flex-col gap-4">
          <div class="h-[72px] w-40 rounded-panel bg-soft" />
          <div class="mt-4 h-5 w-48 rounded-tag bg-soft" />
          <div class="h-4 w-96 max-w-full rounded-tag bg-soft" />
          <div class="h-4 w-80 max-w-full rounded-tag bg-soft" />
        </div>
      </div>
    </div>

    <!-- ошибка или нет статьи -->
    <div v-else-if="!entry" class="pt-[18px] pb-[72px]">
      <UiEmptyState v-if="error && error.statusCode !== 404" title="Не удалось загрузить статью">
        {{ error.statusMessage || error.message }}
        <template #actions>
          <UiButton icon="tabler:refresh" @click="refresh()">
            Повторить
          </UiButton>
        </template>
      </UiEmptyState>
      <UiEmptyState v-else title="Статья не найдена">
        Возможно, её удалили или объединили с другой. Попробуйте найти слово через поиск.
        <template #actions>
          <UiButton variant="primary" icon="tabler:search" :to="{ name: 'dict-jpn' }">
            К поиску
          </UiButton>
        </template>
      </UiEmptyState>
    </div>

    <div
      v-else
      :key="entry.wid"
      class="
        grid grid-cols-1 gap-y-8 pt-[18px] pb-[72px]
        min-[1000px]:grid-cols-[minmax(240px,290px)_minmax(0,1fr)] min-[1000px]:grid-rows-[auto_1fr] min-[1000px]:gap-x-12 min-[1000px]:gap-y-7
      "
    >
      <!-- слово и значения -->
      <article
        :aria-label="headword"
        class="min-w-0 min-[1000px]:col-start-2 min-[1000px]:row-start-1"
        :class="{ 'opacity-60': entry.status.isDeleted }"
      >
        <EntryHeadword :forms="forms" />

        <!-- на узком экране статус виден сразу под словом, полная колонка сведений — ниже значений -->
        <ul v-if="flags.length" class="m-0 mt-3 flex list-none flex-wrap gap-x-3 gap-y-1 p-0 text-[13px] font-bold min-[1000px]:hidden">
          <li v-for="flag in flags" :key="flag.label" class="inline-flex items-center gap-1" :class="flagText[flag.kind]">
            <Icon :name="flag.icon" size="15px" />
            {{ flag.label }}
          </li>
        </ul>

        <EntryMeanings :meanings="entry.meanings" :headword="headword" :show-lemmas="showLemmas" class="mt-7" />
      </article>

      <!-- сведения о статье -->
      <aside
        aria-label="Сведения о статье"
        class="min-w-0 border-t border-line pt-6 min-[1000px]:col-start-1 min-[1000px]:row-span-2 min-[1000px]:row-start-1 min-[1000px]:border-t-0 min-[1000px]:pt-0"
      >
        <EntryAside
          v-model:lemmas="showLemmas"
          :entry="entry"
          :kanji-text="mainText"
          :edits="summary"
          :edits-pending="edits.status.value === 'pending' || edits.status.value === 'idle'"
          @history="openHistory"
        />
      </aside>

      <!-- история, обсуждение, сателлиты, сканы -->
      <section
        id="entry-tabs"
        aria-label="История, обсуждение, сателлиты, сканы"
        class="min-w-0 scroll-mt-4 self-start min-[1000px]:col-start-2 min-[1000px]:row-start-2"
      >
        <UiTabBar v-model="tabModel" :items="tabs" label="Разделы статьи" id-base="entry" />

        <div :id="`entry-panel-${tab}`" role="tabpanel" :aria-labelledby="`entry-tab-${tab}`" tabindex="0" class="pt-3.5 focus-visible:outline-none">
          <EntryHistory
            v-if="tab === 'hist'"
            :summary="summary"
            :pending="edits.status.value === 'pending' || edits.status.value === 'idle'"
          />
          <EntrySatellites
            v-else-if="tab === 'sat'"
            :satellites="satellites.data.value ?? []"
            :pending="satellites.status.value === 'pending' || satellites.status.value === 'idle'"
          />
          <EntryScans
            v-else-if="tab === 'scan'"
            :pages="scans.data.value ?? []"
            :pending="scans.status.value === 'pending' || scans.status.value === 'idle'"
          />
          <LlmEntry v-else-if="tab === 'llm'" :wid="rawWid" />
        </div>
      </section>
    </div>
  </div>
</template>
