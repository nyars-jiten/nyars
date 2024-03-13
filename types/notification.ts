export interface NyarsNotification {
  message: string
  // type is ComputedRef<boolean>, but for no reason TS "converts" it to boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isHidden: any
}
