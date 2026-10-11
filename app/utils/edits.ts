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
  // пустая сторона (создание или удаление статьи) — ни одной строки
  if (!(parts ?? []).some(part => part.c))
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
 * Построчное сравнение правки: только изменённые строки (без контекста), между удалёнными
 * блоками — gap. Строки сопоставляются по LCS, подсветка внутри строки берётся из d-кусков сервера.
 */
export function editLineDiff(edit: EditResponse): EditLineDiff {
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

  const lines: EditDiffLine[] = []
  let plus = 0
  let minus = 0
  let skipped = false
  let i = 0
  let j = 0
  const push = (row: DiffRow) => {
    if (skipped && lines.length)
      lines.push({ kind: 'gap' })
    skipped = false
    lines.push(row)
  }
  while (i < n || j < m) {
    if (i < n && j < m && a[i] === b[j]) {
      skipped = true
      i++
      j++
    }
    else if (i < n && (j >= m || lcs[i + 1]![j]! >= lcs[i]![j + 1]!)) {
      // сначала удалённые, потом добавленные — так они встают друг напротив друга
      push({ kind: 'del', old: i + 1, text: src[i]!.length ? src[i]! : ' ' })
      minus++
      i++
    }
    else {
      push({ kind: 'add', new: j + 1, text: dst[j]!.length ? dst[j]! : ' ' })
      plus++
      j++
    }
  }
  return { lines, plus, minus }
}
