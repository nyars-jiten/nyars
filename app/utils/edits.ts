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
