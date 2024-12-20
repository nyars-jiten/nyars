<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="flex min-h-full select-text flex-col items-center justify-center gap-4">
    <span class="text-5xl text-ns-500">{{ t('pages.development.title') }}</span>
    <span>{{ t('pages.development.text') }}</span>
    <img
      src="@/assets/img/under-construction-1000.png"
      alt="under-dev-image"
      class="size-1/4"
    >
  </div>
</template>
