<template>
  <div class="absolute bottom-full left-1/2 z-20 hidden pb-1 group-hover:block">
    <div class="flex items-end justify-end rounded-md border border-neutral-200 bg-white px-3 py-1.5 shadow-md dark:border-neutral-700 dark:bg-neutral-800">
      <span class="text-wrap pb-[4px] text-end leading-tight xl:text-nowrap xl:leading-[75%] normal-case text-base">
        <slot />
      </span>
    </div>
  </div>
</template>
