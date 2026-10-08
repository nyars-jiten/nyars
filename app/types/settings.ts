import type { PaletteId } from '#shared/palette'

export interface Settings {
  palette: PaletteId
  /** Derived from palette for cal-heatmap and legacy dark: utilities. */
  theme: 'light' | 'dark'
}
