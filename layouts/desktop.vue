<script lang="ts" setup>

</script>

<template>
  <div class="min-h-dvh p-4">
    <div>
      <input
        type="text"
        class="w-full rounded-md border-none bg-neutral-600 p-4 text-center text-neutral-900 shadow-md transition-colors hover:bg-neutral-300 focus:bg-neutral-300 focus:outline-none"
        spellcheck="false"
        autocomplete="off"
      >
    </div>

    <div class="grid grid-cols-[auto_1fr] gap-4">
      <div class="space-y-4 py-4">
        <button type="button" v-for="x of 10" :key="x" class="flex items-center gap-2 leading-none">
          <Icon name="uil:github" />

          <span>
            menu item {{ x }}
          </span>
        </button>
      </div>

      <slot></slot>
    </div>
  </div>
</template>
