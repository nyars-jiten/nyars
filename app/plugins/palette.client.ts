// Пока пользователь сам не выбрал палитру (нет cookie `palette`), она следует за системной темой.
export default defineNuxtPlugin(() => {
  const cookie = useCookie<string | null>('palette')
  const media = window.matchMedia('(prefers-color-scheme: light)')

  const apply = () => {
    if (isPaletteId(cookie.value))
      return
    // напрямую в useState: палитра остаётся «не выбранной», cookie не пишется
    useState<PaletteId>('palette').value = systemPalette(media.matches)
  }
  apply()
  media.addEventListener('change', apply)
})
