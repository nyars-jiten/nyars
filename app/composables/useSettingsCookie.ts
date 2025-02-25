export function useSettingsCookie() {
  const cookie = useCookie('settings', {
    maxAge: 400 * 24 * 60 * 60, // 400 days is Google Chrome limitation
    path: '/',
    watch: 'shallow',
    default: () => 0,
  })

  enum Theme {
    light,
    dark,
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
