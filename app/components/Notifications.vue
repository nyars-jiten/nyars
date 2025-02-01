<script lang="ts" setup>
import { tv } from 'tailwind-variants'

const { notifications } = storeToRefs(useNotificationStore())

const msgStyles = tv({
  variants: {
    border: {
      [NyarsNotificationType.Error]: 'border-rose-500',
      [NyarsNotificationType.Warning]: 'border-amber-500',
      [NyarsNotificationType.Info]: 'border-sky-500',
      [NyarsNotificationType.Success]: 'border-emerald-500',
    },
    text: {
      [NyarsNotificationType.Error]: 'text-rose-500',
      [NyarsNotificationType.Warning]: 'text-amber-500',
      [NyarsNotificationType.Info]: 'text-sky-500',
      [NyarsNotificationType.Success]: 'text-emerald-500',
    },
  },
})

const msgIcons = {
  [NyarsNotificationType.Error]: 'ic:baseline-error-outline',
  [NyarsNotificationType.Warning]: 'ic:baseline-warning-amber',
  [NyarsNotificationType.Info]: 'ic:outline-info',
  [NyarsNotificationType.Success]: 'ic:baseline-check-circle-outline',
}
</script>

<template>
  <div v-if="notifications.length > 0" class="fixed bottom-4 end-4 z-[100] w-60 sm:w-72">
    <div class="flex flex-col gap-2">
      <div v-for="notification of notifications" :key="notification.message">
        <div
          v-if="!notification.isHidden"
          class="flex min-h-12 justify-start rounded-r-md border-l-4 bg-neutral-100 p-2 shadow dark:bg-neutral-700"
          :class="msgStyles.variants.border[notification.type]"
        >
          <div class="flex w-6 shrink-0 items-center justify-center sm:w-12">
            <Icon :name="msgIcons[notification.type]" class="!m-0 text-[24px]" :class="msgStyles.variants.text[notification.type]" size="1.5rem" />
          </div>
          <div class="flex items-center justify-center text-center">
            {{ notification.message }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
