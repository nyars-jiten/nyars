<script setup lang="ts">
definePageMeta({
  name: 'Home',
})

useSeoMeta({
  title: 'НЯРС — японско-русский словарь',
  description: 'НЯРС — редактируемый японско-русский словарь. Статьи пишут и проверяют участники.',
})
</script>

<template>
  <div>
    <section class="mx-auto max-w-[820px] pt-14 pb-12 text-center max-sm:pt-8 max-sm:pb-8" aria-labelledby="home-title">
      <h1 id="home-title" class="m-0 text-[40px] leading-[1.15] normal-case font-extrabold tracking-tight max-sm:text-[30px]">
        Японско-русский словарь
      </h1>
      <p class="mx-auto mt-3 mb-0 max-w-[600px] text-[17px] text-muted">
        НЯРС — редактируемый японско-русский словарь. Статьи пишут и проверяют участники.
      </p>

      <SearchBar variant="hero" class="mt-[30px] text-left" />
      <HomeSearchHelp />
    </section>

    <div class="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] items-start gap-6 max-[900px]:grid-cols-[minmax(0,1fr)]">
      <div class="grid grid-cols-[minmax(0,1fr)] content-start gap-6">
        <HomeWordOfDay />
        <HomeRecentEdits />
      </div>
      <div class="grid grid-cols-[minmax(0,1fr)] content-start gap-6">
        <HomeStats />
        <!-- Скрыто пока что, не удалять -->
        <!-- <HomeDictionaries /> -->
        <HomeActiveUsers />
        <HomeHelp />
      </div>
    </div>
  </div>
</template>
