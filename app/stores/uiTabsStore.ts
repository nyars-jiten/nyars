export const useUiTabsStore = defineStore('uiTabsStore', () => {
  const activeTab = ref('')

  const setActiveTab = (name: string) => (activeTab.value = name)

  const checkActiveTab = (name: string) => (activeTab.value === name)

  return {
    checkActiveTab,
    setActiveTab,
  }
})
