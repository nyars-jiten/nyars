export function useFormatNumber(num: number, { precision = 1 }: { precision?: number } = {}) {
  return num.toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: precision })
}
