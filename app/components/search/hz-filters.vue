<script setup lang="ts">
const sort = ref('rel')
const match = ref('exact')
const jlpt = ref<Record<string, boolean>>({ все: true })
const tags = ref<Record<string, boolean>>({})
const freqFrom = ref(0)
const freqTo = ref(40)
const withExamples = ref(true)
const hideUnverified = ref(false)
const searchTranslations = ref(false)

const jlptLabels = ['все', 'N5', 'N4', 'N3', 'N2', 'N1', 'вне']
const tagLabels = ['пословица', 'ёдзидзюкуго', 'мед.', 'книжн.', 'разг.', 'вежл.', 'устар.', 'атэдзи']

function reset() {
  sort.value = 'rel'
  match.value = 'exact'
  jlpt.value = { все: true }
  tags.value = {}
  freqFrom.value = 0
  freqTo.value = 40
  withExamples.value = true
  hideUnverified.value = false
  searchTranslations.value = false
}

function toggleMap(map: Record<string, boolean>, key: string) {
  map[key] = !map[key]
}
</script>

<template>
  <aside id="hz-filters" aria-label="Фильтры поиска" class="w-full max-w-[280px] flex-[1_1_250px]">
    <div class="mb-1.5 flex items-baseline justify-between">
      <p class="hz-cap m-0!">
        Фильтры
      </p>
      <button
        type="button"
        class="cursor-pointer border-0 bg-transparent font-inherit text-[13px] text-strong"
        @click="reset"
      >
        Сбросить
      </button>
    </div>

    <p class="mb-3 text-[12.5px] text-muted">
      Скоро — серверные фильтры пока не подключены
    </p>

    <div class="space-y-0 divide-y divide-line border-t border-line">
      <div class="py-4">
        <label class="hz-cap" for="hz-srt">Сортировка</label>
        <select id="hz-srt" v-model="sort" class="hz-sel" disabled title="скоро">
          <option value="rel">
            По релевантности
          </option>
          <option value="freq">
            По частотности
          </option>
          <option value="len">
            По длине заголовка
          </option>
          <option value="gojuon">
            По алфавиту (годзюон)
          </option>
        </select>
      </div>

      <div class="py-4">
        <p class="hz-cap">
          Совпадение
        </p>
        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="m in ([['exact', 'точное'], ['start', 'начало'], ['contains', 'вхождение'], ['pattern', 'шаблон']] as const)"
            :key="m[0]"
            type="button"
            class="hz-chip"
            :aria-pressed="match === m[0]"
            disabled
            title="скоро"
            @click="match = m[0]"
          >
            {{ m[1] }}
          </button>
        </div>
      </div>

      <div class="py-4">
        <p class="hz-cap">
          Часть речи
        </p>
        <label class="flex min-h-7.5 items-center gap-2.5 text-[14.5px] text-muted">
          <input type="checkbox" checked disabled title="скоро"> существительное
        </label>
        <label class="flex min-h-7.5 items-center gap-2.5 text-[14.5px] text-muted">
          <input type="checkbox" checked disabled title="скоро"> выражение, пословица
        </label>
        <label class="flex min-h-7.5 items-center gap-2.5 text-[14.5px] text-muted">
          <input type="checkbox" checked disabled title="скоро"> глагол
        </label>
        <label class="flex min-h-7.5 items-center gap-2.5 text-[14.5px] text-muted">
          <input type="checkbox" checked disabled title="скоро"> прилагательное
        </label>
      </div>

      <div class="py-4">
        <p class="hz-cap">
          JLPT
        </p>
        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="l in jlptLabels"
            :key="l"
            type="button"
            class="hz-chip min-w-11 justify-center"
            :aria-pressed="!!jlpt[l]"
            disabled
            title="скоро"
            @click="toggleMap(jlpt, l)"
          >
            {{ l }}
          </button>
        </div>
      </div>

      <div class="py-4">
        <p class="hz-cap">
          Частотность — ранг
        </p>
        <div class="flex justify-between text-sm font-semibold">
          <span>от № {{ freqFrom }}</span>
          <span>до № {{ freqTo }}</span>
        </div>
        <label class="mt-2.5 flex items-center gap-2 text-[12.5px] text-muted">
          от<input v-model.number="freqFrom" type="range" min="0" max="100" class="flex-1" disabled title="скоро">
        </label>
        <label class="flex items-center gap-2 text-[12.5px] text-muted">
          до<input v-model.number="freqTo" type="range" min="0" max="100" class="flex-1" disabled title="скоро">
        </label>
      </div>

      <div class="py-4">
        <p class="hz-cap">
          Пометы
        </p>
        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="g in tagLabels"
            :key="g"
            type="button"
            class="hz-chip"
            :aria-pressed="!!tags[g]"
            disabled
            title="скоро"
            @click="toggleMap(tags, g)"
          >
            {{ g }}
          </button>
        </div>
      </div>

      <div class="py-4">
        <p class="hz-cap">
          Длина заголовка, знаков
        </p>
        <div class="flex items-center gap-2">
          <select class="hz-sel" disabled title="скоро" aria-label="от">
            <option>1</option>
            <option>2</option>
            <option>4</option>
          </select>
          <span class="text-muted">—</span>
          <select class="hz-sel" disabled title="скоро" aria-label="до">
            <option>16+</option>
            <option>8</option>
            <option>4</option>
          </select>
        </div>
      </div>

      <div class="py-4">
        <label class="flex min-h-7.5 items-center gap-2.5 text-[14.5px] text-muted">
          <input v-model="withExamples" type="checkbox" disabled title="скоро"> только с примерами
        </label>
        <label class="flex min-h-7.5 items-center gap-2.5 text-[14.5px] text-muted">
          <input v-model="hideUnverified" type="checkbox" disabled title="скоро"> скрыть непроверенные
        </label>
        <label class="flex min-h-7.5 items-center gap-2.5 text-[14.5px] text-muted">
          <input v-model="searchTranslations" type="checkbox" disabled title="скоро"> искать и в переводах
        </label>
      </div>
    </div>
  </aside>
</template>
