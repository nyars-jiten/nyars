export default (rawString: string | null) => {
  if (rawString === null) {
    return
  }
  return rawString.replace(/([一-龯]+)《(.+?)》/gim, '<ruby>$1<rt class="text-xs">$2</rt></ruby>')
}
