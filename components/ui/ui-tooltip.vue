<template>
  <div class="absolute bottom-full left-1/2 z-20 hidden -translate-x-1/2 pb-1 group-hover:block">
    <div class="flex items-center justify-center rounded-md border border-ns-gray-200 bg-white px-3 py-1.5 shadow-md dark:border-ns-gray-700 dark:bg-ns-gray-800">
      <span class="text-wrap pb-[4px] text-center leading-tight xl:text-nowrap xl:leading-[75%]">
        <slot />
      </span>
    </div>
  </div>
</template>
