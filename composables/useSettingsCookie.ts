export const useSettingsCookie = () => {
  const cookie = useNyarsCookie<number>('settings', {
    default: () => 0
  })

  enum Theme {
    light,
    dark
  }

  const getSettings: () => Settings = () => {
    return { theme: Theme[cookie.value] } as Settings
  }

  const setSettings = (settings: Settings) => {
    cookie.value = Theme[settings.theme].valueOf()
    document.documentElement.className = settings.theme
  }

  return { getSettings, setSettings }
}
