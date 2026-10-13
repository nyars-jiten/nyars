<script setup lang="ts">
// «Слово дня»: статья из подборки на клиенте (wordOfDayWid), вертикальный заголовок, два значения и пример.
const today = new Date()
const wid = wordOfDayWid(today)
const label = wordOfDayLabel(today)

const { getEntry } = useJpnEntries()
const { data: entry } = getEntry(wid)

const main = computed(() => entry.value ? headwordForms(entry.value)[0] : undefined)
// длинные слова в столбик не помещаются — они остаются в строку с фуриганой
const vertical = computed(() => (main.value?.text.length ?? 0) <= 4)
const jlpt = computed(() => entry.value ? entryJlpt(entry.value) : null)
const pos = computed(() => entry.value ? entryPosGroups(entry.value)[0]?.label : undefined)
const senses = computed(() => entry.value ? entrySenses(entry.value).slice(0, 2) : [])
const example = computed(() => {
  const sense = senses.value.find(s => s.examples.length)
  const ex = sense?.examples[0]
  return ex && main.value
    ? { sentence: markHeadword(ex.sentence, main.value.text), translation: ex.translation }
    : null
})
const to = computed(() => entry.value
  ? { name: 'dict-jpn-wid' as const, params: { wid: `${entry.value.wid}-${entry.value.title}` } }
  : undefined)
</script>

<template>
  <section v-if="entry && main" class="rounded-panel bg-surf px-[26px] pt-6 pb-[26px]" aria-labelledby="home-wod">
    <UiCaption id="home-wod" as="h2" class="!mb-0">
      Слово дня · {{ label }}
    </UiCaption>

    <div class="mt-3.5 grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-8 gap-y-2 max-sm:grid-cols-1">
      <p v-if="vertical" class="vhw m-0 mt-0.5" lang="ja" :aria-label="`${main.text}, ${main.pairs.map(p => p.kana || p.word).join('')}`">
        <template v-for="(pair, i) in main.pairs" :key="i">
          <span class="k" aria-hidden="true">{{ pair.word }}</span>
          <span class="r" aria-hidden="true">{{ pair.kana !== pair.word ? pair.kana : '' }}</span>
        </template>
      </p>
      <p v-else class="hw m-0 text-[44px]" lang="ja">
        <ruby v-for="(pair, i) in main.pairs" :key="i">{{ pair.word }}<rt>{{ pair.kana !== pair.word ? pair.kana : '' }}</rt></ruby>
      </p>

      <div class="min-w-0">
        <div class="mt-2 flex flex-wrap gap-1.5">
          <UiTag v-if="jlpt">
            {{ jlpt }}
          </UiTag>
          <UiTag v-if="pos" tone="neutral" outline>
            {{ pos }}
          </UiTag>
        </div>

        <div class="mt-2 flex flex-col gap-[5px]">
          <EntrySense
            v-for="(sense, i) in senses"
            :key="i"
            :sense="sense"
            :number="String(i + 1)"
            :headword="main.text"
            :numbered="senses.length > 1"
            compact
            :show-examples="false"
          />
        </div>

        <EntryExample v-if="example" :sentence="example.sentence" :translation="example.translation" class="mt-3" />

        <NuxtLink v-if="to" :to="to" class="mt-3.5 inline-flex text-sm font-bold text-strong no-underline hover:underline hover:underline-offset-[3px]">
          Открыть статью →
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
