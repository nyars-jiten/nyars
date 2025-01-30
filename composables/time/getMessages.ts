import type { UseTimeAgoMessages, UseTimeAgoUnitNamesDefault } from '@vueuse/core'
import { getTranslation } from './getTranslation'

export function getMessages() {
  const { t } = useI18n()

  const I18N_MESSAGES: UseTimeAgoMessages<UseTimeAgoUnitNamesDefault> = {
    justNow: t('timeAgo.justNow'),
    past: n => (n.match(/\d/) ? t('timeAgo.ago', [n]) : n),
    future: n => (n.match(/\d/) ? t('timeAgo.in', [n]) : n),
    month: (n, past) =>
      n === 1
        ? past
          ? t('timeAgo.lastMonth')
          : t('timeAgo.nextMonth')
        : `${n} ${t(`timeAgo.month.${getTranslation(n)}`, n)}`,
    year: (n, past) =>
      n === 1
        ? past
          ? t('timeAgo.lastYear')
          : t('timeAgo.nextYear')
        : `${n} ${t(`timeAgo.year.${getTranslation(n)}`, n)}`,
    day: (n, past) =>
      n === 1
        ? past
          ? t('timeAgo.yesterday')
          : t('timeAgo.tomorrow')
        : `${n} ${t(`timeAgo.day.${getTranslation(n)}`, n)}`,
    week: (n, past) =>
      n === 1
        ? past
          ? t('timeAgo.lastWeek')
          : t('timeAgo.nextWeek')
        : `${n} ${t(`timeAgo.week.${getTranslation(n)}`, n)}`,
    hour: n => `${n} ${t(`timeAgo.hour.${getTranslation(n)}`, n)}`,
    minute: n => `${n} ${t(`timeAgo.minute.${getTranslation(n)}`, n)}`,
    second: n => `${n} ${t(`timeAgo.second.${getTranslation(n)}`, n)}`,
    invalid: 'bruh',
  }

  return I18N_MESSAGES as UseTimeAgoMessages<string>
}
