type Row = 'rk' | 'gikun' | 'oik' | 'uK' | 'rm' | 'ok'
type Value = { short: string; full: string }

export default {
  rk: { short: 'редк', full: '(более) редкое чтение' },
  gikun: {
    short: 'гикун',
    full: 'гикун (чтение по смыслу) или дзюкудзикун (особенное чтение)'
  },
  oik: { short: '△', full: 'нестандартная запись каной' },
  uK: { short: 'об.К.', full: 'обычно записывается кандзи' },
  rm: { short: 'ошиб', full: 'ошибочное, неправильное чтение' },
  ok: {
    short: '◇',
    full: 'старая орфография (кю-канадзукай) или архаичное чтение'
  }
} as { [key in Row]: Value }
