/**
 * Текущая палитра сайта. Хранится в cookie, поэтому сервер сразу отдаёт
 * <html data-theme="..."> и страница не мигает при загрузке.
 */
export function usePalette() {
  const cookie = useCookie<string | null>('palette', {
    maxAge: 400 * 24 * 60 * 60, // 400 days is Google Chrome limitation
    path: '/',
    sameSite: 'lax',
  })

  // общее состояние, чтобы все переключатели на странице были синхронны
  // без cookie (пользователь не выбирал) — по системной теме: на сервере из подсказки клиента, дальше plugins/palette.client.ts
  const state = useState<PaletteId>('palette', () => {
    if (isPaletteId(cookie.value))
      return cookie.value
    const hint = import.meta.server ? useRequestHeader('sec-ch-prefers-color-scheme') : undefined
    return systemPalette(hint === 'light')
  })

  const palette = computed<PaletteId>({
    get: () => state.value,
    set: (value) => {
      state.value = value
      cookie.value = value
    },
  })

  const current = computed<Palette>(() => PALETTES.find(p => p.id === palette.value) ?? PALETTES[1])

  return { palette, current, palettes: PALETTES }
}
