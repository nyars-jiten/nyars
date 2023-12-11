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
    class="rounded-md bg-neutral-100 p-1.5 capitalize text-ns-gray-500 duration-150 ease-in-out hover:opacity-75 dark:bg-ns-gray-700 dark:text-ns-gray-300"
    @click="toggleTheme"
  >
    <span v-if="getSettings().theme === 'light'">
      <nuxt-icon class="text-2xl" name="whiteBalanceSunny" />
    </span>
    <span v-else>
      <nuxt-icon class="text-2xl" name="weatherNight" />
    </span>
  </button>
</template>
