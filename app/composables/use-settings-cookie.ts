import type { PaletteId } from '#shared/palette'
import {
  cookieToPalette,
  paletteToCookie,
  paletteToTheme,
} from '#shared/palette'

export function useSettingsCookie() {
  const cookie = useCookie<number>('settings', {
    maxAge: 400 * 24 * 60 * 60, // 400 days is Google Chrome limitation
    path: '/',
    watch: 'shallow',
    default: () => 1, // indigo — matches previous default dark look
  })

  function applyDocument(palette: PaletteId) {
    if (!import.meta.client)
      return
    const theme = paletteToTheme(palette)
    document.documentElement.className = theme
    document.documentElement.dataset.palette = palette
  }

  const getSettings = (): Settings => {
    const palette = cookieToPalette(cookie.value)
    return {
      palette,
      theme: paletteToTheme(palette),
    }
  }

  const setSettings = (settings: Pick<Settings, 'palette'> | Settings) => {
    const palette = settings.palette
    cookie.value = paletteToCookie(palette)
    applyDocument(palette)
  }

  const setPalette = (palette: PaletteId) => {
    setSettings({ palette })
  }

  return { getSettings, setSettings, setPalette, cookie }
}
