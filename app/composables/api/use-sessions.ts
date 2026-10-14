import { useApiClient } from './client'

/**
 * Сессии (устройства) текущего пользователя
 */
export function useSessions() {
  const client = useApiClient()
  const path = '/users/me/sessions'

  /** Список активных сессий; текущая помечена `current` */
  const list = () => client.get<UserSession[]>(path)

  /** Завершить конкретную сессию (текущую завершать через logout) */
  const revoke = (id: string) => client.delete<{ message: string }>(`${path}/${encodeURIComponent(id)}`)

  /** Выйти на всех остальных устройствах */
  const logoutOthers = () => client.post<{ message: string }>('/auth/logout-others')

  return { list, revoke, logoutOthers }
}
