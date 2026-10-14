const HIDDEN_MAX_AGE = 60 * 60 * 24 * 90
const REFRESH_AFTER = 10 * 60 * 1000

/**
 * Объявления сайта (лента под шапкой). Грузятся при SSR вместе со страницей.
 * Скрытые запоминаются в cookie, а не в localStorage: сервер сразу знает, что их не рисовать.
 */
export function useAnnouncements() {
  const { data, error, refresh } = useFetch<Announcement[]>('/_api/announcements', {
    key: 'announcements',
    default: () => [],
  })

  const hidden = useCookie<string[]>('announcements-hidden', {
    default: () => [],
    maxAge: HIDDEN_MAX_AGE,
    sameSite: 'lax',
  })

  // пока null — как на сервере; после монтирования идёт по часам и скрывает закончившиеся
  const now = ref<number | null>(null)
  const loadedAt = ref(0)

  const visible = computed(() => (data.value ?? []).filter(a =>
    (now.value === null || isAnnouncementActive(a, now.value))
    && !(a.dismissible && hidden.value.includes(a.id)),
  ))

  function dismiss(id: string) {
    if (!hidden.value.includes(id))
      hidden.value = [...hidden.value, id]
  }

  if (import.meta.client) {
    const visibility = useDocumentVisibility()

    onMounted(() => {
      now.value = Date.now()
      loadedAt.value = Date.now()
    })
    useIntervalFn(() => (now.value = Date.now()), 60_000)

    // cookie не должна расти: забываем id объявлений, которых уже нет
    watch(data, (list) => {
      loadedAt.value = Date.now()
      if (error.value || !hidden.value.length)
        return
      const active = new Set(list.map(a => a.id))
      const kept = hidden.value.filter(id => active.has(id))
      if (kept.length !== hidden.value.length)
        hidden.value = kept
    })

    // вкладка долго лежала в фоне: объявление могло появиться
    watch(visibility, (state) => {
      if (state === 'visible' && Date.now() - loadedAt.value > REFRESH_AFTER)
        refresh()
    })
  }

  return { announcements: visible, dismiss }
}
