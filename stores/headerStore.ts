export const useHeaderStore = defineStore('headerStore', () => {
  const showHamburgerMenu = ref(false)

  const toggleHamburgerMenu = () => {
    showHamburgerMenu.value = !showHamburgerMenu.value

    if (showHamburgerMenu.value) {
      document.documentElement.classList.add('overflow-hidden')
    }
    else {
      document.documentElement.classList.remove('overflow-hidden')
    }
  }

  const closeHamburgerMenu = () => {
    showHamburgerMenu.value = false
    document.documentElement.classList.remove('overflow-hidden')
  }
  return {
    showHamburgerMenu,
    toggleHamburgerMenu,
    closeHamburgerMenu,
  }
})
