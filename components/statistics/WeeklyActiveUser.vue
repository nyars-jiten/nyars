<script setup lang="ts">
interface Props {
  position: number
  avatar: string
  username: string
  weekRating: number
  jpnNew: number
  jpnEdit: number
  jpnNewAuto: number
  jpnEditAuto: number
  approved: number
}

const props = defineProps<Props>()
const avatar = computed(() => useAvatar(props.avatar).href)

const { t } = useI18n()
</script>

<template>
  <UiBlock class="group" :hover="true">
    <div class="space-y-4 overflow-hidden">
      <div class="flex grow items-center gap-4">
        <img
          class="inline-flex size-12 items-center justify-center rounded-full border border-neutral-800 object-center shadow-md transition-colors group-hover:border-neutral-700 group-hover:hover:border-neutral-600"
          :src="avatar"
          :alt="username"
        >

        <div class="flex flex-col gap-1 leading-none">
          <span class="w-full truncate">
            {{ username }}
          </span>

          <span class="space-x-2 truncate">
            <small>
              {{ t('models.userRating.weekRating') }}
            </small>

            <span class="truncate text-violet-300">
              {{ weekRating }}
            </span>
          </span>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="grid grid-cols-[auto_1fr] items-center gap-x-2 gap-y-1 leading-none">
          <WeeklyActivityLine :values="[jpnNew]" :name="t('models.userRating.summaryWeekJapNew')">
            <template #value>
              {{ jpnNew }}
            </template>
          </WeeklyActivityLine>

          <WeeklyActivityLine :values="[jpnEdit]" :name="t('models.userRating.summaryWeekJapEdit')">
            <template #value>
              {{ jpnEdit }}
            </template>
          </WeeklyActivityLine>
        </div>

        <div class="grid grid-cols-[auto_1fr] items-center gap-x-2 gap-y-1 leading-none">
          <WeeklyActivityLine :values="[approved]" :name="t('models.userRating.summaryWeekApproved')">
            <template #value>
              {{ approved }}
            </template>
          </WeeklyActivityLine>

          <WeeklyActivityLine :values="[jpnNewAuto, jpnEditAuto]" :name="t('components.statistics.weeklyActiveUser.jpnAuto')">
            <template #value>
              {{ jpnNewAuto }}<small class="text-neutral-300">/</small>{{ jpnEditAuto }}
            </template>
          </WeeklyActivityLine>
        </div>
      </div>
    </div>
  </UiBlock>
</template>
