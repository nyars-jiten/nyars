/** Статус правки в интерфейсе: не проверено · принята · нужна доработка · отклонена */
export type UiStatusKind = 'pend' | 'ok' | 'work' | 'rej'

/** Вариант выбора для UiSegmented, UiSelect, UiRadioTiles */
export interface UiOption<T extends string | number = string> {
  value: T
  label: string
  /** вторая строка, например образец: 蛙… */
  hint?: string
}

/** Пункт бокового меню UiSideNav */
export interface UiSideNavItem {
  id: string
  label: string
  count?: number | string
  /** цветная точка статуса слева от названия */
  status?: UiStatusKind | 'all'
  /** если задан — пункт рендерится ссылкой, активность определяет роутер */
  to?: string
  /** недоступен: показывается приглушённым, без перехода */
  disabled?: boolean
  /** подсказка при наведении, например почему пункт недоступен */
  hint?: string
}

/** Вкладка UiTabBar */
export interface UiTabItem {
  id: string
  label: string
  /** число рядом с названием */
  count?: number
  /** недоступна: приглушена, не выбирается */
  disabled?: boolean
  /** подсказка при наведении, например почему вкладка недоступна */
  hint?: string
}

/** Значение трёхпозиционного фильтра: нет значения — «без разницы» */
export type TriState = 'include' | 'exclude'

/** Вид плашки JLPT: цвета палитры · яркий светофор · акцентный цвет · контур */
export type JlptStyle = 'palette' | 'bright' | 'accent' | 'outline'

/** Тон уведомлений и объявлений */
export type UiTone = 'ok' | 'danger' | 'warn' | 'info'

/** Тон всплывающего уведомления: к тонам добавляется «идёт процесс» */
export type UiToastTone = UiTone | 'loading'

export interface UiToastAction {
  label: string
  run: () => unknown
}

/** Параметры вызова useToast().push / ok / error / ... */
export interface UiToastOptions {
  /** явный id: повторный вызов обновляет уведомление на месте, без счётчика ×N */
  id?: string
  /** по умолчанию info */
  tone?: UiToastTone
  title: string
  description?: string
  action?: UiToastAction
  /** мс; Infinity — до закрытия. По умолчанию зависит от тона и длины текста */
  duration?: number
}

/** Уведомление в очереди */
export interface UiToast {
  /** внутренний номер, ключ списка */
  uid: number
  /** по нему склеиваются повторы */
  key: string
  id?: string
  tone: UiToastTone
  title: string
  description?: string
  action?: UiToastAction
  duration: number
  /** сколько раз показано подряд */
  count: number
  /** растёт при повторе и обновлении: перезапускает таймер и полоску */
  epoch: number
}
