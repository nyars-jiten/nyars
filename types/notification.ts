export interface NyarsNotification {
  message: string
  // type is ComputedRef<boolean>, but for no reason TS "converts" it to boolean

  isHidden: unknown
}
