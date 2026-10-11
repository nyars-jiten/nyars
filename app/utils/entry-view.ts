// Разбор статьи (EntryJp) для страницы статьи: группы значений, произношение,
// кандзи в записи, флаги статуса. Чистые функции — вызываются из computed.

/* ---------- заголовок ---------- */

/** Размер заглавного слова по числу знаков: 2 → 72px, 12+ → 32px */
export function headwordSize(text: string): number {
  const n = Array.from(text).length
  if (n <= 2)
    return 72
  if (n <= 4)
    return 56
  if (n <= 8)
    return 44
  if (n <= 12)
    return 36
  return 32
}

/**
 * Пометы, по которым форма считается редкой и уходит из основного заголовка в строку ниже:
 * редкие/нестандартные/устаревшие/поисковые написания (Kinf) и чтения (Rinf), «редк.», «мал.изв.».
 */
const RARE_FORM_TAGS = new Set(['rare', 'obsc', 'iK', 'oK', 'sK', 'mK', 'io', 'rk', 'ok', 'sk', 'rm', 'oik'])
/** Служебные теги формы, которые в заголовке не показываются (частотность и JLPT — в боковой колонке) */
const HIDDEN_FORM_TAGS = /^(?:common|jlpt-n\d)$/i

export function isRareForm(form: HeadwordForm) {
  return form.tags.some(tag => RARE_FORM_TAGS.has(tag.engShort))
}

export interface HeadwordGroups {
  /** обычные формы — в основном заголовке */
  main: HeadwordForm[]
  /** редкие формы — строкой ниже, мельче */
  rare: HeadwordForm[]
}

/** Делит формы заголовка на обычные и редкие; если обычных нет, первая редкая становится основной */
export function splitHeadwordForms(forms: HeadwordForm[]): HeadwordGroups {
  const clean = forms.map(form => ({ ...form, tags: form.tags.filter(tag => !HIDDEN_FORM_TAGS.test(tag.engShort)) }))
  const main = clean.filter(form => !isRareForm(form))
  const rare = clean.filter(form => isRareForm(form))
  if (!main.length && rare.length)
    main.push(rare.shift()!)
  return { main, rare }
}

/* ---------- части речи ---------- */

const POS_JA: [RegExp, string][] = [
  [/^prov$/, '諺'],
  [/^(?:exp|expr)$/, '表現'],
  [/^adj-na$/, '形容動詞'],
  [/^adj-no$/, '名詞'],
  [/^adj/, '形容詞'],
  [/^adv/, '副詞'],
  [/^aux/, '助動詞'],
  [/^conj$/, '接続詞'],
  [/^ctr$/, '助数詞'],
  [/^int$/, '感動詞'],
  [/^pn$/, '代名詞'],
  [/^pref$/, '接頭辞'],
  [/^suf/, '接尾辞'],
  [/^prt$/, '助詞'],
  [/^v/, '動詞'],
  [/^n(?:-|$)/, '名詞'],
]

/** Японское название части речи: 名詞, 動詞… — по первому подходящему тегу */
export function posJapanese(tags: Tag[]): string {
  for (const tag of tags) {
    if (tag.engShort === 'vt' || tag.engShort === 'vi')
      continue
    const found = POS_JA.find(([re]) => re.test(tag.engShort))
    if (found)
      return found[1]
  }
  return ''
}

/** Заголовок группы значений: «существительное», «глагол годан, переходный» */
export function posHeading(tags: Tag[]): string {
  return tags.map(tag => tag.rus || tag.rusShort).filter(Boolean).join(', ')
}

/* ---------- произношение ---------- */

export interface PitchMora {
  text: string
  /** высокий тон: линия сверху */
  high: boolean
  /** падение тона после моры: засечка справа */
  drop: boolean
  /** исходная мора, если text заменён (носовой が → か) */
  source?: string
  /** гласный не произносится (редукция) */
  silent: boolean
  /** носовой звук (бидакуон) */
  nasal: boolean
  /** граница слов после моры */
  split: boolean
}

export interface Pronunciation {
  reading: string
  /** номер ударения; null — не размечено */
  accent: number | null
  /** хэйбан, атамадака… */
  type: string
  mora: PitchMora[]
  audio: string
}

const KATAKANA = /^[\u30A0-\u30FF]+$/
const NASAL_BASE: Record<string, string> = { が: 'か', ぎ: 'き', ぐ: 'く', げ: 'け', ご: 'こ', ガ: 'カ', ギ: 'キ', グ: 'ク', ゲ: 'ケ', ゴ: 'コ' }

/** が → か: первая кана моры без дакутэна */
function nasalBase(mora: string) {
  const first = mora.charAt(0)
  return (NASAL_BASE[first] ?? first) + mora.slice(1)
}

/** Есть ли в чтениях редукция или носовые — тогда под произношением нужна подсказка */
export function pronunciationMarks(items: Pronunciation[]) {
  const mora = items.flatMap(item => item.mora)
  return { silent: mora.some(m => m.silent), nasal: mora.some(m => m.nasal) }
}

const KANA_SMALL = 'ゃゅょぁぃぅぇぉゎャュョァィゥェォヮ'

/** Разбивка чтения на моры: きゃ, く */
export function splitMora(reading: string): string[] {
  const out: string[] = []
  for (const ch of reading) {
    if (KANA_SMALL.includes(ch) && out.length)
      out[out.length - 1] += ch
    else
      out.push(ch)
  }
  return out
}

/** Тип ударения по номеру и числу мор */
export function pitchType(accent: number, moraCount: number): string {
  if (accent === 0)
    return 'хэйбан'
  if (accent === 1)
    return 'атамадака'
  if (accent === moraCount)
    return 'одака'
  return 'накадака'
}

/**
 * Чтения статьи с ударением: по строке на каждый вариант ударения.
 * Чтения без разметки ударения тоже попадают в список — с accent = null.
 */
export function entryPronunciations(entry: EntryJp): Pronunciation[] {
  const result: Pronunciation[] = []
  const seen = new Set<string>()

  for (const word of entry.words ?? []) {
    for (const reading of word.readings) {
      const kana = reading.transcription?.kana || reading.value
      if (!kana)
        continue

      if (!reading.pitch?.length) {
        if (seen.has(kana))
          continue
        seen.add(kana)
        result.push({
          reading: kana,
          accent: null,
          type: '',
          mora: splitMora(kana).map(text => ({ text, high: false, drop: false, silent: false, nasal: false, split: false })),
          audio: '',
        })
        continue
      }

      for (const pitch of reading.pitch) {
        const key = `${kana}|${pitch.pitchNum}`
        if (seen.has(key))
          continue
        seen.add(key)
        seen.add(kana)
        const mora = pitch.diagram.map(pair => ({
          // носовой が пишется как か с кружком (бидакуон)
          text: pair.n ? nasalBase(pair.m) : pair.m,
          source: pair.m,
          high: pair.s === 1 || pair.s === 3,
          drop: pair.s === 2 || pair.s === 3,
          silent: pair.sl,
          nasal: pair.n,
          split: pair.sp,
        }))
        result.push({
          reading: mora.map(m => m.source).join('') || kana,
          accent: pitch.pitchNum,
          type: pitchType(pitch.pitchNum, mora.length),
          mora,
          audio: pitch.audio,
        })
      }
    }
  }

  // строки без разметки, если для того же чтения есть размеченная, не нужны
  const marked = new Set(result.filter(p => p.accent !== null).map(p => p.reading))
  const unique = result.filter(p => p.accent !== null || !marked.has(p.reading))
  // катакана-дубли чтений (カエル при かえる) есть почти у всех слов — пропускаем
  const hiragana = new Set(unique.map(p => p.reading).filter(r => !KATAKANA.test(r)))
  return unique.filter(p => !KATAKANA.test(p.reading) || !hiragana.has(toHiragana(p.reading)))
}

/** カエル → かえる (ー остаётся) */
export function toHiragana(text: string) {
  return text.replace(/[\u30A1-\u30F6]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0x60))
}

/* ---------- кандзи ---------- */

const KANJI = /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\u3005]/

/** Уникальные кандзи основной формы в порядке появления (々 пропускается) */
export function entryKanji(text: string): string[] {
  return [...new Set(Array.from(text).filter(ch => KANJI.test(ch) && ch !== '々'))]
}

/* ---------- статус ---------- */

export interface EntryStatusFlag {
  kind: 'warn' | 'danger' | 'dial' | 'neutral'
  label: string
  hint: string
  icon: string
}

export function entryStatusFlags(status: EntryStatus): EntryStatusFlag[] {
  const flags: EntryStatusFlag[] = []
  if (status.isDeleted)
    flags.push({ kind: 'danger', label: 'Статья удалена', hint: 'Статья удалена и не показывается в поиске', icon: 'tabler:trash' })
  if (status.isUnconfirmed)
    flags.push({ kind: 'danger', label: 'Ненадёжное', hint: 'Значение слабо подтверждается источниками', icon: 'tabler:alert-octagon' })
  if (status.isUnreviewed)
    flags.push({ kind: 'warn', label: 'Не проверено', hint: 'Статья требует дальнейшей проверки и редактирования', icon: 'tabler:alert-triangle' })
  if (status.isDialect)
    flags.push({ kind: 'dial', label: 'Диалектное', hint: 'Слово из диалекта', icon: 'tabler:message-2' })
  if (status.isArchaic)
    flags.push({ kind: 'neutral', label: 'Устаревшее', hint: 'Устаревшее слово', icon: 'tabler:hourglass' })
  if (status.isProper)
    flags.push({ kind: 'neutral', label: 'Имя собственное', hint: 'Имя собственное', icon: 'tabler:user' })
  return flags
}
