<script setup lang="ts">
// Сводка по словарю: всего статей и проверено, с изменением за неделю.
const { getWeeklyStats } = useUserData()
const { data } = getWeeklyStats()

const rows = computed(() => {
  const site = data.value?.site
  if (!site)
    return []
  return [
    { label: 'Всего статей', value: site.jpn, delta: site.jpn - site.jpnPrev },
    { label: 'Проверено', value: site.jpnRev, delta: site.jpnRev - site.jpnRevPrev },
  ]
})

const fmt = (n: number) => n.toLocaleString('ru-RU')
</script>

<template>
  <section class="rounded-panel bg-surf px-[26px] pt-6 pb-[26px]" aria-label="Статистика словаря">
    <dl class="m-0 grid gap-3">
      <template v-if="rows.length">
        <div v-for="row in rows" :key="row.label" class="grid gap-0.5">
          <dt class="text-[12.5px] font-semibold text-muted">
            {{ row.label }}
          </dt>
          <dd class="m-0 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
            <span class="text-[26px] leading-tight font-extrabold tracking-tight whitespace-nowrap tabular-nums">{{ fmt(row.value) }}</span>
            <span v-if="row.delta !== 0" class="text-[13px] font-bold" :class="row.delta > 0 ? 'text-strong' : 'text-muted'">
              {{ row.delta > 0 ? '+' : '−' }}{{ fmt(Math.abs(row.delta)) }} за неделю
            </span>
          </dd>
        </div>
      </template>
      <template v-else>
        <div v-for="i in 2" :key="i" class="grid gap-2">
          <div class="h-3.5 w-24 rounded-tag bg-soft" />
          <div class="h-7 w-40 rounded-tag bg-soft" />
        </div>
      </template>
    </dl>
  </section>
</template>
