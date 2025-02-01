import { z } from 'zod'

export enum Access {
  None = 0,
  Autoapprove = 1 << 0,
  Edits = 1 << 1,
}

export const AccessSchema = z.nativeEnum(Access)

export const UserRightsSchema = z.object({
  hasAccessAutoapprove: z.boolean(),
  hasAccessEdits: z.boolean(),
})

export type UserRights = z.infer<typeof UserRightsSchema>
