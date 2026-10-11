// Короткие даты для интерфейса: «сегодня», «вчера», «3 окт.», «12 мар. 2019».

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
}

/** Короткая дата: сегодня · вчера · 3 окт. · 12 мар. 2019 */
export function shortDate(value: Date | string | number, now = new Date()): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime()))
    return ''
  const days = Math.round((startOfDay(now) - startOfDay(date)) / 86_400_000)
  if (days === 0)
    return 'сегодня'
  if (days === 1)
    return 'вчера'
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: date.getFullYear() === now.getFullYear() ? undefined : 'numeric',
  }).replace(/\s?г\.$/, '')
}

/** Полная дата и время для подсказки и <time datetime> */
export function fullDate(value: Date | string | number): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime()))
    return ''
  return date.toLocaleString('ru-RU', { dateStyle: 'long', timeStyle: 'short' })
}

/** Дата со временем для списков правок: сегодня, 10:05 · вчера, 22:05 · 2 окт., 18:40 · 14 мар. 2019 */
export function shortDateTime(value: Date | string | number, now = new Date()): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime()))
    return ''
  const day = shortDate(date, now)
  if (date.getFullYear() !== now.getFullYear())
    return day
  const time = date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
  return `${day}, ${time}`
}
