import { z } from 'zod'

export enum NyarsNotificationType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning',
}

export const NyarsNotificationSchema = z.object({
  message: z.string(),
  type: z.nativeEnum(NyarsNotificationType),
  isHidden: z.unknown(),
})

export type NyarsNotification = z.infer<typeof NyarsNotificationSchema>
