/** Кусок строки сравнения; hl — изменённая часть, подсвечивается */
export interface DiffSegment {
  text: string
  hl?: boolean
}

export interface DiffRow {
  /** ctx — без изменений, del — удалено, add — добавлено */
  kind: 'ctx' | 'del' | 'add'
  /** номер строки «было» */
  old?: number
  /** номер строки «стало» */
  new?: number
  text: string | DiffSegment[]
}

export interface DiffHunk {
  /** раздел статьи: «Значения», «Примеры» */
  title: string
  /** диапазон строк: «стр. 4 → 4–5» */
  range?: string
  plus?: number
  minus?: number
  rows: DiffRow[]
  /** сколько строк без изменений скрыто после блока */
  foldedAfter?: number
}
