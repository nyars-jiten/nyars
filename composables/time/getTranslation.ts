export const getTranslation = (number: number) => {
  number %= 100
  if (number >= 5 && number <= 20) {
    return 2
  }
  number %= 10
  if (number === 1) {
    return 0
  }
  if (number >= 2 && number <= 4) {
    return 1
  }
  return 2
}
