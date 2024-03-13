<script lang="ts" setup>
  const { notifications } = storeToRefs(useNotificationStore())
</script>

<template>
  <div v-if="notifications.length > 0" class="fixed bottom-4 end-4 z-[100] w-60 sm:w-72">
    <div class="flex flex-col gap-2">
      <div v-for="notification of notifications" :key="notification.message">
        <div
          v-if="!notification.isHidden"
          class="flex min-h-12 justify-start rounded-r-md border-l-4 border-red-500 bg-ns-gray-100 p-2 shadow dark:bg-ns-gray-700"
        >
          <div class="flex w-6 shrink-0 items-center justify-center sm:w-12">
            <IconError class="!m-0 text-[24px] text-red-500" />
          </div>
          <div class="flex items-center justify-center text-center">
            {{ notification.message }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
