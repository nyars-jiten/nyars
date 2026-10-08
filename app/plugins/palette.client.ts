export default defineNuxtPlugin(() => {
  const { getSettings, setSettings } = useSettingsCookie()
  // Re-apply cookie so hydration matches SSR and legacy cookies stay valid.
  setSettings(getSettings())
})
