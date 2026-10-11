// Данные статьи, которые грузятся после неё и только на клиенте:
// правки (история и сводка в боковой колонке), сателлиты и сканы (вкладки со счётчиками).
// wid — без хвоста с заголовком (1577460, а не 1577460-蛙).
export function useEntryExtras(wid: MaybeRefOrGetter<string>) {
  const { client: editsClient, path: editsPath } = useEditsApi()
  const { client: jpnClient, path: jpnPath } = useJpnApi()
  const { client: ocrClient, path: ocrPath } = useOcrApi()

  const id = computed(() => toValue(wid))
  const options = { server: false, lazy: true, watch: [id] }

  const edits = useAsyncData(
    () => `entry-edits:${id.value}`,
    () => editsClient.get<EditResponse[]>(editsPath, { wid: id.value }).then(list => list ?? []),
    options,
  )

  const satellites = useAsyncData(
    () => `entry-satellites:${id.value}`,
    () => jpnClient.get<EntryJpSatellite[]>(`${jpnPath}/entries/${id.value}/satellites`).then(list => list ?? []),
    options,
  )

  const scans = useAsyncData(
    () => `entry-scans:${id.value}`,
    () => ocrClient.get<OCRPageWithBook[]>(`${ocrPath}/search-wid`, { wid: id.value }).then(list => list ?? []).catch(() => []),
    options,
  )

  return { edits, satellites, scans }
}

export interface EntryEditSummary {
  /** все правки, новые сверху */
  list: EditResponse[]
  /** номер версии для принятых правок: v1 — самая старая */
  versions: Map<string, number>
  /** последняя принятая правка */
  last: EditResponse | null
  /** правки, ждущие проверки */
  pending: EditResponse[]
  authors: number
}

/** Сводка по правкам статьи: версии, последняя правка, авторы, ожидающие проверки */
export function summarizeEdits(edits: EditResponse[] | null | undefined): EntryEditSummary {
  const list = [...(edits ?? [])].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  const applied = list.filter(isEditApplied)
  const versions = new Map(applied.map((edit, i) => [edit.id, applied.length - i]))
  const authors = new Set(applied.map(edit => edit.author?.id ?? 'anon'))
  return {
    list,
    versions,
    last: applied[0] ?? null,
    pending: list.filter(edit => edit.status === EditStatus.New),
    authors: authors.size,
  }
}
