<script setup lang="ts">
  // interface Emits {
  //   (e: 'onSelected'): void;
  // }

  // const emit = defineEmits<Emits>()

  const searchStore = useSearchStore()
</script>

<template>
  <div
    v-show="searchStore.mode === 'words'"
    class="invisible absolute inset-x-0 top-[calc(100%)] z-10 overflow-hidden rounded-b-md bg-ns-gray-100 shadow-xl hover:visible peer-focus:visible dark:bg-ns-gray-700"
  >
    <button
      type="button"
      class="block min-w-full border-t border-ns-gray-300 px-4 py-2 text-left hover:bg-white dark:border-ns-gray-600 dark:bg-ns-gray-700 dark:hover:bg-ns-gray-600"
    >
      あ
    </button>
  </div>
</template>
