<script setup lang="ts">
interface Props {
  data: WeeklyUserStats
}

const props = defineProps<Props>()
const avatar = computed(() => useAvatar(props.data.user.avatar).href)

const { t } = useI18n()
</script>

<template>
  <UiBlock class="group" :hover="true">
    <div class="space-y-4 overflow-hidden">
      <NuxtLink :to="{ name: 'user-profile', params: { username: data.user.username } }" class="flex grow items-center gap-4 cursor-pointer">
        <img
          class="inline-flex size-12 items-center justify-center rounded-full border border-neutral-800 object-center shadow-md transition-colors group-hover:border-neutral-700 group-hover:hover:border-neutral-600"
          :src="avatar"
          :alt="data.user.username"
        >

        <div class="flex flex-col gap-1 leading-none">
          <span class="w-full truncate">
            {{ data.user.username }}
          </span>

          <span class="space-x-2 truncate">
            <small>
              {{ t('models.userRating.weekRating') }}
            </small>

            <span class="truncate text-violet-300">
              {{ data.stats.rating }}
            </span>
          </span>
        </div>
      </NuxtLink>

      <div class="grid grid-cols-2 gap-4">
        <div class="grid grid-cols-[auto_1fr] items-center gap-x-2 gap-y-1 leading-none">
          <WeeklyActivityLine :values="[data.stats.jpnNew]" :name="t('models.userRating.summaryWeekJapNew')">
            <template #value>
              {{ data.stats.jpnNew }}
            </template>
          </WeeklyActivityLine>

          <WeeklyActivityLine :values="[data.stats.jpnEdit]" :name="t('models.userRating.summaryWeekJapEdit')">
            <template #value>
              {{ data.stats.jpnEdit }}
            </template>
          </WeeklyActivityLine>
        </div>

        <div class="grid grid-cols-[auto_1fr] items-center gap-x-2 gap-y-1 leading-none">
          <WeeklyActivityLine :values="[data.stats.reviews]" :name="t('models.userRating.summaryWeekApproved')">
            <template #value>
              {{ data.stats.reviews }}
            </template>
          </WeeklyActivityLine>

          <WeeklyActivityLine :values="[data.stats.autoNew, data.stats.autoEdit]" :name="t('components.statistics.weeklyActiveUser.jpnAuto')">
            <template #value>
              {{ data.stats.autoNew }}<small class="text-neutral-300">/</small>{{ data.stats.autoEdit }}
            </template>
          </WeeklyActivityLine>
        </div>
      </div>
    </div>
  </UiBlock>
</template>
