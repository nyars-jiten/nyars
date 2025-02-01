<script setup lang="ts">
const { getWeeklyStats } = useUserRepo()

const { data } = getWeeklyStats()

const jpnDiff = computed(() => (data.value?.site?.jpn ?? 0) - (data.value?.site?.jpnPrev ?? 0))
const jpnRevDiff = computed(() => (data.value?.site?.jpnRev ?? 0) - (data.value?.site?.jpnRevPrev ?? 0))
const jpnRevPercentage = computed(() => ((((data.value?.site?.jpnRev ?? 0) / (data.value?.site?.jpn ?? 0)) || 0) * 100).toFixed(3))
</script>

<template>
  <div>
    <div v-if="data" class="space-y-4">
      <h1 class="text-center text-2xl max-lg:pb-4">
        Статистика
      </h1>
      <section>
        <div>
          Всего статей: {{ data.site.jpn }}
          <span v-if="jpnDiff !== 0" :class="{ 'text-emerald-400': jpnDiff > 0, 'text-red-400': jpnDiff < 0 }">
            {{ jpnDiff >= 0 ? `+${jpnDiff}` : jpnDiff }}
          </span>
        </div>
        <div>
          Проверено: {{ data.site.jpnRev }}
          <span v-if="jpnRevDiff !== 0" :class="{ 'text-emerald-400': jpnRevDiff > 0, 'text-red-400': jpnRevDiff < 0 }">
            {{ jpnRevDiff > 0 ? `+${jpnRevDiff}` : jpnRevDiff }}
          </span>
          <span class="ml-2">
            ({{ jpnRevPercentage }}%)
          </span>
        </div>
      </section>
    </div>

    <hr class="border-neutral-800 max-lg:hidden my-4">

    <!-- <div>
      comments
    </div>

    <hr class="border-neutral-800 max-lg:hidden"> -->

    <div v-if="data" class="space-y-4">
      <h1 class="text-center text-2xl max-lg:pb-4">
        Рейтинг за 7 дней
      </h1>

      <section class="max-lg:grid max-lg:grid-cols-2 max-lg:gap-4 max-md:block max-md:space-y-4 lg:space-y-4">
        <WeeklyActiveUser v-for="(stat, index) of data.stats" v-bind="{ position: index + 1 }" :key="stat.user.id" :data="stat" />
      </section>
    </div>
  </div>
</template>
