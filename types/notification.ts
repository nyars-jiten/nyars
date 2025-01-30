export interface NyarsNotification {
  message: string
  // type is ComputedRef<boolean>, but for no reason TS "converts" it to boolean
  type: NyarsNotificationType

  isHidden: unknown
}

export enum NyarsNotificationType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning',
}
