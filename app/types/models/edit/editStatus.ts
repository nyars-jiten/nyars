import { z } from 'zod'

export enum EditStatus {
  None, // Don't used?
  New,
  Declined,
  Accepted,
  AutoAccepted,
  Reverted, // Don't used?
}

export const EditStatusSchema = z.nativeEnum(EditStatus)
