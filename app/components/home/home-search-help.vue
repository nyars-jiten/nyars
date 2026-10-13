<script setup lang="ts">
// «Как искать»: виды запросов с примерами; пример — ссылка на поиск.
const open = ref(false)
const searchStore = useSearchStore()
const bodyId = useId()

const items: { title: string, examples: { q: string, ja?: boolean }[] }[] = [
  { title: 'Японские слова и выражения', examples: [{ q: '遷都', ja: true }, { q: '井の中の蛙', ja: true }] },
  { title: 'Русские слова — поиск по переводам', examples: [{ q: 'разряжаться' }, { q: 'лягушка' }] },
  { title: 'Чтение кириллицей по Поливанову', examples: [{ q: 'сэйка' }, { q: 'ёсида' }] },
  { title: 'Японские эпохи и числа с переводом в годы', examples: [{ q: '昭和58', ja: true }, { q: '令和3年', ja: true }] },
  { title: 'Шаблон: «?» заменяет любой один знак', examples: [{ q: '事?所', ja: true }, { q: '?口', ja: true }] },
  { title: 'Шаблон по началу или концу слова: «*» заменяет любое число знаков', examples: [{ q: '*犬*', ja: true }, { q: '犬*', ja: true }] },
]
</script>

<template>
  <div class="mx-auto mt-3.5 max-w-[760px] text-left">
    <button
      type="button"
      class="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-ctl border-0 bg-transparent pr-2.5 pl-1.5 text-sm font-bold text-strong hover:bg-soft focus-visible:outline-2 focus-visible:outline-strong"
      :aria-expanded="open"
      :aria-controls="bodyId"
      @click="open = !open"
    >
      <Icon name="tabler:chevron-down" size="14px" class="transition-transform" :class="{ 'rotate-180': open }" />
      Как искать
    </button>

    <ul v-if="open" :id="bodyId" class="m-0 mt-2 list-none p-0">
      <li
        v-for="item in items"
        :key="item.title"
        class="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-1 border-t border-line px-0.5 py-2.5 first:border-t-0 max-sm:grid-cols-1"
      >
        <span class="text-[14.5px]">{{ item.title }}</span>
        <span class="flex flex-wrap justify-end gap-1.5 max-sm:justify-start">
          <NuxtLink
            v-for="ex in item.examples"
            :key="ex.q"
            :to="{ name: 'dict-jpn', query: { q: ex.q } }"
            :lang="ex.ja ? 'ja' : 'ru'"
            class="inline-flex h-7 items-center rounded-ctl bg-surf px-2.5 font-semibold whitespace-nowrap text-strong no-underline hover:bg-soft"
            :class="ex.ja ? 'font-jp text-[15.5px] font-bold' : 'text-sm'"
            @click.prevent="searchStore.push(ex.q)"
          >
            {{ ex.q }}
          </NuxtLink>
        </span>
      </li>
    </ul>
  </div>
</template>
