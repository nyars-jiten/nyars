// «Слово дня»: на бэкенде подборки нет, поэтому список wid лежит на клиенте (docs/backend-home.md).

const WORDS = [
  'K9hh',
  'YWUR',
  'abU6',
  'lD7Q',
  'kuZI',
  'zdoO',
  'ZIEU',
  'xvNI',
  'D3N2',
  'yy9j',
  'r3EF',
  'UDsJ',
  '6pAD',
  'sdUT',
  'EIiD',
  'rDZf',
  'MNSM',
  'NYoo',
  'EVrR',
  'Z2LD',
  'VbXQ',
  'v95r',
  'j1aZ',
  'hFp9',
  'jboP',
  'M9UV',
  'KAyy',
  'w3E3',
  'Vsch',
  'cLdu',
  'S4Qc',
  'ZyPd',
  'bTt0',
]

const MSK_OFFSET = 3 * 3_600_000

/** Номер дня по Москве — одинаков на сервере и в браузере */
function mskDay(date: Date) {
  return Math.floor((date.getTime() + MSK_OFFSET) / 86_400_000)
}

export function wordOfDayWid(date = new Date()) {
  return WORDS[mskDay(date) % WORDS.length]!
}

/** «9 октября» */
export function wordOfDayLabel(date = new Date()) {
  return new Date(date.getTime() + MSK_OFFSET).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', timeZone: 'UTC' })
}
