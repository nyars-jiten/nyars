// Выдача страницы поиска: первая страница, дописывание по курсору, токены, другие словари, случайные статьи.
// Состояние поиска берётся из URL (SearchUrlState), поэтому после обновления страницы приходит тот же ответ.

export type SearchStatus = 'idle' | 'pending' | 'success' | 'error'

function errorStatus(error: unknown): number | undefined {
  const e = error as { statusCode?: number, status?: number } | null
  return e?.statusCode ?? e?.status
}

function toError(error: unknown): Error {
  return error instanceof Error ? error : new Error(String((error as { message?: string })?.message ?? error))
}

export function useJpnSearch(state: Ref<SearchUrlState>) {
  const { search, random } = useSearch()

  /* ---------- основной запрос (japanese-russian) ---------- */

  const first = shallowRef<JpnSearchResponse | null>(null)
  const tokens = shallowRef<SearchToken[]>([])
  const items = shallowRef<EntryJp[]>([])
  const nextCursor = ref<string>()
  const status = ref<SearchStatus>('idle')
  const error = ref<Error | null>(null)
  const loadingMore = ref(false)
  const randomMode = ref(false)

  let seq = 0
  let tokensQuery = ''
  let controller: AbortController | null = null
  /** ключ запроса, по которому сейчас показана выдача */
  let okKey: string | null = null

  /** Прервать идущий запрос и начать новый отсчёт; ответы отменённых запросов отбрасываются */
  function nextRequest() {
    controller?.abort()
    controller = new AbortController()
    return { current: ++seq, signal: controller.signal }
  }

  /** Тело запроса без курсора. Пустой запрос — просмотр словаря (по фильтрам или целиком) */
  const body = computed<SearchRequest | null>(() => {
    const s = state.value
    // в режиме токена бэкенд фильтры игнорирует
    const filters = s.token === null ? buildSearchFilters(s.filters) : undefined
    return {
      query: s.q,
      ...(s.token !== null && { token: s.token }),
      ...(filters && { filters }),
    }
  })

  async function run() {
    const { current, signal } = nextRequest()
    randomMode.value = false
    loadingMore.value = false
    const request = body.value
    if (!request) {
      first.value = null
      tokens.value = []
      items.value = []
      nextCursor.value = undefined
      status.value = 'idle'
      return
    }
    status.value = 'pending'
    error.value = null
    try {
      const res = await search(request, signal)
      if (current !== seq)
        return
      okKey = JSON.stringify(request)
      first.value = res
      // строка токенов — из первого ответа по этому запросу; клик по токену её не меняет
      if (tokensQuery !== state.value.q || !tokens.value.length) {
        tokens.value = res.tokens ?? []
        tokensQuery = state.value.q
      }
      items.value = res.items ?? []
      nextCursor.value = res.nextCursor || undefined
      status.value = 'success'
    }
    catch (e) {
      if (current !== seq)
        return
      error.value = toError(e)
      status.value = 'error'
    }
  }

  async function more() {
    const request = body.value
    const cursor = nextCursor.value
    if (!request || !cursor || loadingMore.value || randomMode.value)
      return
    const current = seq
    const signal = controller?.signal
    loadingMore.value = true
    try {
      const res = await search({ ...request, cursor }, signal)
      if (current !== seq)
        return
      items.value = [...items.value, ...(res.items ?? [])]
      nextCursor.value = res.nextCursor || undefined
    }
    catch (e) {
      if (current !== seq)
        return
      // курсор не подходит к запросу — начинаем выдачу заново
      if (errorStatus(e) === 400) {
        await run()
        return
      }
      error.value = toError(e)
    }
    finally {
      if (current === seq)
        loadingMore.value = false
    }
  }

  /** 25 случайных статей по запросу и фильтрам; список заменяется, «ещё» нет */
  async function showRandom() {
    const { current, signal } = nextRequest()
    const s = state.value
    randomMode.value = true
    status.value = 'pending'
    error.value = null
    try {
      const res = await random({ query: s.q, filters: buildSearchFilters(s.filters) }, signal)
      if (current !== seq)
        return
      items.value = res.items ?? []
      nextCursor.value = undefined
      status.value = 'success'
    }
    catch (e) {
      if (current !== seq)
        return
      error.value = toError(e)
      status.value = 'error'
    }
  }

  /* ---------- другие словари: ocr, sat, kanji ---------- */

  const other = shallowRef<JpnSearchResponse | null>(null)
  const otherStatus = ref<SearchStatus>('idle')
  const otherError = ref<Error | null>(null)
  let otherSeq = 0
  let otherController: AbortController | null = null

  const otherBody = computed<SearchRequest | null>(() => {
    const s = state.value
    return s.dict !== 'jp' && s.q ? { query: s.q, dict: s.dict } : null
  })

  async function runOther() {
    otherController?.abort()
    otherController = new AbortController()
    const current = ++otherSeq
    const signal = otherController.signal
    const request = otherBody.value
    if (!request) {
      other.value = null
      otherStatus.value = 'idle'
      return
    }
    otherStatus.value = 'pending'
    otherError.value = null
    try {
      const res = await search(request, signal)
      if (current !== otherSeq)
        return
      other.value = res
      otherStatus.value = 'success'
    }
    catch (e) {
      if (current !== otherSeq)
        return
      otherError.value = toError(e)
      otherStatus.value = 'error'
    }
  }

  const key = computed(() => JSON.stringify(body.value))
  const otherKey = computed(() => JSON.stringify(otherBody.value))

  if (import.meta.client) {
    onMounted(() => {
      run()
      runOther()
    })
    // вернулись к запросу, по которому уже показана выдача (например, «Отменить»): повторно не грузим
    watch(key, (value) => {
      if (value === okKey && !randomMode.value)
        cancel()
      else
        run()
    })
    watch(otherKey, runOther)
  }

  /** Отменить идущий запрос и оставить на экране последнюю успешную выдачу */
  function cancel() {
    controller?.abort()
    seq++
    loadingMore.value = false
    if (status.value === 'pending')
      status.value = items.value.length || first.value ? 'success' : 'idle'
  }

  /** выдача уже есть, но запрос на новую ещё идёт */
  const refreshing = computed(() => status.value === 'pending' && items.value.length > 0)

  /* ---------- производные значения ---------- */

  /** индекс токена, по которому показана выдача: выбранный кликом или выбранный бэкендом */
  const activeToken = computed<number | null>(() => {
    if (state.value.token !== null)
      return state.value.token
    return first.value?.mode === 'token' ? first.value.activeToken ?? null : null
  })
  const tokenMode = computed(() => first.value?.mode === 'token')

  function dictCount(dict: SearchDict): number | string | undefined {
    const item = first.value?.dicts?.find(d => d.dict === dict)
    if (!item)
      return undefined
    return item.capped ? '100+' : item.count
  }

  return {
    first,
    tokens,
    items,
    nextCursor,
    status,
    error,
    loadingMore,
    randomMode,
    activeToken,
    tokenMode,
    other,
    otherStatus,
    otherError,
    refreshing,
    cancel,
    run,
    more,
    showRandom,
    runOther,
    dictCount,
  }
}
