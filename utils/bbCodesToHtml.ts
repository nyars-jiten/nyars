export default (rawString: string|null) => {
  if (rawString === null) {
    return ''
  }
  const result = rawString
    .replace(/\[i\](.*?)\[\/i\]/gim, '<em>$1</em>')
    .replace(/\[p\](.*?)\[\/p\]/gim, '<em>$1</em>')
    .replace(/\\([\n,;])/gim, '$1')
    .replace(/⌈/gim, '')
    .replace(
      /\[ref=?\](.*?)\[\/ref\]/gim,
      '<a class="underline underline-offset-4 decoration-dotted hover:text-ns-500" href=\'/s/jpn?r=$1\'>$1</a>'
    )
    .replace(
      /\[ref=([a-zA-Z\d]{4,7})\](.*?)\[\/ref\]/gim,
      '<a class="underline underline-offset-4 decoration-dotted hover:text-ns-500" href=\'/jpn/$1\'>$2</a>'
    )
    .replace(/\[sub\](.*?)\[\/sub\]/gim, '<sub>$1</sub>')
    .replace(/\[sup\](.*?)\[\/sup\]/gim, '<sup>$1</sup>')
    .replace(/{~(.*?)}/gim, '<em><strong>～$1</strong></em>') // {～する}
    .replace(/{\.\.\.(.*?)~(.*?)}/gim, '<em><strong>…$1～$2</strong></em>') // {…to～shite}
    .replace(/(.\u0301)/gim, '<span>$1</span>')
    .replace(/\['\](.*?)\[\/'\]/gim, '<span>$1&#x301;</span>')
  return result
}
