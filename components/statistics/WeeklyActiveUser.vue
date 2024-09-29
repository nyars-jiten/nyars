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

  const props = defineProps<Props>()
  const avatar = computed(() => useAvatar(props.avatar).href)
</script>

<template>
  <section class="space-y-4 outline outline-1 shadow-md rounded-md outline-neutral-800 p-4">
    <div class="flex grow items-center sm:grow-0">
      <img
        class="mr-4 inline-flex size-12 items-center justify-center rounded-full bg-ns-gray-200 object-center"
        :src="avatar"
        :alt="username"
      >

      <div class="flex min-w-32 max-w-96 flex-col sm:w-40">
        <span class="w-full truncate">{{ username }}</span>
        <small>{{ $t('models.userRating.weekRating') }} <span class="text-violet-300">{{ weekRating }}</span></small>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="grid grid-cols-[auto_1fr] gap-x-2">
        <span class="">  {{ $t('models.userRating.summaryWeekJapNew') }}</span> <span class="text-amber-300">{{ jpnNew }}</span>
        <span class="">  {{ $t('models.userRating.summaryWeekJapEdit') }}</span> <span class="text-amber-300">{{ jpnEdit }}</span>
      </div>

      <div class="grid grid-cols-[auto_1fr] gap-x-2">
        <span class="">  {{ $t('models.userRating.summaryWeekApproved') }}</span> <span class="text-amber-300">{{ approved }}</span>
        <span class="">  {{ $t('components.statistics.weeklyActiveUser.jpnAuto') }}</span> <span class="text-amber-300">{{ jpnNewAuto }}/{{ jpnEditAuto }}</span>
      </div>
    </div>
  </section>
</template>
