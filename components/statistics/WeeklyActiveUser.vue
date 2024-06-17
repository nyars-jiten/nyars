<script setup lang="ts">
  interface Props {
    position: number
    avatar: string
    username: string
    weekRating: number | undefined
    jpnNew: number | undefined
    jpnEdit: number | undefined
    jpnNewAuto: number | undefined
    jpnEditAuto: number | undefined
    approved: number | undefined
  }

  defineProps<Props>()
</script>

<template>
  <div class="flex w-full select-text items-center justify-center gap-5 rounded-md p-1.5">
    <div class="flex grow items-center sm:grow-0">
      <div class="mr-2 flex h-full w-9 items-center justify-center text-2xl">
        {{ position }}
      </div>
      <img
        class="mr-4 inline-flex size-12 items-center justify-center rounded-full bg-ns-gray-200 object-center"
        :src="useAvatar(avatar).href"
        :alt="username"
      >
      <div class="flex min-w-32 max-w-96 flex-col sm:w-40">
        <span class="w-full truncate">{{ username }}</span>
        <span>{{ $t('models.userRating.weekRating') }}: {{ weekRating }}</span>
      </div>
    </div>
    <div class="flex">
      <div class="hidden w-40 flex-col border-l border-ns-gray-200 pl-1.5 dark:border-ns-gray-600 sm:flex">
        <span>{{ $t('models.userRating.summaryWeekJapNew') }}: {{ jpnNew }}</span>
        <span>{{ $t('models.userRating.summaryWeekJapEdit') }}: {{ jpnEdit }}</span>
      </div>
      <div class="hidden w-52 flex-col border-l border-ns-gray-200 pl-1.5 dark:border-ns-gray-600 md:flex">
        <span>{{ $t('models.userRating.summaryWeekApproved') }}: {{ approved }}</span>
        <span>{{ $t('components.statistics.weeklyActiveUser.jpnAuto') }}: {{ jpnNewAuto }}/{{ jpnEditAuto }}</span>
      </div>
    </div>
  </div>
</template>
