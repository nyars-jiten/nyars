const TONES = ['info', 'warn', 'danger'] as const
const TONE_ORDER: Record<Announcement['tone'], number> = { danger: 0, warn: 1, info: 2 }
const MAX_ANNOUNCEMENTS = 3

function text(v: unknown, max: number): string | undefined {
  return typeof v === 'string' && v.trim() ? v.trim().slice(0, max) : undefined
}

function date(v: unknown): string | undefined {
  return typeof v === 'string' && !Number.isNaN(Date.parse(v)) ? v : undefined
}

/** Ссылка только на http(s) или внутри сайта: остальное (javascript:, data:) отбрасывается */
function parseLink(v: unknown): Announcement['link'] {
  if (!v || typeof v !== 'object')
    return undefined
  const { label, url } = v as Record<string, unknown>
  const l = text(label, 60)
  const u = text(url, 500)
  if (!l || !u || !(/^https?:\/\//i.test(u) || (u.startsWith('/') && !u.startsWith('//'))))
    return undefined
  return { label: l, url: u }
}

/** Идёт ли объявление в момент now (мс) */
export function isAnnouncementActive(a: Pick<Announcement, 'startsAt' | 'endsAt'>, now = Date.now()): boolean {
  if (a.startsAt && Date.parse(a.startsAt) > now)
    return false
  if (a.endsAt && Date.parse(a.endsAt) <= now)
    return false
  return true
}

/**
 * Разбор ответа сервера или значения из окружения: массив или JSON-строка.
 * Неверные элементы отбрасываются, идущие сейчас сортируются по важности, берётся не больше трёх.
 */
export function parseAnnouncements(input: unknown, now = Date.now()): Announcement[] {
  let raw = input
  if (typeof raw === 'string') {
    if (!raw.trim())
      return []
    try {
      raw = JSON.parse(raw)
    }
    catch {
      return []
    }
  }
  if (!Array.isArray(raw))
    return []

  const result: Announcement[] = []
  for (const item of raw) {
    if (!item || typeof item !== 'object')
      continue
    const o = item as Record<string, unknown>
    const id = text(o.id, 100)
    const title = text(o.title, 300)
    const tone = TONES.find(t => t === o.tone)
    if (!id || !title || !tone)
      continue
    const a: Announcement = {
      id,
      tone,
      title,
      body: text(o.body, 600),
      link: parseLink(o.link),
      startsAt: date(o.startsAt),
      endsAt: date(o.endsAt),
      dismissible: o.dismissible !== false,
    }
    if (isAnnouncementActive(a, now))
      result.push(a)
  }
  return result
    .sort((a, b) => TONE_ORDER[a.tone] - TONE_ORDER[b.tone])
    .slice(0, MAX_ANNOUNCEMENTS)
}
