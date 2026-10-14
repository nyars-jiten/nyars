<script setup lang="ts">
// Значения статьи, сгруппированные по частям речи: «существительное 名詞» и пронумерованные значения.
// Номера сквозные по всей статье, если сервер не прислал свои (sense.ix).
const props = defineProps<{
  meanings: Meaning[]
  headword: string
  showLemmas?: boolean
}>()

const groups = computed(() => {
  let counter = 0
  return props.meanings.map(meaning => ({
    heading: posHeading(meaning.tags),
    ja: posJapanese(meaning.tags),
    note: meaning.note,
    senses: meaning.senses.map(sense => ({ sense, number: String(++counter) })),
  }))
})
</script>

<template>
  <div class="flex flex-col gap-7">
    <section v-for="(group, g) in groups" :key="g" :aria-label="group.heading || undefined">
      <h2 v-if="group.heading" class="m-0 mb-2 flex flex-wrap items-baseline gap-x-2 text-xs leading-snug font-bold tracking-[.08em] text-muted uppercase">
        {{ group.heading }}
        <span v-if="group.ja" lang="ja" class="font-jp text-[12.5px] font-normal tracking-[.04em] normal-case opacity-85">{{ group.ja }}</span>
      </h2>

      <EntrySense
        v-for="item in group.senses"
        :key="item.number"
        :sense="item.sense"
        :number="item.number"
        :headword="headword"
        :show-lemmas="showLemmas"
        break-line
        class="py-2"
      />

      <p v-if="group.note.length" class="m-0 grid grid-cols-[22px_minmax(0,1fr)] gap-x-1.5 text-[14.5px] text-muted">
        <span aria-hidden="true">※</span>
        <span><Content :data="group.note" /></span>
      </p>
    </section>
  </div>
</template>
