<script setup lang="ts">
// Приглашение в Discord-сообщество; без ссылки в настройках карточка не показывается.
const config = useRuntimeConfig()
</script>

<template>
  <section v-if="config.public.discordUrl" class="rounded-panel bg-surf px-[26px] pt-6 pb-[26px]" aria-labelledby="home-discord">
    <UiCaption id="home-discord" as="h2" class="!mb-0">
      Сообщество
    </UiCaption>
    <p class="m-0 mt-2 text-[14.5px]">
      Заходите на наш сервер в Discord — там можно будет спросить непонятные моменты, а также внести предложения по сайту.
    </p>
    <UiButton :to="config.public.discordUrl as string" external target="_blank" icon="ic:baseline-discord" class="mt-4">
      Присоединиться
    </UiButton>
  </section>
</template>
