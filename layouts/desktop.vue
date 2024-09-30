<script lang="ts" setup>
</script>

<template>
  <div class="flex min-h-dvh flex-col space-y-8 p-4">
    <div class="flex items-center justify-between gap-x-[25%]">
      <div>
        logo
      </div>

      <Search />

      <div>user menu</div>
    </div>

    <div class="grid grow grid-cols-[auto_1fr] items-start gap-8">
      <LayoutMenu />

      <slot></slot>
    </div>
  </div>
</template>
