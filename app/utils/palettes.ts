export const PALETTES = [
  { id: 'rice', label: 'Рисовая бумага', dark: false },
  { id: 'sumi', label: 'Суми', dark: true },
  { id: 'kanagawa', label: 'Kanagawa', dark: true },
] as const

export type Palette = typeof PALETTES[number]
export type PaletteId = Palette['id']

export const DEFAULT_PALETTE: PaletteId = 'sumi'

export function isPaletteId(value: unknown): value is PaletteId {
  return PALETTES.some(palette => palette.id === value)
}

/** Переменные палитры из palettes.css — для витрины и превью. */
export const PALETTE_TOKENS = [
  'bg',
  'surf',
  'field',
  'ink',
  'muted',
  'line',
  'acc',
  'onacc',
  'strong',
  'soft',
  'danger',
  'danger-soft',
  'ok',
  'ok-soft',
  'warn',
  'warn-soft',
  'dial',
  'dial-soft',
] as const
