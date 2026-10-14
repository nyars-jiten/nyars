/** Объявление сайта, например о профилактических работах. Приходит с сервера, показывается лентой под шапкой */
export interface Announcement {
  /** стабильный: по нему запоминается «скрыто»; новый id покажет объявление снова */
  id: string
  tone: 'info' | 'warn' | 'danger'
  /** простой текст, без разметки */
  title: string
  body?: string
  link?: { label: string, url: string }
  /** ISO: показывать с этого момента */
  startsAt?: string
  /** ISO: скрыть после этого момента */
  endsAt?: string
  /** false — крестика нет, объявление нельзя скрыть */
  dismissible: boolean
}
