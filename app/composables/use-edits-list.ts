// Список правок для страницы /edits: фильтры, постраничная загрузка и действия модератора.
// Что умеет бэкенд (статус, тип, словарь, дата «с», автор) — уходит в запрос GET /edits.
// Остальное (объём, проверяющий, дата «по») фильтруется на клиенте по уже загруженным правкам,
// и при необходимости догружаются следующие страницы — см. docs/backend-edits.md.

export type EditsPeriod = '1' | '7' | '30' | 'all' | 'custom'
export type EditsSize = 'small' | 'medium' | 'large'

export interface EditsFilters {
  status: UiStatusKind | 'all'
  /** выбранные словари; все — без фильтра */
  dicts: DictionaryType[]
  /** пусто — все типы */
  kinds: EditType[]
  /** пусто — любой объём */
  sizes: EditsSize[]
  /** ник автора */
  author: string
  /** '' — любой, '-' — не назначен, иначе ник проверяющего */
  reviewer: string
  period: EditsPeriod
  /** YYYY-MM-DD; для period ≠ custom вычисляются из периода */
  from: string
  to: string
  mine: boolean
}

/** Словари в фильтре — как в макете */
export const EDITS_DICTS = [DictionaryType.Jpn, DictionaryType.Kanji, DictionaryType.Rus, DictionaryType.JpnAuto] as const

export const EDITS_KINDS = [EditType.Create, EditType.Edit, EditType.Delete] as const

export const EDITS_SIZES: { value: EditsSize, label: string, max: number }[] = [
  { value: 'small', label: 'до 100 знаков', max: 100 },
  { value: 'medium', label: '100–1000', max: 1000 },
  { value: 'large', label: 'крупные', max: Infinity },
]

export const EDITS_PERIODS: UiOption<EditsPeriod>[] = [
  { value: '1', label: 'сегодня' },
  { value: '7', label: '7 дней' },
  { value: '30', label: '30 дней' },
  { value: 'all', label: 'всё время' },
]

const STATUSES = ['all', 'pend', 'work', 'ok', 'rej'] as const

function defaults(status: EditsFilters['status'] = 'all'): EditsFilters {
  return {
    status,
    dicts: [...EDITS_DICTS],
    kinds: [],
    sizes: [],
    author: '',
    reviewer: '',
    period: 'all',
    from: '',
    to: '',
    mine: false,
  }
}

/** YYYY-MM-DD в местном времени */
export function isoDay(date: Date) {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

function daysAgo(days: number) {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return isoDay(date)
}

/** Границы периода: пресеты считаются от сегодняшнего дня */
export function periodRange(filters: EditsFilters): { from: string, to: string } {
  switch (filters.period) {
    case '1': return { from: daysAgo(0), to: '' }
    case '7': return { from: daysAgo(6), to: '' }
    case '30': return { from: daysAgo(29), to: '' }
    case 'all': return { from: '', to: '' }
    default: return { from: filters.from, to: filters.to }
  }
}

function editSize(edit: EditResponse) {
  const stat = editDiffStat(edit)
  return stat ? stat.plus + stat.minus : 0
}

function sizeBucket(edit: EditResponse): EditsSize {
  const size = editSize(edit)
  return EDITS_SIZES.find(bucket => size <= bucket.max)!.value
}

/** Начало дня YYYY-MM-DD в местном времени как ISO: бэкенд принимает from только так (дата без времени даёт неверный результат) */
function startOfDayIso(day: string) {
  const [y, m, d] = day.split('-').map(Number)
  return new Date(y!, m! - 1, d!).toISOString()
}

const PAGE = 20
/** сколько страниц догружать подряд, если клиентские фильтры почти всё скрыли */
const AUTO_PAGES = 5

export function useEditsList() {
  const route = useRoute()
  const router = useRouter()
  const { client, path } = useEditsApi()
  const { client: userClient, path: userPath } = useUserApi()
  const { user } = storeToRefs(useUserStore())

  const initialStatus = STATUSES.find(status => status === route.query.status) ?? 'all'
  const filters = ref<EditsFilters>(defaults(initialStatus))

  // статус — в адресе, чтобы очередь «Не проверено» можно было держать в закладках
  watch(() => filters.value.status, (status) => {
    router.replace({ query: { ...route.query, status: status === 'all' ? undefined : status } })
  })

  function reset() {
    filters.value = defaults()
  }

  const activeCount = computed(() => {
    const f = filters.value
    const base = defaults()
    return [
      f.dicts.length !== base.dicts.length,
      f.kinds.length > 0,
      f.sizes.length > 0,
      Boolean(f.author.trim()),
      Boolean(f.reviewer),
      f.period !== 'all',
      f.mine,
    ].filter(Boolean).length
  })

  /* ---------- автор: ник → id ---------- */

  const authorName = refDebounced(computed(() => filters.value.author.trim()), 400)
  const { data: authorUser, status: authorStatus } = useAsyncData(
    () => `edits-author:${authorName.value}`,
    () => authorName.value
      ? userClient.get<User>(`${userPath}/profile/${encodeURIComponent(authorName.value)}`).catch(() => null)
      : Promise.resolve(null),
    { watch: [authorName] },
  )
  /** ник введён, но такого участника нет */
  const authorMissing = computed(() => Boolean(authorName.value) && authorStatus.value === 'success' && !authorUser.value)

  /* ---------- запрос ---------- */

  const range = computed(() => periodRange(filters.value))

  /** параметры GET /edits; null — запрос заведомо пустой */
  const params = computed(() => {
    const f = filters.value
    const out: Record<string, string> = {}

    if (f.status !== 'all') {
      const statuses = EDIT_STATUS_QUERY[f.status]
      if (!statuses.length)
        return null
      out.s = statuses.join(',')
    }
    if (!f.dicts.length)
      return null
    if (f.dicts.length !== EDITS_DICTS.length)
      out.d = f.dicts.join(',')
    if (f.kinds.length)
      out.t = f.kinds.join(',')
    if (range.value.from)
      out.from = startOfDayIso(range.value.from)

    if (f.mine) {
      if (!user.value)
        return null
      out.userId = user.value.id
    }
    else if (authorName.value) {
      if (authorMissing.value)
        return null
      if (!authorUser.value)
        return null
      out.userId = authorUser.value.id
    }
    return out
  })

  const key = computed(() => `edits:${JSON.stringify(params.value)}`)

  const { data: firstPage, status, error, refresh } = useAsyncData(
    key,
    () => params.value
      ? client.get<EditResponse[]>(path, { ...params.value, n: PAGE, o: 0 })
      : Promise.resolve([] as EditResponse[]),
  )

  const morePages = ref<EditResponse[]>([])
  const lastPageSize = ref(PAGE)
  const loadingMore = ref(false)

  watch(key, () => {
    morePages.value = []
    lastPageSize.value = PAGE
  })

  const { patched, act } = useEditModeration()

  const loaded = computed(() => [...(firstPage.value ?? []), ...morePages.value].map(edit => patched.value[edit.id] ?? edit))
  const hasMore = computed(() => Boolean(params.value) && (morePages.value.length ? lastPageSize.value : firstPage.value?.length ?? 0) === PAGE)

  async function loadMore() {
    if (loadingMore.value || !hasMore.value || !params.value)
      return
    loadingMore.value = true
    const requestKey = key.value
    try {
      const page = await client.get<EditResponse[]>(path, { ...params.value, n: PAGE, o: (firstPage.value?.length ?? 0) + morePages.value.length })
      // фильтры успели поменяться — ответ уже не нужен
      if (requestKey !== key.value)
        return
      morePages.value = [...morePages.value, ...page]
      lastPageSize.value = page.length
    }
    finally {
      loadingMore.value = false
    }
  }

  /* ---------- фильтры на клиенте ---------- */

  const clientFiltered = computed(() => {
    const f = filters.value
    const to = range.value.to
    return Boolean(f.sizes.length || f.reviewer || to)
  })

  const list = computed(() => {
    const f = filters.value
    const to = range.value.to
    return loaded.value.filter((edit) => {
      if (f.sizes.length && !f.sizes.includes(sizeBucket(edit)))
        return false
      if (f.reviewer) {
        const reviewer = edit.status === EditStatus.New ? null : edit.approver?.username ?? null
        if (f.reviewer === '-' ? reviewer !== null : reviewer !== f.reviewer)
          return false
      }
      if (to && isoDay(new Date(edit.createdAt)) > to)
        return false
      return true
    })
  })

  // клиентские фильтры скрыли почти всё — догружаем несколько страниц подряд
  let autoLoading = false
  watch([filters, firstPage], async () => {
    if (!import.meta.client || autoLoading || !clientFiltered.value)
      return
    autoLoading = true
    try {
      let pages = 0
      while (clientFiltered.value && status.value === 'success' && list.value.length < PAGE && hasMore.value && pages < AUTO_PAGES) {
        pages++
        await loadMore()
      }
    }
    finally {
      autoLoading = false
    }
  }, { immediate: true, deep: true })

  /** проверяющие из загруженных правок — для выпадающего списка */
  const reviewers = computed(() => {
    const names = new Set<string>()
    for (const edit of loaded.value) {
      if (edit.status !== EditStatus.New && edit.approver)
        names.add(edit.approver.username)
    }
    if (filters.value.reviewer && filters.value.reviewer !== '-')
      names.add(filters.value.reviewer)
    return [...names].sort((a, b) => a.localeCompare(b, 'ru'))
  })

  return {
    filters,
    reset,
    activeCount,
    range,
    authorMissing,
    list,
    loaded,
    status,
    error,
    refresh,
    hasMore,
    loadingMore,
    loadMore,
    clientFiltered,
    reviewers,
    act,
  }
}
