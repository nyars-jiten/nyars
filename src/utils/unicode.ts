export function unicodeIndexFromUTF8(char: string) {
  const codePoint = char.codePointAt(0)
  if (typeof codePoint === 'number') {
    const hex = codePoint.toString(16)
    return 'U+' + '0000'.substring(0, 4 - hex.length) + hex
  }
}

export function unicodeIndexFromUTF16(char: string) {
  const first = char[0].codePointAt(0) ?? 0
  const second = char[1].codePointAt(0) ?? 0
  const v = ((first - 0xd7f7) << 10) + second

  const hex = v.toString(16)
  return 'U+' + '0000'.substring(0, 4 - hex.length) + hex
}
