<template>
  <div class="flex min-h-full select-text flex-col items-center justify-center gap-4">
    <span class="text-5xl text-ns-500">404</span>
    <span>{{ $t('pages.notFound.noEntry') }}</span>
    <img
      src="@/assets/img/error.webp"
      alt="error-image"
      class="h-48 w-48"
    >
  </div>
</template>
