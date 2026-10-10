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
  const state = useState<PaletteId>('palette', () => isPaletteId(cookie.value) ? cookie.value : DEFAULT_PALETTE)

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
