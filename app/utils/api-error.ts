/**
 * Короткая фраза об ошибке запроса для уведомления.
 * Разбирает ошибку из useApiClient (createError со statusCode / statusMessage).
 */
export function apiErrorText(error: unknown, fallback = 'Что-то пошло не так. Попробуйте ещё раз.'): string {
  const e = error as { statusCode?: number, statusMessage?: string } | null | undefined
  const status = e?.statusCode
  if (status === 500 && e?.statusMessage === 'Network error')
    return 'Нет связи с сервером'
  if (status === 401)
    return 'Нужно войти заново'
  if (status === 403)
    return 'Недостаточно прав'
  if (status === 404)
    return 'Не найдено'
  if (status === 429)
    return 'Слишком много запросов, подождите минуту'
  if (status && status >= 500)
    return 'Сервер не ответил'
  return fallback
}
