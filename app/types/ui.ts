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
