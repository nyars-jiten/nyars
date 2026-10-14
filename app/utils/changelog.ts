export interface ChangelogListItem {
  text: string
  /** вложенные пункты (один уровень) */
  children: string[]
}

export type ChangelogBlock
  = | { kind: 'p' | 'quote', text: string }
    | { kind: 'list', items: ChangelogListItem[] }

export interface ChangelogSection {
  title: string
  blocks: ChangelogBlock[]
}

export interface ChangelogRelease {
  /** якорь для ссылок: v2.4-β или d2022-07-15 */
  id: string
  /** номер версии — у релизов вида «## [2.4-β] — дата» */
  version?: string
  /** название — у релизов без номера, вида «## Обновление — дата» */
  title?: string
  /** дата в формате ГГГГ-ММ-ДД */
  date?: string
  /** текст до первого раздела */
  intro: ChangelogBlock[]
  sections: ChangelogSection[]
}

const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

function parseHeading(text: string): ChangelogRelease {
  const ver = text.match(/^\[([^\]]+)\](?: [—–-] (\S.*))?$/)
  if (ver)
    return { id: `v${ver[1]}`, version: ver[1]!, date: ver[2], intro: [], sections: [] }
  const named = text.match(/^(.+?)(?: [—–] (\d{4}-\d{2}-\d{2}))?$/)!
  return { id: `d${named[2] ?? named[1]}`, title: named[1]!, date: named[2], intro: [], sections: [] }
}

// Разбор CHANGELOG.md: «## [версия] — дата» или «## Название — дата», «### раздел»,
// «- пункт» (вложенные — с отступом), «> цитата», остальное — абзацы.
export function parseChangelog(md: string): ChangelogRelease[] {
  const releases: ChangelogRelease[] = []
  let release: ChangelogRelease | null = null
  let blocks: ChangelogBlock[] | null = null
  // true, если предыдущая строка была абзацем без пустой строки после — тогда строки склеиваются
  let openParagraph = false

  for (const raw of md.split(/\r?\n/)) {
    const line = raw.trimEnd()
    if (!line.trim()) {
      openParagraph = false
      continue
    }

    const rel = line.match(/^## (\S.*)$/)
    if (rel) {
      release = parseHeading(rel[1]!.trim())
      releases.push(release)
      blocks = release.intro
      openParagraph = false
      continue
    }
    if (!release || !blocks)
      continue

    const sec = line.match(/^### (\S.*)$/)
    if (sec) {
      const section: ChangelogSection = { title: sec[1]!.trim(), blocks: [] }
      release.sections.push(section)
      blocks = section.blocks
      openParagraph = false
      continue
    }

    const last = blocks[blocks.length - 1]
    const child = line.match(/^ +[-*] (\S.*)$/)
    if (child && last?.kind === 'list') {
      last.items[last.items.length - 1]!.children.push(child[1]!)
      openParagraph = false
      continue
    }
    const item = line.match(/^[-*] (\S.*)$/)
    if (item) {
      const entry = { text: item[1]!, children: [] }
      if (last?.kind === 'list')
        last.items.push(entry)
      else
        blocks.push({ kind: 'list', items: [entry] })
      openParagraph = false
      continue
    }

    const quote = line.match(/^>\s?(.*)$/)
    if (quote) {
      if (last?.kind === 'quote' && openParagraph)
        last.text += ` ${quote[1]}`
      else
        blocks.push({ kind: 'quote', text: quote[1]! })
      openParagraph = true
      continue
    }

    const text = line.trim()
    if (/^\s/.test(line) && last?.kind === 'list') {
      // продолжение пункта на следующей строке
      const entry = last.items[last.items.length - 1]!
      if (entry.children.length)
        entry.children[entry.children.length - 1] += ` ${text}`
      else
        entry.text += ` ${text}`
    }
    else if (openParagraph && last?.kind === 'p') {
      last.text += ` ${text}`
    }
    else {
      blocks.push({ kind: 'p', text })
    }
    openParagraph = true
  }
  return releases
}

// 2025-11-01 → «1 ноября 2025»
export function formatChangelogDate(date: string): string {
  const m = date.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  return m ? `${Number(m[3])} ${MONTHS[Number(m[2]) - 1]} ${m[1]}` : date
}

// Текст → безопасный HTML: `код`, **жирный**, [текст](url) и голые ссылки
export function formatChangelogInline(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/(^|[\s(])(https?:\/\/[^\s<)]*[^\s<).,;:])/g, '$1<a href="$2" target="_blank" rel="noopener">$2</a>')
}
