<script setup lang="ts">
// Словари с числом статей.
const { getWeeklyStats } = useUserData()
const { data } = getWeeklyStats()

const NuxtLink = resolveComponent('NuxtLink')
const fmt = (n?: number) => n === undefined ? '' : n.toLocaleString('ru-RU')

const dicts = computed(() => [
  { name: 'Японско-русский', count: fmt(data.value?.site.jpn), hint: 'основной словарь: слова, выражения, пословицы', to: { name: 'dict-jpn' as const } },
  { name: 'Кандзи', count: data.value?.site.kanji ? fmt(data.value.site.kanji) : '', hint: 'знаки, чтения, ключи и составные слова' },
  { name: 'Русско-японский β', count: data.value?.site.rus ? fmt(data.value.site.rus) : '', hint: 'бета-версия, пополняется' },
  { name: 'Сканы', count: '', hint: 'страницы бумажных словарей с привязкой к статьям' },
])
</script>

<template>
  <section class="rounded-panel bg-surf px-[26px] pt-6 pb-[26px]" aria-labelledby="home-dicts">
    <UiCaption id="home-dicts" as="h2" class="!mb-0">
      Словари
    </UiCaption>
    <ul class="m-0 mt-2.5 list-none p-0">
      <li v-for="dict in dicts" :key="dict.name" class="border-t border-line first:border-t-0">
        <component
          :is="dict.to ? NuxtLink : 'div'"
          v-bind="dict.to ? { to: dict.to } : {}"
          class="group grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-0.5 py-3 text-ink no-underline"
        >
          <span class="text-[15.5px] font-bold" :class="dict.to && 'group-hover:text-strong'">{{ dict.name }}</span>
          <span class="text-[13.5px] text-muted tabular-nums">{{ dict.count }}</span>
          <span class="col-span-full text-[13.5px] text-muted">{{ dict.hint }}</span>
        </component>
      </li>
    </ul>
  </section>
</template>
