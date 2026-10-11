// Разбор статьи (EntryJp) для выдачи поиска: заголовок с фуриганой, частотность,
// JLPT, части речи, пометы и значения. Чистые функции — используются и фильтрами.

export type JlptLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1'
export const JLPT_LEVELS: readonly JlptLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1']

export interface HeadwordForm {
  pairs: FuriganaPair[]
  /** написание без чтения: 言う */
  text: string
}

const KATAKANA_ONLY = /^[゠-ヿー]+$/
const HAS_KANJI = /[㐀-鿿豈-﫿]/

/**
 * Формы заголовка: первая — основная, остальные — варианты написания и чтения.
 * Катакана-дубли чтений у слов с кандзи (蛙 カエル) пропускаются — они есть почти у всех слов.
 */
export function headwordForms(entry: EntryJp): HeadwordForm[] {
  const forms: HeadwordForm[] = []
  const seen = new Set<string>()

  for (const furigana of entry.furigana ?? []) {
    const text = furigana.pairs.map(p => p.word).join('')
    const kana = furigana.pairs.map(p => p.kana || p.word).join('')
    if (HAS_KANJI.test(text) && KATAKANA_ONLY.test(kana) && forms.length > 0)
      continue
    const key = `${text}|${kana}`
    if (seen.has(key))
      continue
    seen.add(key)
    forms.push({ pairs: furigana.pairs, text })
  }

  if (forms.length > 0)
    return forms

  // запасной вариант: написания и чтения из words
  for (const word of entry.words ?? []) {
    const reading = word.readings[0]?.transcription?.kana ?? ''
    for (const spelling of word.spellings) {
      forms.push({ pairs: [{ word: spelling.value, kana: reading }], text: spelling.value })
    }
    if (!word.spellings.length && reading)
      forms.push({ pairs: [{ word: reading, kana: '' }], text: reading })
  }

  if (!forms.length)
    forms.push({ pairs: [{ word: entry.title, kana: '' }], text: entry.title })

  return forms
}

/** Самый лёгкий уровень JLPT статьи (N5 легче N1) или null */
export function entryJlpt(entry: EntryJp): JlptLevel | null {
  const levels = new Set<JlptLevel>()
  const collect = (tags: Tag[] | undefined) => {
    for (const tag of tags ?? []) {
      const match = /^jlpt-n([1-5])$/i.exec(tag.engShort)
      if (match)
        levels.add(`N${match[1]}` as JlptLevel)
    }
  }
  collect(entry.tags)
  for (const furigana of entry.furigana ?? [])
    collect(furigana.tags)
  return JLPT_LEVELS.find(level => levels.has(level)) ?? null
}

export interface FrequencyInfo {
  rank: number
  /** 0–5: сколько точек закрашено */
  level: number
  /** короткая запись: 45, 3k */
  short: string
  label: string
}

const FREQ_LABELS = ['', 'редкое', 'нечастое', 'частое', 'очень частое', 'основное']

/** Ранг по частотности: меньше — чаще. 0 — нет данных */
export function entryFrequency(entry: EntryJp): FrequencyInfo | null {
  const rank = entry.frequency
  if (!rank || rank <= 0)
    return null
  const level = rank <= 1000 ? 5 : rank <= 3000 ? 4 : rank <= 8000 ? 3 : rank <= 20000 ? 2 : rank <= 50000 ? 1 : 0
  return {
    rank,
    level,
    short: rank < 1000 ? String(rank) : `${Math.round(rank / 1000)}k`,
    label: FREQ_LABELS[level] ?? '',
  }
}

export interface PosGroup {
  id: string
  label: string
}

/** Укрупнённая часть речи по тегу значения (v5r, v1 → глагол; vt/vi — не часть речи) */
export function posGroup(tag: Tag): PosGroup | null {
  const code = tag.engShort
  if (code === 'vt' || code === 'vi')
    return null
  if (code === 'exp' || code === 'expr' || code === 'prov')
    return { id: 'exp', label: 'выражение, пословица' }
  if (code.startsWith('v'))
    return { id: 'v', label: 'глагол' }
  if (code.startsWith('adj'))
    return { id: 'adj', label: 'прилагательное' }
  if (code.startsWith('adv'))
    return { id: 'adv', label: 'наречие' }
  if (code === 'n' || code.startsWith('n-') || code === 'pn')
    return { id: 'n', label: 'существительное' }
  if (code === 'prt')
    return { id: 'prt', label: 'частица' }
  if (code === 'int')
    return { id: 'int', label: 'междометие' }
  if (code === 'unc')
    return { id: 'unc', label: 'не классифицировано' }
  const label = (tag.rus || tag.rusShort || code).replace(/\s*\(.*\)$/, '')
  return { id: code, label }
}

export function entryPosGroups(entry: EntryJp): PosGroup[] {
  const groups = new Map<string, PosGroup>()
  for (const meaning of entry.meanings ?? []) {
    for (const tag of meaning.tags) {
      const group = posGroup(tag)
      if (group)
        groups.set(group.id, group)
    }
  }
  return [...groups.values()]
}

/** Пометы статьи: области, стилистика, диалекты (rusShort) */
export function entryLabels(entry: EntryJp): string[] {
  const labels = new Set<string>()
  for (const meaning of entry.meanings ?? []) {
    for (const sense of meaning.senses) {
      for (const tag of [...sense.fieldTags, ...sense.metaTags, ...sense.dialectTags])
        labels.add(tag.rusShort)
    }
  }
  return [...labels]
}

/** Значения статьи подряд; при hideRare редкие значения уходят в конец */
export function entrySenses(entry: EntryJp): Sense[] {
  const senses = (entry.meanings ?? []).flatMap(meaning => meaning.senses)
  if (!entry.hideRare)
    return senses
  return [...senses.filter(sense => !sense.isRare), ...senses.filter(sense => sense.isRare)]
}

export function entryExampleCount(entry: EntryJp) {
  return entrySenses(entry).reduce((sum, sense) => sum + sense.examples.length, 0)
}

export function contentText(content: Content[] | undefined): string {
  return (content ?? []).map(part => part.c ? contentText(part.c) : part.v).join('')
}

/** Чтение для сортировки по годзюон */
export function entryReading(entry: EntryJp) {
  const first = entry.furigana?.[0]
  if (first)
    return first.pairs.map(p => p.kana || p.word).join('')
  return entry.words?.[0]?.readings?.[0]?.transcription?.kana ?? entry.title
}

export function pluralRu(n: number, one: string, few: string, many: string) {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11)
    return one
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14))
    return few
  return many
}

/** Флаг статьи для полосы слева и значка: не проверено, ненадёжное, диалект */
export function entryFlag(entry: EntryJp): { kind: 'warn' | 'danger' | 'dial', label: string } | null {
  if (entry.status.isUnconfirmed)
    return { kind: 'danger', label: 'Ненадёжное: значение слабо подтверждается источниками' }
  if (entry.status.isUnreviewed)
    return { kind: 'warn', label: 'Не проверено' }
  if (entry.status.isDialect)
    return { kind: 'dial', label: 'Диалектное' }
  return null
}

const TILDE = /[～〜]/

/**
 * Пример с выделенным заглавным словом: «～» заменяется написанием из заголовка,
 * а если тильды нет — выделяется первое вхождение слова. Выделенный кусок получает тег hw.
 * Временное решение: когда бэкенд начнёт отдавать разметку hw сам (docs/backend-search.md, п. 9),
 * функция ничего не меняет, а потом её можно удалить.
 */
export function markHeadword(content: Content[], word: string): Content[] {
  const hasMark = (parts: Content[]): boolean => parts.some(part => part.t === 'hw' || (part.c ? hasMark(part.c) : false))
  if (!word || hasMark(content))
    return content
  let marked = false

  const hasTilde = (parts: Content[]): boolean =>
    parts.some(part => part.c ? hasTilde(part.c) : TILDE.test(part.v))
  const replaceTilde = hasTilde(content)

  const walk = (parts: Content[]): Content[] => parts.flatMap((part): Content[] => {
    if (part.c)
      return [{ ...part, c: walk(part.c) }]
    if (part.t || !part.v)
      return [part]

    if (replaceTilde) {
      if (!TILDE.test(part.v))
        return [part]
      return part.v.split(TILDE).flatMap((text, i) => i === 0
        ? (text ? [{ v: text, t: '' }] : [])
        : [{ v: word, t: 'hw' }, ...(text ? [{ v: text, t: '' }] : [])])
    }

    const index = marked ? -1 : part.v.indexOf(word)
    if (index === -1)
      return [part]
    marked = true
    return [
      ...(index > 0 ? [{ v: part.v.slice(0, index), t: '' }] : []),
      { v: word, t: 'hw' },
      ...(index + word.length < part.v.length ? [{ v: part.v.slice(index + word.length), t: '' }] : []),
    ]
  })

  return walk(content)
}
