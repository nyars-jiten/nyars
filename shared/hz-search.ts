export interface HzFuriganaPair {
  word: string
  kana: string
}

export interface HzDeinflect {
  source: string
  target: string
  surface: string
  rule: string
}

/** Minimal token shape matching app/types Token fields we need. */
export interface HzToken {
  surface: string
  furigana: HzFuriganaPair[]
  base: string
  deinflect: HzDeinflect[]
  children?: HzToken[]
}

export interface PhraseTokenVm {
  surface: string
  reading: string
  hint: string
  searchable: boolean
  selected: boolean
  ph: boolean
}

export function headwordFontSize(word: string): string {
  const n = Array.from(word).length
  if (n <= 2)
    return '36px'
  if (n <= 4)
    return '31px'
  if (n <= 8)
    return '26px'
  if (n <= 12)
    return '23px'
  return '21px'
}

export function isSearchableToken(token: Pick<HzToken, 'base'>): boolean {
  return token.base.trim().length > 0
}

export function tokenReading(token: HzToken): string {
  return (token.furigana ?? []).map(f => f.kana).join('')
}

export function deinflectHint(token: HzToken): string {
  const target = token.deinflect?.[0]?.target
  return target ? `← ${target}` : ''
}

export function toPhraseTokens(
  tokens: HzToken[],
  opts: { ruby: boolean, selectedIndex: number },
): PhraseTokenVm[] {
  return tokens.map((token, i) => {
    const searchable = isSearchableToken(token)
    return {
      surface: token.surface,
      reading: opts.ruby ? tokenReading(token) : '',
      hint: deinflectHint(token),
      searchable,
      selected: i === opts.selectedIndex,
      ph: !searchable,
    }
  })
}
