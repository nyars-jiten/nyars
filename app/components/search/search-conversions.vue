<script setup lang="ts">
// Пересчёт японских единиц и летоисчисления: 3寸 ≈ 9,1 см, 昭和58年 = 1983
const props = defineProps<{
  data: JpnSearchResponse
}>()

const { t } = useI18n()

const units = computed(() => props.data.unitConversions ?? [])
const eras = computed(() => props.data.eraConversions ?? [])
const format = (n: number) => n.toLocaleString('ru-RU', { maximumFractionDigits: 3 })
</script>

<template>
  <section v-if="units.length || eras.length" aria-label="Пересчёт" class="flex flex-wrap gap-2.5">
    <p
      v-for="(conv, i) in units"
      :key="`u${i}`"
      class="m-0 inline-flex items-baseline gap-2 rounded-panel bg-surf px-4 py-2.5 text-lg"
    >
      <span lang="ja" class="font-jp">{{ format(conv.srcValue) }}<ruby>{{ conv.unit }}<rt class="font-jm text-[11px] text-muted">{{ conv.unitReading }}</rt></ruby></span>
      <span class="text-muted">≈</span>
      <b class="font-bold">{{ format(conv.resValue) }} {{ t(`pages.search.unit.${conv.metricUnit}`) }}</b>
    </p>
    <p
      v-for="(conv, i) in eras"
      :key="`e${i}`"
      class="m-0 inline-flex items-baseline gap-2 rounded-panel bg-surf px-4 py-2.5 text-lg"
    >
      <span lang="ja" class="font-jp"><ruby>{{ conv.srcEra }}<rt class="font-jm text-[11px] text-muted">{{ conv.eraReading }}</rt></ruby>{{ conv.srcYear }}年</span>
      <span class="text-muted">=</span>
      <b class="font-bold">{{ conv.gregorianYear }} г.</b>
    </p>
  </section>
</template>
