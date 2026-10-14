import { shallowReactive } from 'vue'

type ToastResult<T> = string | UiToastOptions | ((value: T) => string | UiToastOptions)

export interface ToastPromiseMessages<T> {
  loading: string | UiToastOptions
  ok: ToastResult<T>
  error: ToastResult<unknown>
}

/** Сколько показывать уведомление, если длительность не задана */
export function defaultToastDuration(tone: UiToastTone, text: string, hasAction: boolean): number {
  if (tone === 'loading' || (tone === 'danger' && hasAction))
    return Infinity
  const base = { ok: 4000, info: 4000, warn: 6000, danger: 8000 }[tone]
  const extra = Math.max(0, text.length - 60) * 60
  const duration = Math.min(base + extra, Math.max(base, 10000))
  return hasAction ? Math.max(duration, 6000) : duration
}

/**
 * Очередь всплывающих уведомлений: без Nuxt, только реактивность Vue.
 * Видимых не больше limit, остальные ждут и поднимаются по мере закрытия.
 */
export function createToaster(limit = 3) {
  const visible = shallowReactive<UiToast[]>([])
  let waiting: UiToast[] = []
  let seq = 0

  function build(o: UiToastOptions): Omit<UiToast, 'uid' | 'count' | 'epoch'> {
    const tone = o.tone ?? 'info'
    const text = o.title + (o.description ?? '')
    return {
      key: o.id ?? `${tone}|${o.title}|${o.description ?? ''}`,
      id: o.id,
      tone,
      title: o.title,
      description: o.description,
      action: o.action,
      duration: o.duration ?? defaultToastDuration(tone, text, !!o.action),
    }
  }

  function findIndex(list: UiToast[], uid: number | string) {
    return list.findIndex(t => t.uid === uid || t.id === uid)
  }

  /** Показать уведомление; возвращает uid */
  function push(o: UiToastOptions): number {
    const next = build(o)
    const iv = visible.findIndex(t => t.key === next.key)
    if (iv >= 0) {
      const t = visible[iv]!
      visible[iv] = { ...t, ...next, count: o.id ? t.count : t.count + 1, epoch: t.epoch + 1 }
      return t.uid
    }
    const iw = waiting.findIndex(t => t.key === next.key)
    if (iw >= 0) {
      const t = waiting[iw]!
      waiting[iw] = { ...t, ...next, count: o.id ? t.count : t.count + 1, epoch: t.epoch + 1 }
      return t.uid
    }
    const toast: UiToast = { ...next, uid: ++seq, count: 1, epoch: 0 }
    if (visible.length < limit)
      visible.push(toast)
    else
      waiting.push(toast)
    return toast.uid
  }

  /** Изменить показанное или ожидающее уведомление по uid или id (loading → ok) */
  function update(uid: number | string, patch: Partial<UiToastOptions>) {
    for (const list of [visible, waiting]) {
      const i = findIndex(list, uid)
      if (i < 0)
        continue
      const t = list[i]!
      const next = build({ ...t, ...patch, id: t.id, duration: patch.duration })
      list[i] = { ...t, ...next, key: t.key, epoch: t.epoch + 1 }
      return
    }
  }

  /** Закрыть уведомление; без аргумента — все */
  function dismiss(uid?: number | string) {
    if (uid === undefined) {
      visible.splice(0, visible.length)
      waiting = []
      return
    }
    const i = findIndex(visible, uid)
    if (i >= 0)
      visible.splice(i, 1)
    else
      waiting = waiting.filter(t => t.uid !== uid && t.id !== uid)
    while (visible.length < limit && waiting.length)
      visible.push(waiting.shift()!)
  }

  const withTone = (tone: UiToastTone) => (title: string, o?: Omit<UiToastOptions, 'title' | 'tone'>) =>
    push({ ...o, title, tone })

  const toOptions = (r: string | UiToastOptions): UiToastOptions => typeof r === 'string' ? { title: r } : r

  /** loading → ok / error вместе с promise; ошибку пробрасывает дальше */
  async function promise<T>(p: Promise<T>, messages: ToastPromiseMessages<T>): Promise<T> {
    const uid = push({ ...toOptions(messages.loading), tone: 'loading' })
    try {
      const value = await p
      const r = typeof messages.ok === 'function' ? messages.ok(value) : messages.ok
      update(uid, { ...toOptions(r), tone: 'ok', duration: undefined })
      return value
    }
    catch (error) {
      const r = typeof messages.error === 'function' ? messages.error(error) : messages.error
      update(uid, { ...toOptions(r), tone: 'danger', duration: undefined })
      throw error
    }
  }

  return {
    visible: visible as readonly UiToast[],
    push,
    update,
    dismiss,
    promise,
    ok: withTone('ok'),
    error: withTone('danger'),
    warn: withTone('warn'),
    info: withTone('info'),
    loading: withTone('loading'),
  }
}

export type Toaster = ReturnType<typeof createToaster>
