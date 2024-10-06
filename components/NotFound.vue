<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="flex min-h-full select-text flex-col items-center justify-center gap-4">
    <span class="text-5xl text-ns-500">404</span>
    <span>{{ t('pages.notFound.noEntry') }}</span>
    <img
      src="@/assets/img/404.png"
      alt="404-image"
      class="size-72"
    >
  </div>
</template>
