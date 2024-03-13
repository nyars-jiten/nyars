export const useNotificationStore = defineStore('notificationStore', () => {
  const notifications = ref<NyarsNotification[]>([])

  const createNotification = (message: string) => {
    if (notifications.value.length > 5) {
      notifications.value = []
    }
    const { ready } = useTimeout(5000, { controls: true })
    notifications.value.push({
      message,
      isHidden: ready
    })
  }
  return { notifications, createNotification }
})
