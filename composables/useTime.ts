import { getMessages } from './time/getMessages'

export const useTime = (date: Date) => {
  return useTimeAgo(date, {
    fullDateFormatter: (date: Date) => date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }),
    max: 12 * 24 * 60 * 60 * 1000, // 12 days
    messages: getMessages(),
    rounding: 'floor'
  })
}
