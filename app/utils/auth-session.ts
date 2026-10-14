import type { Pinia } from 'pinia'

// Клиентская сессия: refresh с single-flight, бэкоффом и синхронизацией вкладок.
// Разлогиниваем только по 401 от POST /auth/refresh или по явному logout;
// сеть, 5xx, 429 — повод повторить, а не считать пользователя вышедшим.

export type RefreshResult = 'ok' | 'dead'
type AuthMessage = 'login' | 'logout'

const BACKOFF_START = 1000
const BACKOFF_MAX = 30_000

let pinia: Pinia | undefined
let apiUrl = ''
let refreshing: Promise<RefreshResult> | null = null
let channel: BroadcastChannel | null = null

function store() {
  return useUserStore(pinia)
}

function sleep(ms: number) {
  // ожидание прерывается возвращением сети — не ждём лишнего
  return new Promise<void>((resolve) => {
    let timer: ReturnType<typeof setTimeout> | undefined
    const done = () => {
      clearTimeout(timer)
      window.removeEventListener('online', done)
      resolve()
    }
    timer = setTimeout(done, ms)
    window.addEventListener('online', done, { once: true })
  })
}

async function refreshAttempt(): Promise<RefreshResult | 'retry'> {
  const run = async (): Promise<RefreshResult | 'retry'> => {
    try {
      const data = await $fetch<RefreshResponse>('/auth/refresh', {
        baseURL: apiUrl,
        method: 'POST',
        credentials: 'include',
      })
      const s = store()
      s.setUser(data.user ?? s.user ?? null, data.access_expires_at ? Date.parse(data.access_expires_at) : null)
      return 'ok'
    }
    catch (error: any) {
      return error?.response?.status === 401 ? 'dead' : 'retry'
    }
  }
  // сериализуем между вкладками, если браузер умеет
  return navigator.locks ? navigator.locks.request('auth-refresh', run) : run()
}

async function refreshLoop(): Promise<RefreshResult> {
  for (let attempt = 0; ; attempt++) {
    const result = await refreshAttempt()
    if (result === 'ok')
      return 'ok'
    if (result === 'dead') {
      store().setLoggedOut()
      postAuthMessage('logout')
      return 'dead'
    }
    await sleep(Math.min(BACKOFF_START * 2 ** attempt, BACKOFF_MAX))
  }
}

/** Обновить сессию. Одновременно выполняется только один refresh. */
export function refreshSession(): Promise<RefreshResult> {
  refreshing ??= refreshLoop().finally(() => {
    refreshing = null
  })
  return refreshing
}

/** Обновить сессию, если пользователь залогинен и access скоро истечёт (или срок неизвестен). */
export function ensureFreshSession(thresholdMs = 2 * 60 * 1000) {
  const s = store()
  if (!s.user && !s.authUnknown)
    return
  if (!s.accessExpiresAt || s.accessExpiresAt - Date.now() < thresholdMs)
    refreshSession()
}

export function postAuthMessage(type: AuthMessage) {
  channel?.postMessage(type)
}

export function initAuthSession(p: Pinia, url: string) {
  pinia = p
  apiUrl = url
  if (typeof BroadcastChannel === 'undefined')
    return
  channel = new BroadcastChannel('auth')
  channel.onmessage = ({ data }: MessageEvent<AuthMessage>) => {
    if (data === 'logout')
      store().setLoggedOut()
    else if (data === 'login')
      refreshSession()
  }
}
