<script setup lang="ts">
import { version } from '~~/package.json'

definePageMeta({ layout: false })

useHead({
  title: 'UI kit',
  meta: [{ name: 'robots', content: 'noindex' }],
})

const { palette } = usePalette()

const sections = [
  { id: 'colors', title: 'Цвета' },
  { id: 'type', title: 'Типографика' },
  { id: 'logo', title: 'Логотип' },
  { id: 'buttons', title: 'Кнопки' },
  { id: 'tags', title: 'Метки' },
  { id: 'choice', title: 'Выбор' },
  { id: 'fields', title: 'Поля' },
  { id: 'nav', title: 'Навигация' },
  { id: 'people', title: 'Участники' },
  { id: 'card', title: 'Правка' },
  { id: 'misc', title: 'Прочее' },
]

// значения токенов читаем из CSS, чтобы витрина не расходилась с palettes.css
const tokenValues = ref<Record<string, string>>({})

function readTokens() {
  const style = getComputedStyle(document.documentElement)
  tokenValues.value = Object.fromEntries(PALETTE_TOKENS.map(t => [t, style.getPropertyValue(`--${t}`).trim().toUpperCase()]))
}

onMounted(readTokens)
watch(palette, () => nextTick(readTokens))

// демо-состояния
const period = ref('7d')
const chips = reactive({ created: true, fixed: false, deleted: false })
const dicts = ref(['jr', 'rj'])
const match = ref('exact')
const nick = ref('')
const reviewer = ref('any')
const dateFrom = ref('2026-09-10')
const dateTo = ref('2026-10-09')
const dict = ref('jr')
const statusFilter = ref('all')
const cardOpen = ref(true)
const diffMode = ref<'unified' | 'split'>('unified')
const comment = ref('')

const periodOptions = [
  { value: 'today', label: 'сегодня' },
  { value: '7d', label: '7 дней' },
  { value: '30d', label: '30 дней' },
  { value: 'all', label: 'всё время' },
]

const matchOptions = [
  { value: 'exact', label: 'Точное', hint: '蛙' },
  { value: 'start', label: 'Начало', hint: '蛙…' },
  { value: 'end', label: 'Конец', hint: '…蛙' },
  { value: 'any', label: 'Где угодно', hint: '…蛙…' },
]

const reviewerOptions = [
  { value: 'any', label: 'Любой' },
  { value: 'murasaki', label: 'Murasaki' },
  { value: 'kitsune', label: 'kitsune_ru' },
]

const dictItems: UiSideNavItem[] = [
  { id: 'jr', label: 'Японско-русский', count: 12 },
  { id: 'rj', label: 'Русско-японский β', count: 4 },
  { id: 'kanji', label: 'Кандзи', count: 2 },
]

const statusItems: UiSideNavItem[] = [
  { id: 'all', label: 'Все', count: 8, status: 'all' },
  { id: 'pend', label: 'Не проверено', count: 3, status: 'pend' },
  { id: 'ok', label: 'Принята', count: 4, status: 'ok' },
  { id: 'rej', label: 'Отклонена', count: 1, status: 'rej' },
]

const diffModeOptions = [
  { value: 'unified' as const, label: 'Построчно' },
  { value: 'split' as const, label: 'Рядом' },
]

const hunks: DiffHunk[] = [
  {
    title: 'Значения',
    range: 'стр. 4 → 4–5',
    plus: 38,
    minus: 22,
    rows: [
      { kind: 'del', old: 4, text: [{ text: '2. характер, ' }, { text: 'внимание, настроение', hl: true }] },
      { kind: 'add', new: 4, text: [{ text: '2. характер, ' }, { text: 'нрав', hl: true }] },
      { kind: 'add', new: 5, text: [{ text: '3. внимание; 4. настроение', hl: true }] },
    ],
    foldedAfter: 6,
  },
]

const leaders = [
  { place: 1, glyph: '狐', name: 'kitsune_ru', edits: '48 правок · 31 проверка', score: 412 },
  { place: 2, glyph: '紫', name: 'Murasaki', edits: '12 правок · 64 проверки', score: 388 },
]

// детерминированный «шум» для тепловой карты
const heat = Array.from({ length: 210 }, (_, i) => [0, 1, 1, 0, 2, 1, 3, 0, 4, 1, 2, 0][(i * 7 + (i % 5) * 3) % 12]!)
const heatClass = ['bg-heat-0', 'bg-heat-1', 'bg-heat-2', 'bg-heat-3', 'bg-heat-4']
</script>

<template>
  <div class="min-h-dvh bg-bg font-ui text-[15.5px] leading-[1.55] text-ink">
    <!-- верхняя панель витрины -->
    <div class="sticky top-0 z-10 max-[760px]:static flex flex-wrap items-center gap-x-[22px] gap-y-2.5 border-b border-line bg-bg px-8 py-3 max-[760px]:px-4">
      <NuxtLink to="/" class="text-[15px] font-bold text-ink no-underline hover:text-strong">
        НЯРС · UI kit
      </NuxtLink>

      <ThemeSwitch />

      <nav aria-label="Разделы" class="flex flex-wrap gap-x-4 gap-y-1 text-[13.5px] font-semibold">
        <a v-for="s in sections" :key="s.id" :href="`#${s.id}`" class="text-strong no-underline hover:underline hover:underline-offset-[3px]">{{ s.title }}</a>
      </nav>
    </div>

    <main class="mx-auto box-border max-w-[1320px] px-8 pb-[72px] max-[760px]:px-4">
      <header class="pt-[30px] pb-[26px]">
        <p class="m-0 text-[34px] leading-tight font-extrabold tracking-[-.015em]">
          UI kit
        </p>
        <p class="mt-2 mb-0 max-w-[820px] text-muted">
          Компоненты, из которых собираются страницы нового дизайна. Справа от названия — имя компонента
          и его параметры. Три палитры: Рисовая бумага, Суми и Kanagawa Dragon; скругления — «слегка скруглённые».
        </p>
      </header>

      <!-- Цвета -->
      <KitSection id="colors" title="Цвета" code="palettes.css" note="Значения меняются вместе с темой. В коде используются только эти переменные — как var(--strong) или как классы Tailwind: text-strong, bg-soft, border-line.">
        <div class="mt-2 grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-2.5">
          <div
            v-for="token in PALETTE_TOKENS"
            :key="token"
            class="grid grid-cols-[40px_1fr] grid-rows-[auto_auto] items-center gap-x-2.5 rounded-panel border border-line bg-surf p-2"
          >
            <span class="row-span-2 size-10 rounded-ctl shadow-[inset_0_0_0_1px_rgb(127_127_127/.25)]" :style="{ background: `var(--${token})` }" />
            <span class="font-mono text-[12.5px] font-bold">--{{ token }}</span>
            <span class="font-mono text-xs text-muted">{{ tokenValues[token] ?? '…' }}</span>
          </div>
        </div>
      </KitSection>

      <!-- Типографика -->
      <KitSection id="type" title="Типографика">
        <KitRow label="Заголовок страницы" code="Manrope 800 · 36">
          <p class="m-0 text-4xl leading-[1.15] font-extrabold tracking-[-.015em]">
            Правки
          </p>
        </KitRow>
        <KitRow label="Заголовок раздела" code="Manrope 800 · 22">
          <p class="m-0 text-[22px] font-extrabold">
            Активные участники
          </p>
        </KitRow>
        <KitRow label="Подпись раздела" code="UiCaption">
          <UiCaption class="mb-0">
            Фильтры
          </UiCaption>
        </KitRow>
        <KitRow label="Основной текст" code="Manrope 400 · 15.5">
          <p class="m-0 max-w-[560px]">
            Изменения статей во всех словарях: кто предложил, кто проверил и что именно поменялось.
          </p>
        </KitRow>
        <KitRow label="Второстепенный" code="text-muted · 13.5">
          <p class="m-0 text-[13.5px] text-muted">
            сегодня, 14:20 · Японско-русский
          </p>
        </KitRow>
        <KitRow label="Заглавное слово" code=".hw + ruby · Zen Kaku / Zen Maru">
          <p class="hw m-0 text-[34px]" lang="ja">
            <ruby>蛙<rt>かえる</rt></ruby>
          </p>
        </KitRow>
        <KitRow label="Вертикальное слово" code=".vhw">
          <p class="vhw m-0 mt-0.5" lang="ja">
            <span class="k">夕</span><span class="r">ゆう</span><span class="k">立</span><span class="r">だち</span>
          </p>
        </KitRow>
        <KitRow label="Японский текст" code="font-jp">
          <p class="m-0 font-jp text-[17px]" lang="ja">
            夕立が来そうだから、早く帰ろう。
          </p>
        </KitRow>
      </KitSection>

      <!-- Логотип и шапка -->
      <KitSection id="logo" title="Логотип и шапка" code="AppLogo">
        <KitRow label="Логотип" code="AppLogo">
          <AppLogo />
        </KitRow>
        <KitRow label="Знак" code=":wordmark=false · 64 · 32 · 16">
          <span class="inline-flex items-end gap-[18px]">
            <AppLogo :wordmark="false" :size="64" />
            <AppLogo :wordmark="false" :size="32" />
            <AppLogo :wordmark="false" :size="16" />
          </span>
        </KitRow>

        <KitRow label="Шапка" code="AppHeader · гость или участник — по входу">
          <div class="box-border w-full rounded-panel border border-line bg-bg">
            <AppHeader class="max-w-none!" />
          </div>
        </KitRow>
        <KitRow label="Строка поиска" code="SearchBar · история, подсказки, 筆, 部 · «/» — фокус">
          <SearchBar class="w-full max-w-[640px]" />
        </KitRow>
      </KitSection>

      <!-- Кнопки -->
      <KitSection id="buttons" title="Кнопки" code="UiButton · UiIconButton" note="Было шесть видов (.btn, .cbtn, .nbtn, .fbtn, .morebtn, .ibtn/.chev/.hbtn) — стало два компонента.">
        <KitRow label="Вид" code="variant: primary · default · danger · link">
          <UiButton variant="primary">
            Принять
          </UiButton>
          <UiButton>Сбросить фильтры</UiButton>
          <UiButton variant="danger">
            Отклонить
          </UiButton>
          <UiButton variant="link">
            Развернуть все
          </UiButton>
          <UiButton disabled>
            Недоступна
          </UiButton>
        </KitRow>
        <KitRow label="Размер" code="size: sm 34 · md 40 · lg 44">
          <UiButton size="sm">
            Маленькая
          </UiButton>
          <UiButton>Обычная</UiButton>
          <UiButton variant="primary" size="lg">
            Крупная
          </UiButton>
        </KitRow>
        <KitRow label="С иконкой" code="icon · to">
          <UiButton variant="primary" size="lg" icon="tabler:plus" to="/dict/jpn/new">
            Создать статью <span class="font-jp" lang="ja">蛙鳴</span>
          </UiButton>
          <UiButton size="sm" icon="tabler:plus" to="/dict/jpn/new">
            Новая статья
          </UiButton>
          <UiButton variant="link" icon="tabler:chevron-down">
            Ещё 4 значения
          </UiButton>
        </KitRow>
        <KitRow label="Со счётчиком" code="count · #icon">
          <UiButton :count="3">
            <template #icon>
              <span class="font-jp text-base" aria-hidden="true">篩</span>
            </template>
            Фильтры
          </UiButton>
        </KitRow>
        <KitRow label="Кнопка-значок" code="UiIconButton · md 40 · sm 28 · pressed · expanded">
          <UiIconButton glyph="筆" label="Рукописный ввод" />
          <UiIconButton glyph="部" label="Ключи" />
          <UiIconButton glyph="篩" label="Фильтры" pressed />
          <UiIconButton icon="tabler:chevron-right" label="Развернуть" :expanded="false" />
          <UiIconButton icon="tabler:chevron-right" label="Свернуть" expanded />
          <UiIconButton icon="tabler:chevron-right" label="Свернуть раздел" size="sm" expanded />
        </KitRow>
      </KitSection>

      <!-- Метки и статусы -->
      <KitSection id="tags" title="Метки и статусы" code="UiTag · UiStatus" note=".kt, .modtag и .tag.ghost стали вариантами UiTag; .st, .sb и .sd — одним UiStatus в двух видах и двух размерах.">
        <KitRow label="Заливка" code="tone: accent · danger · neutral">
          <UiTag>N2</UiTag>
          <UiTag tone="danger">
            редкое
          </UiTag>
          <UiTag tone="neutral">
            сущ.
          </UiTag>
        </KitRow>
        <KitRow label="Контур" code="outline · size md · icon">
          <UiTag outline tone="neutral" size="md">
            новая статья
          </UiTag>
          <UiTag outline tone="danger" size="md">
            удаление
          </UiTag>
          <UiTag outline size="md" icon="tabler:pencil">
            исправлена модератором
          </UiTag>
        </KitRow>
        <KitRow label="Статус" code="status: pend · ok · work · rej">
          <UiStatus status="pend" />
          <UiStatus status="ok" />
          <UiStatus status="work" />
          <UiStatus status="rej" />
        </KitRow>
        <KitRow label="Статус, малый" code="size: sm">
          <UiStatus status="pend" size="sm">
            не проверено
          </UiStatus>
          <UiStatus status="ok" size="sm">
            принята
          </UiStatus>
          <UiStatus status="work" size="sm">
            доработка
          </UiStatus>
          <UiStatus status="rej" size="sm">
            отклонена
          </UiStatus>
        </KitRow>
        <KitRow label="Статус, точка" code="variant: dot">
          <UiStatus status="all" variant="dot" />
          <UiStatus status="pend" variant="dot" />
          <UiStatus status="ok" variant="dot" />
          <UiStatus status="work" variant="dot" />
          <UiStatus status="rej" variant="dot" />
        </KitRow>
      </KitSection>

      <!-- Выбор -->
      <KitSection id="choice" title="Выбор" code="UiSegmented · UiChip · UiCheckbox · UiRadioTiles" note="Правило: один из нескольких — сегменты; несколько из 2–4 коротких — чипы; несколько из длинного списка или со счётчиками — флажки.">
        <KitRow label="Один из нескольких" code="UiSegmented">
          <UiSegmented v-model="period" :options="periodOptions" label="Период" />
        </KitRow>
        <KitRow label="Несколько — коротких" code="UiChip · v-model:pressed">
          <div class="flex flex-wrap gap-1.5">
            <UiChip v-model:pressed="chips.created">
              новая статья
            </UiChip>
            <UiChip v-model:pressed="chips.fixed">
              исправление
            </UiChip>
            <UiChip v-model:pressed="chips.deleted">
              удаление
            </UiChip>
          </div>
        </KitRow>
        <KitRow label="Несколько — список" code="UiCheckbox · 5+ или со счётчиками">
          <div class="w-[280px]">
            <UiCheckbox v-model="dicts" value="jr" :count="1204">
              Японско-русский
            </UiCheckbox>
            <UiCheckbox v-model="dicts" value="rj" :count="312">
              Русско-японский β
            </UiCheckbox>
            <UiCheckbox v-model="dicts" value="kanji" :count="86">
              Кандзи
            </UiCheckbox>
          </div>
        </KitRow>
        <KitRow label="Совпадение 2×2" code="UiRadioTiles">
          <UiRadioTiles v-model="match" :options="matchOptions" legend="Совпадение" class="w-[280px]" />
        </KitRow>
      </KitSection>

      <!-- Поля -->
      <KitSection id="fields" title="Поля" code="UiInput · UiTextarea · UiSelect · UiDateRange · UiFilterGroup">
        <KitRow label="Текст" code="UiInput">
          <UiInput v-model="nick" placeholder="Ник участника" class="max-w-[280px]" />
        </KitRow>
        <KitRow label="Многострочный" code="UiTextarea">
          <UiTextarea v-model="comment" placeholder="Комментарий к решению" class="max-w-[420px]" />
        </KitRow>
        <KitRow label="Список" code="UiSelect">
          <UiSelect v-model="reviewer" :options="reviewerOptions" class="max-w-[280px]" />
        </KitRow>
        <KitRow label="Период" code="UiDateRange">
          <UiDateRange v-model:from="dateFrom" v-model:to="dateTo" class="w-[280px]" />
        </KitRow>
        <KitRow label="Группа фильтра" code="UiFilterGroup">
          <UiFilterGroup title="Проверяющий" class="w-[280px]">
            <UiSelect v-model="reviewer" :options="reviewerOptions" />
          </UiFilterGroup>
        </KitRow>
      </KitSection>

      <!-- Навигация -->
      <KitSection id="nav" title="Навигация" code="UiSideNav · UiCount · ThemeSwitch · UiDropdown">
        <KitRow label="Боковое меню" code="ссылки или кнопки · точка статуса — по желанию">
          <div class="flex flex-wrap items-start gap-2.5">
            <UiSideNav v-model="dict" :items="dictItems" label="Словари" class="w-[260px]" />
            <UiSideNav v-model="statusFilter" :items="statusItems" label="Статус" class="w-[260px]" />
          </div>
        </KitRow>
        <KitRow label="Счётчик" code="UiCount · текст · pill">
          <UiCount :value="1204" />
          <UiCount :value="3" pill />
        </KitRow>
        <KitRow label="Тема" code="ThemeSwitch = UiSegmented · ThemeMenu">
          <ThemeSwitch />
          <ThemeMenu />
        </KitRow>
        <KitRow label="Выпадающее меню" code="UiDropdown · UiMenuItem">
          <UiDropdown align="start">
            <template #trigger="{ toggle, attrs }">
              <UiButton icon="tabler:chevron-down" v-bind="attrs" @click="toggle">
                Действия
              </UiButton>
            </template>
            <UiMenuItem icon="tabler:pencil">
              Редактировать
            </UiMenuItem>
            <UiMenuItem icon="tabler:history">
              История правок
            </UiMenuItem>
            <hr class="mx-1 my-1.5 border-line">
            <UiMenuItem icon="tabler:x" danger>
              Удалить статью
            </UiMenuItem>
          </UiDropdown>
        </KitRow>
      </KitSection>

      <!-- Участники -->
      <KitSection id="people" title="Участники" code="UiAvatar · UiPerson · UiMeta">
        <KitRow label="Аватар" code="size: lg 32 · md 28 · sm 22 · пустой">
          <UiAvatar text="花" size="lg" />
          <UiAvatar text="花" />
          <UiAvatar name="Murasaki" size="sm" />
          <UiAvatar size="sm" />
        </KitRow>
        <KitRow label="Автор и проверяющий" code="UiMeta + UiPerson">
          <UiMeta>
            <UiPerson name="yuki_s" avatar />
            <UiPerson name="kitsune_ru" action="принял" />
          </UiMeta>
        </KitRow>
        <KitRow label="Активные участники" code="список">
          <ol class="m-0 w-[340px] list-none p-0">
            <li
              v-for="u in leaders"
              :key="u.name"
              class="grid grid-cols-[18px_32px_minmax(0,1fr)_auto] items-center gap-2.5 border-t border-line py-2 first:border-t-0"
            >
              <span class="text-right text-[12.5px] font-extrabold text-muted tabular-nums">{{ u.place }}</span>
              <UiAvatar :text="u.glyph" size="lg" />
              <span class="grid min-w-0">
                <NuxtLink :to="`/users/${u.name}`" class="truncate text-[14.5px] font-bold text-ink no-underline hover:text-strong">{{ u.name }}</NuxtLink>
                <span class="text-[12.5px] text-muted">{{ u.edits }}</span>
              </span>
              <span class="text-base font-extrabold text-strong tabular-nums">{{ u.score }}</span>
            </li>
          </ol>
        </KitRow>
      </KitSection>

      <!-- Карточка правки -->
      <KitSection id="card" title="Карточка правки" code="EditCard · DiffView · DiffStat" note="Вариант E: без заливки, рамка и полоса цвета статуса слева. Кнопки модератора — UiButton, стрелки — UiIconButton.">
        <KitRow label="Свёрнутая">
          <div class="w-full max-w-[900px]">
            <EditCard status="ok" headword="蛙" date="сегодня, 14:20">
              <template #meta>
                <span>Японско-русский</span>
                <DiffStat :plus="64" :minus="0" />
                <UiPerson name="Murasaki" avatar />
                <UiPerson name="kitsune_ru" action="принял" />
              </template>
            </EditCard>
          </div>
        </KitRow>

        <KitRow label="Раскрытая" code="v-model:open">
          <div class="w-full max-w-[900px]">
            <EditCard v-model:open="cardOpen" status="pend" headword="気" date="сегодня, 10:05">
              <template #meta>
                <span>Японско-русский</span>
                <DiffStat :plus="212" :minus="148" />
                <UiPerson name="hoshi" avatar />
              </template>

              <p class="m-0 text-[15px]">
                «Значения „характер“ и „внимание“ были смешаны; разделены по словарю.»
                <span class="text-[13.5px] text-muted">· источник: Большой японско-русский словарь, т. 1</span>
              </p>

              <div class="flex flex-wrap items-center gap-x-3.5 gap-y-2.5">
                <UiSegmented v-model="diffMode" :options="diffModeOptions" label="Вид сравнения" />
                <UiChip>Вся статья</UiChip>
              </div>

              <DiffView :hunks="hunks" :mode="diffMode" />

              <div class="flex flex-wrap gap-2.5">
                <UiButton variant="primary">
                  Принять
                </UiButton>
                <UiButton>Вернуть на доработку</UiButton>
                <UiButton variant="danger">
                  Отклонить
                </UiButton>
              </div>
            </EditCard>
          </div>
        </KitRow>
      </KitSection>

      <!-- Прочее -->
      <KitSection id="misc" title="Состояния и прочее">
        <KitRow label="Пустой поиск" code="UiEmptyState">
          <UiEmptyState class="max-w-[760px]">
            <template #title>
              В словаре нет статьи <span class="ml-1 font-jp text-2xl" lang="ja">蛙鳴</span>
            </template>
            Проверьте написание или посмотрите другие словари. Если слова действительно нет — добавьте его:
            статья появится в поиске после проверки.
            <template #actions>
              <UiButton variant="primary" size="lg" icon="tabler:plus" to="/dict/jpn/new">
                Создать статью <span class="font-jp" lang="ja">蛙鳴</span>
              </UiButton>
              <a href="#" class="text-sm font-semibold text-strong no-underline hover:underline hover:underline-offset-[3px]">Как оформлять статьи</a>
            </template>
          </UiEmptyState>
        </KitRow>

        <KitRow label="Строка после списка" code=".addl">
          <p class="m-0 max-w-[760px] border-t border-line pt-3.5 text-sm text-muted">
            Нет нужного слова или значения?
            <NuxtLink to="/dict/jpn/new" class="text-strong no-underline hover:underline hover:underline-offset-[3px]">
              Создайте статью
            </NuxtLink>
            или предложите правку в существующей.
          </p>
        </KitRow>

        <KitRow label="Тепловая карта" code="bg-heat-0…4">
          <div class="overflow-x-auto">
            <div class="grid w-max grid-flow-col grid-cols-[repeat(30,11px)] grid-rows-[repeat(7,11px)] gap-[3px]" role="img" aria-label="Активность">
              <i v-for="(level, i) in heat" :key="i" class="block size-[11px] rounded-[3px]" :class="heatClass[level]" />
            </div>
            <p class="mt-2 mb-0 inline-flex items-center gap-[3px] text-[11.5px] text-muted" aria-hidden="true">
              меньше
              <i v-for="c in heatClass" :key="c" class="mx-px block size-[11px] rounded-[3px]" :class="c" />
              больше
            </p>
          </div>
        </KitRow>

        <KitRow label="Сведения о сборке" code=".bi">
          <span class="inline-flex flex-wrap items-center gap-x-2 text-[12.5px] text-muted tabular-nums">
            <a href="https://github.com/nyars-jiten/nyars" target="_blank" class="text-muted no-underline hover:text-strong">v{{ version }}</a>
            <span class="text-line" aria-hidden="true">·</span>
            <span>Nuxt · Tailwind</span>
          </span>
        </KitRow>
      </KitSection>
    </main>
  </div>
</template>
