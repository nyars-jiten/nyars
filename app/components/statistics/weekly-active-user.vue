<script setup lang="ts">
interface Props {
  data: WeeklyUserStats
}

const props = defineProps<Props>()
const { getUserAvatarUrl } = useUserProfile()
const avatar = computed(() => getUserAvatarUrl(props.data.user.avatar).href)

const { t } = useI18n()
</script>

<template>
  <UiBlock class="group" :hover="true">
    <div class="overflow-hidden">
      <NuxtLink :to="{ name: 'users-username', params: { username: data.user.username } }">
        <div class="flex flex-row space-x-2">
          <img
            class="size-6 rounded-full"
            :src="avatar"
            :alt="data.user.username"
          >

          <span class="w-full truncate">
            {{ data.user.username }}
          </span>
        </div>
      </NuxtLink>

      <div class="space-x-2 truncate">
        <span class="text-sm">
          {{ t('models.userRating.weekRating') }}
        </span>

        <span class="truncate text-violet-300">
          {{ data.stats.rating }}
        </span>
      </div>

      <div class="space-x-2 truncate">
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

      <!-- <div class="grid grid-cols-2 gap-4">
        <div class="grid grid-cols-[auto_1fr] items-center gap-x-2 gap-y-1 leading-none">
          <WeeklyActivityLine :values="[data.stats.jpnNew]" :name="t('models.userRating.summaryWeekJapNew')">
            <template #value>
              {{ data.stats.jpnNew }}
            </template>
          </WeeklyActivityLine>
        </div>

        <div class="grid grid-cols-[auto_1fr] items-center gap-x-2 gap-y-1 leading-none">
          <WeeklyActivityLine :values="[data.stats.jpnEdit]" :name="t('models.userRating.summaryWeekJapEdit')">
            <template #value>
              {{ data.stats.jpnEdit }}
            </template>
          </WeeklyActivityLine>
        </div>
      </div> -->
    </div>
  </UiBlock>
</template>
