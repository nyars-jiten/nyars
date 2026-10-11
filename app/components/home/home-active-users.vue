<script setup lang="ts">
// Активные участники за 7 дней по рейтингу.
const { getWeeklyStats } = useUserData()
const { getUserAvatarUrl } = useUserProfile()
const { data } = getWeeklyStats()

const users = computed(() => (data.value?.stats ?? []).slice(0, 6).map((item, index) => {
  const s = item.stats
  const created = s.jpnNew + s.kanjiNew + s.rusNew
  const edited = s.jpnEdit + s.kanjiEdit + s.rusEdit
  const parts = [
    created ? `${created} ${pluralRu(created, 'новая статья', 'новые статьи', 'новых статей')}` : '',
    `${edited} ${pluralRu(edited, 'исправление', 'исправления', 'исправлений')}`,
  ].filter(Boolean)
  return {
    place: index + 1,
    id: item.user.id,
    name: item.user.username,
    avatar: item.user.avatar ? getUserAvatarUrl(item.user.avatar).href : undefined,
    detail: parts.join(' · '),
    rating: s.rating,
  }
}))
</script>

<template>
  <section v-if="users.length" class="rounded-panel bg-surf px-[26px] pt-6 pb-[26px]" aria-labelledby="home-users">
    <UiCaption id="home-users" as="h2" class="!mb-0">
      Активные участники · 7 дней
    </UiCaption>
    <ol class="m-0 mt-2.5 list-none p-0">
      <li
        v-for="user in users"
        :key="user.id"
        class="grid grid-cols-[18px_32px_minmax(0,1fr)_auto] items-center gap-2.5 border-t border-line py-2 first:border-t-0"
      >
        <span class="text-right text-[12.5px] font-extrabold text-muted tabular-nums">{{ user.place }}</span>
        <UiAvatar :name="user.name" :src="user.avatar" size="lg" />
        <span class="grid min-w-0">
          <NuxtLink
            :to="{ name: 'users-username', params: { username: user.name } }"
            class="truncate text-[14.5px] font-bold text-ink no-underline hover:text-strong"
          >{{ user.name }}</NuxtLink>
          <span class="text-[12.5px] text-muted">{{ user.detail }}</span>
        </span>
        <span class="text-base font-extrabold text-strong tabular-nums" title="Рейтинг за неделю">{{ user.rating }}</span>
      </li>
    </ol>
  </section>
</template>
