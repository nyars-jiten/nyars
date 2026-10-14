import { tv } from 'tailwind-variants'

/** Иероглиф печати для каждого тона */
export const TONE_GLYPH: Record<UiToastTone, string> = {
  ok: '済',
  danger: '誤',
  warn: '注',
  info: '知',
  loading: '待',
}

/** Подпись тона для скринридера и подсказки */
export const TONE_LABEL: Record<UiToastTone, string> = {
  ok: 'Готово',
  danger: 'Ошибка',
  warn: 'Внимание',
  info: 'Сведения',
  loading: 'Ожидание',
}

/** Мягкая подложка и цвет тона: печать, плашки объявлений */
export const toneSoft = tv({
  variants: {
    tone: {
      ok: 'bg-ok-soft text-ok',
      danger: 'bg-danger-soft text-danger',
      warn: 'bg-warn-soft text-warn',
      info: 'bg-soft text-strong',
      loading: 'bg-soft text-strong',
    },
  },
})
