export const useNotificationStore = defineStore('notificationStore', () => {
  const notifications = ref<NyarsNotification[]>([])

  const createNotification = (message: string, type?: NyarsNotificationType) => {
    if (notifications.value.length > 5) {
      notifications.value = []
    }
    if (!type) {
      type = NyarsNotificationType.Info
    }
    const { ready } = useTimeout(5000, { controls: true })
    notifications.value.push({
      message,
      type,
      isHidden: ready,
    })

    // cleanup
    notifications.value = notifications.value.filter(notification => !notification.isHidden)
  }
  return { notifications, createNotification }
})
