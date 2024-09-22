<script setup lang="ts">
  const { getWeeklyTopUsers } = useApi(jpnEntryRepository)
  const { data: users } = await useLazyAsyncData(
    'users',
    () => getWeeklyTopUsers(),
    {
      default: () => [],
      transform: (users) => {
        return users.map((user) => ({
          id: user.id,
          avatar: user.avatar,
          username: user.username,
          weekRating: user.userRating?.weekRating,
          jpnNew: user.userRating?.summary.week.japNew,
          jpnEdit: user.userRating?.summary.week.japEdit,
          jpnNewAuto: user.userRating?.summary.week.japNewAuto,
          jpnEditAuto: user.userRating?.summary.week.japEditAuto,
          approved: user.userRating?.summary.week.approved
        }))
      }
    }
  )
</script>

<template>
  <section class="flex flex-col gap-2 rounded-md border border-ns-gray-100 bg-white p-8 shadow-md dark:border-ns-gray-700 dark:bg-ns-gray-800">
    <div class="flex w-full justify-center text-xl font-medium">
      Рейтинг за 7 дней
    </div>
    <WeeklyActiveUser
      v-for="(user, index) of users"
      :key="user.id"
      v-bind="{ position: index+1, ...user }"
    />
  </section>
</template>
