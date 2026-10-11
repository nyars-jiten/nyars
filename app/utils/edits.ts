// Хелперы над правками (EditResponse): статус для UiStatus, подпись типа, объём изменений.

/** Статус правки в терминах UiStatus */
export function editStatusKind(status: EditStatus): UiStatusKind {
  switch (status) {
    case EditStatus.Accepted:
    case EditStatus.AutoAccepted:
      return 'ok'
    case EditStatus.Declined:
    case EditStatus.Reverted:
      return 'rej'
    default:
      return 'pend'
  }
}

/** Статусы бэкенда для фильтра ?s= по статусу UiStatus; «Нужна доработка» на бэкенде пока нет */
export const EDIT_STATUS_QUERY: Record<UiStatusKind, EditStatus[]> = {
  pend: [EditStatus.New],
  ok: [EditStatus.Accepted, EditStatus.AutoAccepted],
  rej: [EditStatus.Declined, EditStatus.Reverted],
  work: [],
}

/** Правка вошла в статью */
export function isEditApplied(edit: EditResponse) {
  return edit.status === EditStatus.Accepted || edit.status === EditStatus.AutoAccepted
}

const TYPE_LABELS: Record<EditType, string> = {
  [EditType.None]: 'правка',
  [EditType.Create]: 'создание статьи',
  [EditType.Edit]: 'исправление',
  [EditType.Delete]: 'удаление статьи',
  [EditType.Transfer]: 'перенос',
  [EditType.Revert]: 'откат',
}

export function editTypeLabel(type: EditType) {
  return TYPE_LABELS[type] ?? 'правка'
}

/** Пометка типа правки рядом со статусом: обычное исправление не помечается */
export const EDIT_KIND_TAG: Partial<Record<EditType, { label: string, tone: 'neutral' | 'danger' }>> = {
  [EditType.Create]: { label: 'новая статья', tone: 'neutral' },
  [EditType.Delete]: { label: 'удаление', tone: 'danger' },
}

const DICTIONARY_LABELS: Record<DictionaryType, string> = {
  [DictionaryType.Jpn]: 'Японско-русский',
  [DictionaryType.Rus]: 'Русско-японский β',
  [DictionaryType.Kanji]: 'Кандзи',
  [DictionaryType.Name]: 'Имена',
  [DictionaryType.JpnAuto]: 'Спутники',
  [DictionaryType.Example]: 'Примеры',
}

export function editDictionaryLabel(dictionary: DictionaryType) {
  return DICTIONARY_LABELS[dictionary] ?? 'Словарь'
}

/**
 * Сколько символов добавлено и удалено: сумма изменённых кусков diff.
 * null — если список правок пришёл без diff.
 */
export function editDiffStat(edit: EditResponse): { plus: number, minus: number } | null {
  const src = edit.diffRawSrc?.length ? edit.diffRawSrc : edit.diffSrc
  const dst = edit.diffRawDst?.length ? edit.diffRawDst : edit.diffDst
  if (!src?.length && !dst?.length)
    return null
  const count = (parts: EditDiff[] | undefined) =>
    (parts ?? []).reduce((sum, part) => sum + (part.d ? Array.from(part.c).length : 0), 0)
  return { plus: count(dst), minus: count(src) }
}

/** Строка сравнения «было/стало»; gap — пропуск неизменённых строк между блоками */
export type EditDiffLine = DiffRow | { kind: 'gap' }

export interface EditLineDiff {
  lines: EditDiffLine[]
  /** строк добавлено / удалено */
  plus: number
  minus: number
}

type FlaggedLine = DiffSegment[]

/** Разбивает куски diff ({ c, d }) на строки; изменённые куски (d) становятся подсветкой */
function toLines(parts: EditDiff[] | undefined): FlaggedLine[] {
  // пустая сторона (создание или удаление статьи: сервер присылает одни переводы строк) — ни одной строки
  if (!(parts ?? []).some(part => part.c.trim()))
    return []
  const lines: FlaggedLine[] = [[]]
  for (const part of parts ?? []) {
    part.c.split('\n').forEach((chunk, i) => {
      if (i > 0)
        lines.push([])
      if (!chunk)
        return
      const line = lines.at(-1)!
      const last = line.at(-1)
      if (last && Boolean(last.hl) === part.d)
        last.text += chunk
      else
        line.push(part.d ? { text: chunk, hl: true } : { text: chunk })
    })
  }
  return lines
}

const lineText = (line: FlaggedLine) => line.map(segment => segment.text).join('')

/**
 * Все строки правки по порядку: без изменений (ctx, с номерами с обеих сторон), удалённые и добавленные.
 * Строки сопоставляются по LCS, подсветка внутри строки берётся из d-кусков сервера.
 */
export function editLineRows(edit: EditResponse): DiffRow[] {
  const src = toLines(edit.diffRawSrc?.length ? edit.diffRawSrc : edit.diffSrc)
  const dst = toLines(edit.diffRawDst?.length ? edit.diffRawDst : edit.diffDst)
  const a = src.map(lineText)
  const b = dst.map(lineText)

  // LCS по строкам
  const n = a.length
  const m = b.length
  const lcs: number[][] = Array.from({ length: n + 1 }, () => Array.from<number>({ length: m + 1 }).fill(0))
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--)
      lcs[i]![j] = a[i] === b[j] ? lcs[i + 1]![j + 1]! + 1 : Math.max(lcs[i + 1]![j]!, lcs[i]![j + 1]!)
  }

  const rows: DiffRow[] = []
  let i = 0
  let j = 0
  while (i < n || j < m) {
    if (i < n && j < m && a[i] === b[j]) {
      rows.push({ kind: 'ctx', old: i + 1, new: j + 1, text: a[i] || ' ' })
      i++
      j++
    }
    else if (i < n && (j >= m || lcs[i + 1]![j]! >= lcs[i]![j + 1]!)) {
      // сначала удалённые, потом добавленные — так они встают друг напротив друга
      rows.push({ kind: 'del', old: i + 1, text: src[i]!.length ? src[i]! : ' ' })
      i++
    }
    else {
      rows.push({ kind: 'add', new: j + 1, text: dst[j]!.length ? dst[j]! : ' ' })
      j++
    }
  }
  return rows
}

/**
 * Построчное сравнение правки: только изменённые строки (без контекста), между удалёнными
 * блоками — gap.
 */
export function editLineDiff(edit: EditResponse): EditLineDiff {
  const lines: EditDiffLine[] = []
  let plus = 0
  let minus = 0
  let skipped = false
  for (const row of editLineRows(edit)) {
    if (row.kind === 'ctx') {
      skipped = true
      continue
    }
    if (skipped && lines.length)
      lines.push({ kind: 'gap' })
    skipped = false
    lines.push(row)
    if (row.kind === 'add')
      plus++
    else
      minus++
  }
  return { lines, plus, minus }
}

/** Строка сравнения «рядом»: слева — было, справа — стало; null — на этой стороне строки нет */
export interface EditSplitRow {
  fold?: undefined
  old: DiffRow | null
  new: DiffRow | null
}

/** Строка сравнения «рядом» или свёрнутые строки без изменений */
export type EditSplitLine = EditSplitRow | { fold: number }

/**
 * Сравнение «рядом»: удалённые строки напротив добавленных, вокруг изменений — context строк
 * без изменений, остальные сворачиваются в { fold: N }. Одну строку не сворачиваем — её проще показать.
 * context = Infinity — вся статья. Пустой массив — текст не изменился.
 */
export function editSplitDiff(rows: readonly DiffRow[], context = 1): EditSplitLine[] {
  const pairs: EditSplitRow[] = []
  let i = 0
  while (i < rows.length) {
    const row = rows[i]!
    if (row.kind === 'ctx') {
      pairs.push({ old: row, new: row })
      i++
      continue
    }
    const dels: DiffRow[] = []
    const adds: DiffRow[] = []
    while (i < rows.length && rows[i]!.kind !== 'ctx') {
      const next = rows[i++]!
      if (next.kind === 'del')
        dels.push(next)
      else
        adds.push(next)
    }
    for (let k = 0; k < Math.max(dels.length, adds.length); k++)
      pairs.push({ old: dels[k] ?? null, new: adds[k] ?? null })
  }

  const changed = pairs.map(pair => pair.old?.kind !== 'ctx')
  if (!changed.includes(true))
    return []

  const visible = pairs.map((_, k) => {
    if (context === Infinity)
      return true
    for (let d = Math.max(0, k - context); d <= Math.min(pairs.length - 1, k + context); d++) {
      if (changed[d])
        return true
    }
    return false
  })

  const out: EditSplitLine[] = []
  let k = 0
  while (k < pairs.length) {
    if (visible[k]) {
      out.push(pairs[k++]!)
      continue
    }
    let end = k
    while (end < pairs.length && !visible[end]) end++
    if (end - k === 1)
      out.push(pairs[k]!)
    else
      out.push({ fold: end - k })
    k = end
  }
  return out
}
