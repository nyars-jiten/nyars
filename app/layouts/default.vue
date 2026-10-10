<template>
  <div class="flex min-h-dvh flex-col bg-bg font-ui text-[15.5px] leading-[1.55] text-ink">
    <a
      href="#content"
      class="sr-only rounded-ctl bg-acc px-3 py-2 font-semibold text-onacc focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50"
    >
      К содержимому
    </a>

    <AppHeader />

    <main id="content" class="mx-auto box-border w-full max-w-[1320px] flex-1 px-8 pt-2 max-[900px]:px-4">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>
