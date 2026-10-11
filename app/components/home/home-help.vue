<script setup lang="ts">
// «Нужна помощь»: сколько статей не проверено и сколько правок ждут проверки.
const config = useRuntimeConfig()
const { getWeeklyStats } = useUserData()
const { data: stats } = getWeeklyStats()

// правок на проверке считаем по одной странице; больше лимита — «100+»
const LIMIT = 100
const { data: pending } = useEditsData().getEdits({ s: EDIT_STATUS_QUERY.pend.join(','), n: LIMIT })

const fmt = (n: number) => n.toLocaleString('ru-RU')

const items = computed(() => {
  const list: { n: string, label: string }[] = []
  if (stats.value) {
    const unreviewed = stats.value.site.jpn - stats.value.site.jpnRev
    if (unreviewed > 0)
      list.push({ n: fmt(unreviewed), label: pluralRu(unreviewed, 'статья не проверена', 'статьи не проверены', 'статей не проверено') })
  }
  const waiting = pending.value?.length ?? 0
  if (waiting > 0) {
    list.push({
      n: waiting >= LIMIT ? `${LIMIT}+` : fmt(waiting),
      label: pluralRu(waiting, 'правка ждёт проверки', 'правки ждут проверки', 'правок ждут проверки'),
    })
  }
  return list
})
</script>

<template>
  <section class="rounded-panel bg-surf px-[26px] pt-6 pb-[26px]" aria-labelledby="home-help">
    <UiCaption id="home-help" as="h2" class="!mb-0">
      Нужна помощь
    </UiCaption>
    <p class="m-0 mt-2 text-[14.5px]">
      Словарь пополняют читатели. Даже одна правка — уже вклад.
    </p>
    <ul v-if="items.length" class="my-2.5 mb-[18px] grid list-none gap-3.5 p-0">
      <li v-for="item in items" :key="item.label" class="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-3">
        <b class="text-[22px] font-extrabold text-strong tabular-nums">{{ item.n }}</b>
        <span class="text-sm">{{ item.label }}</span>
      </li>
    </ul>
    <div class="mt-4 flex flex-wrap gap-2">
      <UiButton variant="primary" :to="{ name: 'edits', query: { status: 'pend' } }">
        Проверять правки
      </UiButton>
      <UiButton v-if="config.public.discordUrl" :to="config.public.discordUrl as string" external target="_blank">
        Как помогать
      </UiButton>
    </div>
  </section>
</template>
