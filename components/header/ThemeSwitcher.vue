<script setup lang="ts">
  const { getSettings, setSettings } = useSettingsCookie()

  const toggleTheme = () => {
    if (getSettings().theme === 'light') {
      setSettings({ theme: 'dark' })
      return
    }
    setSettings({ theme: 'light' })
  }
</script>

<template>
  <button
    type="button"
    class="flex items-center justify-center gap-2 rounded-md p-1.5 text-ns-gray-500 duration-150 ease-in-out hover:bg-ns-gray-100 dark:text-ns-gray-300 dark:hover:bg-ns-gray-700"
    @click="toggleTheme"
  >
    <IconWhiteBalanceSunny v-if="getSettings().theme === 'light'" class="!m-0 text-2xl" />
    <IconWeatherNight v-else class="!m-0 text-2xl" />
    <span>{{ $t('components.header.profileMenu.themeSwitcher') }}</span>
  </button>
</template>
