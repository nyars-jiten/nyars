import { ref } from 'vue'
import type { UserTheme } from './types/user-theme'

export const setTheme = (theme: UserTheme) => {
  localStorage.setItem('user-theme', theme)
  userTheme.value = theme
  document.documentElement.className = theme
}

const getTheme = (): UserTheme => {
  return localStorage.getItem('user-theme') as UserTheme
}

export const toggleTheme = (): void => {
  const activeTheme = localStorage.getItem('user-theme')
  if (!activeTheme) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  } else if (activeTheme === 'light') {
    setTheme('dark')
  } else {
    setTheme('light')
  }
}

export const updateTheme = () => {
  setTheme(userTheme.value)
}

const getMediaPreference = (): UserTheme => {
  const hasDarkPreference = window.matchMedia('(prefers-color-scheme: dark)').matches
  if (hasDarkPreference) {
    return 'dark'
  } else {
    return 'light'
  }
}

export const userTheme = ref<UserTheme>(getTheme() || getMediaPreference())
