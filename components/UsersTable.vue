<script setup lang="ts">
  const api = useApi()
  const { data: users } = await useLazyAsyncData(
    'users',
    () => api.jpnEntryRepository.getWeeklyTopUsers(),
    {
      default: () => [],
      transform: (users) => {
        return users.map((user) => ({
          id: user.id,
          avatar: user.avatar,
          username: user.username,
          weekRating: user.userRating?.weekRating,
          jpnNew: user.userRating?.summary.week.japNew,
          jpnEdit: user.userRating?.summary.week.japEdit
        }))
      }
    }
  )
</script>

<template>
  <section class="flex flex-wrap border border-ns-gray-100 bg-white p-8 shadow-md dark:border-ns-gray-700 dark:bg-ns-gray-800 md:rounded-md">
    <div v-for="user of users" :key="user.id" class="flex p-4 md:w-1/3">
      <img
        class="inline-flex size-12 items-center justify-center rounded-full bg-ns-gray-200 object-center"
        :src="useAvatar(user.avatar).href"
        :alt="user.username"
      >
      <div class="grow pl-6">
        <h2 class="mb-2 text-lg font-medium">
          {{ user.username }}
        </h2>
        <div class="grid grid-cols-[1fr_min-content] gap-x-4">
          <div>{{ $t('models.userRating.weekRating') }}</div>
          <div>{{ user.weekRating }}</div>

          <div>{{ $t('models.userRating.summaryWeekJapNew') }}</div>
          <div>{{ user.jpnNew }}</div>

          <div>{{ $t('models.userRating.summaryWeekJapEdit') }}</div>
          <div>{{ user.jpnEdit }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
