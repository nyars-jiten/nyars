export const useUserStore = defineStore('userStore', () => {
  const user = ref<User|null>(null)

  return { user }
})
