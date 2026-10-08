export const PALETTE_IDS = ['washi', 'cold', 'sakura', 'indigo'] as const

export type PaletteId = (typeof PALETTE_IDS)[number]

export interface PaletteTokens {
  bg: string
  surf: string
  ink: string
  muted: string
  line: string
  acc: string
  onacc: string
  strong: string
  soft: string
  sec: string
  secsoft: string
}

export interface PaletteDefinition {
  id: PaletteId
  name: string
  desc: string
  tokens: PaletteTokens
}

/** Cookie indices preserve legacy light=0 / dark=1. */
const COOKIE_BY_ID: Record<PaletteId, number> = {
  washi: 0,
  indigo: 1,
  cold: 2,
  sakura: 3,
}

const ID_BY_COOKIE: Record<number, PaletteId> = {
  0: 'washi',
  1: 'indigo',
  2: 'cold',
  3: 'sakura',
}

export const PALETTES: PaletteDefinition[] = [
  {
    id: 'washi',
    name: 'Васи и туман',
    desc: 'тёплая бумага + холодный акцент',
    tokens: {
      bg: '#F6F3EC',
      surf: '#FFFDF8',
      ink: '#1E2433',
      muted: '#5B6275',
      line: '#E3DDD0',
      acc: '#B7C7F7',
      onacc: '#1E2433',
      strong: '#34478A',
      soft: '#E9EEFC',
      sec: '#A63F2A',
      secsoft: '#F7E3DC',
    },
  },
  {
    id: 'cold',
    name: 'Холодная бумага',
    desc: 'нейтрально-холодная, второй акцент — глициния',
    tokens: {
      bg: '#F3F5F9',
      surf: '#FFFFFF',
      ink: '#1B2030',
      muted: '#58607A',
      line: '#DEE3EE',
      acc: '#B7C7F7',
      onacc: '#1B2030',
      strong: '#33458A',
      soft: '#EAF0FE',
      sec: '#7652A8',
      secsoft: '#EFE8F8',
    },
  },
  {
    id: 'sakura',
    name: 'Сакура',
    desc: 'тёпло-розовый фон, второй акцент — сакура',
    tokens: {
      bg: '#FAF6F4',
      surf: '#FFFFFF',
      ink: '#26202A',
      muted: '#665C68',
      line: '#EBE0E0',
      acc: '#B7C7F7',
      onacc: '#26202A',
      strong: '#3A4B8C',
      soft: '#ECF0FD',
      sec: '#A3445C',
      secsoft: '#F9E5EA',
    },
  },
  {
    id: 'indigo',
    name: 'Индиго-ночь',
    desc: 'тёмная тема с #B7C7F7 как акцентом и ссылками',
    tokens: {
      bg: '#131A2A',
      surf: '#1A2236',
      ink: '#E7EBF6',
      muted: '#A2ABC3',
      line: '#2B3550',
      acc: '#B7C7F7',
      onacc: '#131A2A',
      strong: '#B7C7F7',
      soft: '#263252',
      sec: '#F0A28F',
      secsoft: '#3A2A30',
    },
  },
]

export function cookieToPalette(value: number | string | null | undefined): PaletteId {
  // No cookie → indigo (legacy site default was dark)
  if (value === null || value === undefined || value === '')
    return 'indigo'
  const n = typeof value === 'string' ? Number.parseInt(value, 10) : value
  if (typeof n !== 'number' || Number.isNaN(n))
    return 'indigo'
  return ID_BY_COOKIE[n] ?? 'indigo'
}

export function paletteToCookie(id: PaletteId): number {
  return COOKIE_BY_ID[id]
}

export function paletteToTheme(id: PaletteId): 'light' | 'dark' {
  return id === 'indigo' ? 'dark' : 'light'
}

export function getPalette(id: PaletteId): PaletteDefinition {
  return PALETTES.find(p => p.id === id) ?? PALETTES[0]!
}
