<script setup lang="ts">
const { getWeeklyStats } = useApi(userRepository)

const { data } = await useLazyAsyncData(
  'users',
  () => Promise.resolve(getWeeklyStats()),
  {
    default: () => [],
  },
)
</script>

<template>
  <section class="space-y-4">
    <h1 class="text-center text-2xl max-lg:pb-4">
      Рейтинг за 7 дней
    </h1>

    <section class="max-lg:grid max-lg:grid-cols-2 max-lg:gap-4 max-md:block max-md:space-y-4 lg:space-y-4">
      <WeeklyActiveUser v-for="(stat, index) of data" v-bind="{ position: index + 1 }" :key="stat.user.id" :data="stat" />
    </section>
  </section>
</template>
